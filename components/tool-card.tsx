"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import type { Tool } from "@/lib/types";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const router = useRouter();
  const href = `/tools/${tool.slug}`;

  return (
    <Card className="group relative h-full overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
      <CardContent className="relative z-0 p-4">
        <div className="flex items-start gap-3">
          <img
            src={tool.logo}
            alt=""
            aria-hidden
            className="w-12 h-12 rounded-xl shrink-0 bg-muted"
            suppressHydrationWarning
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
              {tool.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
              {tool.summary}
            </p>
          </div>
        </div>
      </CardContent>
      {/* 带可见子节点的原生 <a> + 显式 client 导航，避免空/自闭合 Link 在部分布局下无点击区域；z-[100] 盖过侧栏/粘顶等叠层 */}
      <a
        href={href}
        className="pointer-events-auto absolute inset-0 z-[100] cursor-pointer rounded-xl outline-offset-0 focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`查看 ${tool.name}`}
        onClick={(e) => {
          if (e.defaultPrevented) return;
          if (e.button !== 0) return;
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          void router.push(href);
        }}
      >
        <span className="sr-only">{tool.name}</span>
      </a>
    </Card>
  );
}
