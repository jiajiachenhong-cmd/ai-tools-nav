"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { getToolBySlug, getCategoryBySlug } from "@/lib/data";

interface ToolDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ToolDetailPage({ params }: ToolDetailPageProps) {
  const { slug } = use(params);
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const category = getCategoryBySlug(tool.categorySlug);

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

          {/* 封面图 */}
          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 bg-muted">
            <img
              src={tool.coverImage}
              alt={tool.name}
              className="w-full h-full object-cover"
              suppressHydrationWarning
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* 工具信息头部 */}
          <div className="flex items-start gap-6 mb-8">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-20 h-20 rounded-2xl bg-card border border-border shadow-sm"
              suppressHydrationWarning
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{tool.name}</h1>
                {category && (
                  <Badge variant="secondary" className="font-normal">
                    {category.name}
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-4">{tool.summary}</p>
              <Button asChild>
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  打开网站
                </a>
              </Button>
            </div>
          </div>

          {/* 标签页内容 */}
          <Tabs defaultValue="intro" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="intro">工具介绍</TabsTrigger>
              <TabsTrigger value="qa">常见问题</TabsTrigger>
            </TabsList>

            <TabsContent value="intro" className="mt-0">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">关于 {tool.name}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {tool.description}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="qa" className="mt-0">
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-lg font-semibold mb-4">常见问题</h2>
                {tool.qa && tool.qa.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {tool.qa.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground">暂无常见问题</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
