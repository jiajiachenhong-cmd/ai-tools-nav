"use client";

import { useRef, useCallback, useEffect } from "react";
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

  // 从其他页经侧边栏进入首页并带 #category-xxx 时，滚动到对应分类（Link / 直链均适用）
  useEffect(() => {
    const scrollToHashCategory = () => {
      const raw = window.location.hash.slice(1);
      if (!raw.startsWith("category-")) return;
      const el = document.getElementById(raw);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    scrollToHashCategory();
    window.addEventListener("hashchange", scrollToHashCategory);
    return () => window.removeEventListener("hashchange", scrollToHashCategory);
  }, []);

  const hotTools = getHotTools();
  const latestTools = getLatestTools();

  return (
    <div className="min-h-screen bg-background">
      {/* 侧边栏 */}
      <Sidebar onCategoryClick={handleCategoryClick} />

      {/* 主内容区：提高叠放层级，避免与 fixed 侧栏/异常叠层争用事件 */}
      <div className="relative isolate z-20 pl-56">
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
