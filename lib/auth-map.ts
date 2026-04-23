import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { User } from "@/lib/types";

export function mapSupabaseUser(u: SupabaseUser): User {
  const meta = u.user_metadata as Record<string, string | undefined> | undefined;
  const name =
    (meta?.full_name as string | undefined) ||
    (meta?.name as string | undefined) ||
    u.email?.split("@")[0] ||
    "用户";
  const avatar = (meta?.avatar_url as string | undefined) || "";

  return {
    id: u.id,
    name,
    email: u.email ?? "",
    avatar,
    isLoggedIn: true,
  };
}
