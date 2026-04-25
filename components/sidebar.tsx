"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PenLine,
  Image,
  Code,
  Music,
  Video,
  Palette,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { categories } from "@/lib/data";
import { useAuth } from "@/contexts/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const iconMap: Record<string, LucideIcon> = {
  "pen-line": PenLine,
  image: Image,
  code: Code,
  music: Music,
  video: Video,
  palette: Palette,
};

interface SidebarProps {
  onCategoryClick?: (slug: string) => void;
}

export function Sidebar({ onCategoryClick }: SidebarProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleSubmitClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard/submit");
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleGoLogin = () => {
    setShowLoginDialog(false);
    router.push("/auth/login?next=/dashboard/submit");
  };

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 h-screen w-56 max-w-[14rem] overflow-x-hidden bg-sidebar text-sidebar-foreground flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-5 border-b border-sidebar-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <Link href="/" className="text-lg font-bold cursor-pointer">
            AI 工具集
          </Link>
        </div>

        {/* 分类列表 */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {categories.map((category) => {
              const Icon = iconMap[category.icon] || PenLine;
              const itemClassName =
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-left cursor-pointer";
              if (onCategoryClick) {
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => onCategoryClick(category.slug)}
                    className={itemClassName}
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </button>
                );
              }
              return (
                <Link
                  key={category.id}
                  href={`/#category-${category.slug}`}
                  className={itemClassName}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* 提交站点按钮 */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            onClick={handleSubmitClick}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            提交站点
          </Button>
        </div>
      </aside>

      {/* 登录提示对话框 */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>需要登录</DialogTitle>
            <DialogDescription>
              提交站点前请先登录您的账号。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              取消
            </Button>
            <Button onClick={handleGoLogin}>去登录</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
