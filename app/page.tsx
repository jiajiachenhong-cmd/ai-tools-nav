"use client";

import { useRef, useCallback } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ToolGrid } from "@/components/tool-grid";
import { CategorySection } from "@/components/category-section";
import { SectionBadge } from "@/components/section-badge";
import { categories, getHotTools, getLatestTools, getToolsByCategory } from "@/lib/data";

export default function HomePage() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleCategoryClick = useCallback((slug: string) => {
    const section = sectionRefs.current[slug];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const setSectionRef = useCallback((slug: string) => (el: HTMLElement | null) => {
    sectionRefs.current[slug] = el;
  }, []);

  const hotTools = getHotTools();
  const latestTools = getLatestTools();

  return (
    <div className="min-h-screen bg-background">
      {/* 侧边栏 */}
      <Sidebar onCategoryClick={handleCategoryClick} />

      {/* 主内容区 */}
      <div className="pl-56">
        {/* 头部 */}
        <Header />

        {/* 内容区域 */}
        <main className="p-6">
          {/* 热门工具 */}
          <section className="mb-10">
            <div className="mb-4">
              <SectionBadge type="hot" />
            </div>
            <ToolGrid tools={hotTools} />
          </section>

          {/* 最新收录 */}
          <section className="mb-10">
            <div className="mb-4">
              <SectionBadge type="new" />
            </div>
            <ToolGrid tools={latestTools} />
          </section>

          {/* 按分类展示 */}
          <div className="flex flex-col gap-10">
            {categories.map((category) => (
              <CategorySection
                key={category.id}
                ref={setSectionRef(category.slug)}
                category={category}
                tools={getToolsByCategory(category.slug)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
