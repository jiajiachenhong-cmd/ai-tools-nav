import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/login-form";

function LoginFormFallback() {
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
      加载中…
    </div>
  );
}

export default function AuthLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <Link
        href="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>
      <div className="w-full max-w-md">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
