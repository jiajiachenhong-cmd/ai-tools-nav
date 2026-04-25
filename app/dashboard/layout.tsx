"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, FileText, Send, User } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/profile", label: "个人信息", icon: User },
  { href: "/dashboard/submit", label: "提交站点", icon: Send },
  { href: "/dashboard", label: "提交历史", icon: FileText },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isAuthReady } = useAuth();

  useEffect(() => {
    if (isAuthReady && !isLoggedIn) {
      router.replace("/auth/login?next=/dashboard");
    }
  }, [isAuthReady, isLoggedIn, router]);

  if (!isAuthReady || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground text-sm">
        加载中…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 侧边栏 */}
      <Sidebar />

      {/* 主内容区 */}
      <div className="pl-56">
        {/* 头部 */}
        <Header />

        {/* 内容区域 */}
        <main className="p-6">
          {/* 返回按钮 */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <div className="flex gap-6">
            {/* 左侧导航 */}
            <nav className="w-48 shrink-0">
              <div className="bg-card rounded-xl border border-border p-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* 右侧内容 */}
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
