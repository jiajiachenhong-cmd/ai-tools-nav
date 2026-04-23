import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const message = params?.error;

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
          <CardTitle>出错了</CardTitle>
          <CardDescription>验证或登录流程遇到问题</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground break-all">
            {message ? `详情：${message}` : "发生了未知错误，请重试或联系管理员。"}
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/login">返回登录</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
