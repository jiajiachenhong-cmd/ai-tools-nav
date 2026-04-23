"use client";

import { Badge } from "@/components/ui/badge";
import { Flame, Sparkles } from "lucide-react";

interface SectionBadgeProps {
  type: "hot" | "new";
}

export function SectionBadge({ type }: SectionBadgeProps) {
  if (type === "hot") {
    return (
      <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 px-3 py-1 text-sm font-medium">
        <Flame className="mr-1.5 h-3.5 w-3.5" />
        热门工具
      </Badge>
    );
  }

  return (
    <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 text-sm font-medium">
      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
      最新收录
    </Badge>
  );
}
