"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { type EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

function safeNextPath(next: string | null) {
  const fallback = "/dashboard";
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return fallback;
  }
  return next;
}

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("正在验证邮箱…");
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      const next = safeNextPath(searchParams.get("next"));
      const code = searchParams.get("code");
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type") as EmailOtpType | null;
      const qError = searchParams.get("error");
      const qErrorDesc = searchParams.get("error_description");

      if (qError) {
        router.replace(
          `/auth/error?error=${encodeURIComponent(qErrorDesc || qError)}`,
        );
        return;
      }

      const supabase = createClient();

      if (code) {
        const dedupeKey = `sb-confirm-code:${code}`;
        if (typeof window !== "undefined" && sessionStorage.getItem(dedupeKey)) {
          const { data: { session: existing } } = await supabase.auth.getSession();
          if (existing) {
            router.replace(next);
            router.refresh();
            return;
          }
        }
        if (typeof window !== "undefined") {
          sessionStorage.setItem(dedupeKey, "1");
        }
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
          router.replace(next);
          router.refresh();
          return;
        }
        router.replace(`/auth/error?error=${encodeURIComponent(error.message)}`);
        return;
      }

      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
          type,
          token_hash,
        });
        if (!error) {
          router.replace(next);
          router.refresh();
          return;
        }
        router.replace(`/auth/error?error=${encodeURIComponent(error.message)}`);
        return;
      }

      // 隐式流程：令牌在 # 片段中（部分邮箱客户端或旧配置会如此），服务端读不到，只能在浏览器解析
      const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
      if (hash) {
        const hp = new URLSearchParams(hash);
        const hError = hp.get("error");
        const hErrorDesc = hp.get("error_description");
        if (hError) {
          router.replace(
            `/auth/error?error=${encodeURIComponent(hErrorDesc || hError)}`,
          );
          return;
        }
        const access_token = hp.get("access_token");
        const refresh_token = hp.get("refresh_token");
        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (!error) {
            window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
            router.replace(next);
            router.refresh();
            return;
          }
          router.replace(`/auth/error?error=${encodeURIComponent(error.message)}`);
          return;
        }
      }

      // 部分环境下客户端会自动从 URL 解析会话
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace(next);
        router.refresh();
        return;
      }

      setStatus("验证失败");
      router.replace(
        `/auth/error?error=${encodeURIComponent(
          "链接里既没有 code / token_hash，也没有 #access_token。请从邮件里「复制完整链接」到浏览器打开，或检查 Supabase Redirect URLs 是否包含本地址。",
        )}`,
      );
    };

    void run();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <Link
        href="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>
      <p className="text-sm text-muted-foreground">{status}</p>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">
          加载中…
        </div>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
