"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Tool } from "@/lib/types";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-md hover:border-primary/20 cursor-pointer h-full">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <img
              src={tool.logo}
              alt={tool.name}
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
      </Card>
    </Link>
  );
}
