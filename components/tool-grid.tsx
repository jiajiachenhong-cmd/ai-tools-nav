"use client";

import { ToolCard } from "./tool-card";
import type { Tool } from "@/lib/types";

interface ToolGridProps {
  tools: Tool[];
  columns?: 2 | 3 | 4;
}

export function ToolGrid({ tools, columns = 4 }: ToolGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
