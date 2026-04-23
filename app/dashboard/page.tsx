"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/auth-context";
import type { Submission } from "@/lib/types";
import { Eye } from "lucide-react";

const statusMap = {
  pending: {
    label: "审核中",
    className: "bg-muted text-foreground border border-border",
  },
  approved: {
    label: "已发布",
    className: "bg-foreground text-background",
  },
  rejected: {
    label: "已拒绝",
    className: "bg-destructive text-destructive-foreground",
  },
};

const demoSubmissions: Submission[] = [
  {
    id: "demo-1",
    name: "AI写作助手",
    slug: "ai-writer",
    url: "https://example.com/ai-writer",
    logo: "",
    coverImage: "",
    summary: "AI写作助手",
    description: "AI写作助手",
    status: "pending",
    createdAt: "2024-04-20T18:30:00+08:00",
  },
  {
    id: "demo-2",
    name: "智能图像生成器",
    slug: "image-generator",
    url: "https://example.com/image-generator",
    logo: "",
    coverImage: "",
    summary: "智能图像生成器",
    description: "智能图像生成器",
    status: "approved",
    createdAt: "2024-04-15T22:20:00+08:00",
  },
  {
    id: "demo-3",
    name: "语音转文字工具",
    slug: "voice-to-text",
    url: "https://example.com/voice-to-text",
    logo: "",
    coverImage: "",
    summary: "语音转文字工具",
    description: "语音转文字工具",
    status: "approved",
    createdAt: "2024-04-10T17:15:00+08:00",
  },
];

export default function DashboardPage() {
  const { submissions } = useAuth();
  const displaySubmissions = submissions.length > 0 ? submissions : demoSubmissions;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">我的提交</h1>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">工具名称</TableHead>
                <TableHead>提交时间</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right pr-6">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displaySubmissions.map((submission) => {
                const status = statusMap[submission.status];
                const isPending = submission.status === "pending";

                return (
                  <TableRow key={submission.id}>
                    <TableCell className="pl-6 font-medium">{submission.name}</TableCell>
                    <TableCell>
                      {new Date(submission.createdAt).toLocaleString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {isPending ? (
                        <span className="text-muted-foreground">--</span>
                      ) : (
                        <Button variant="outline" size="sm" className="h-8">
                          <Eye className="h-4 w-4" />
                          <span>查看</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
