import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <Link
        href="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>感谢注册</CardTitle>
          <CardDescription>请查收确认邮件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            我们已向你的邮箱发送确认链接。若项目开启了「邮箱确认」，请点击邮件中的链接完成验证后再登录。
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/login">前往登录</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
