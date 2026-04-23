"use client";

import { useRouter } from "next/navigation";
import { LogOut, Mail, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">个人信息</h1>

      <div className="rounded-xl border border-border bg-background px-6 py-5">
        <div className="mb-5">
          <p className="text-base font-semibold">账号信息</p>
        </div>

        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">用户名</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">邮箱地址</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <p className="text-sm text-muted-foreground mb-3">账号操作</p>
          <Button
            onClick={handleLogout}
            className="bg-sky-100 text-sky-700 hover:bg-sky-200"
          >
            <LogOut className="mr-2 h-4 w-4" />
            退出登录
          </Button>
        </div>
      </div>
    </div>
  );
}
