"use client";

import { forwardRef } from "react";
import { ToolGrid } from "./tool-grid";
import type { Tool, Category } from "@/lib/types";

interface CategorySectionProps {
  category: Category;
  tools: Tool[];
}

export const CategorySection = forwardRef<HTMLElement, CategorySectionProps>(
  ({ category, tools }, ref) => {
    if (tools.length === 0) return null;

    return (
      <section ref={ref} id={`category-${category.slug}`} className="scroll-mt-20">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="inline-block w-1 h-5 bg-primary rounded-full" />
            {category.name}
          </h2>
        </div>
        <ToolGrid tools={tools} />
      </section>
    );
  }
);

CategorySection.displayName = "CategorySection";
