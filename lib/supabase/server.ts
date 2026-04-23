import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 在 Server Component / Route Handler 中创建 Supabase 客户端（基于 Cookie）。
 * 每次调用新建实例，勿做全局单例。
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 在 Server Component 中调用 set 时会失败，可忽略（由 Proxy 刷新会话）
          }
        },
      },
    },
  );
}
