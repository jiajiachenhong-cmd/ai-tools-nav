import { notFound } from "next/navigation";
import { getToolBySlug, getCategoryBySlug } from "@/lib/data";
import { ToolDetailClient } from "./tool-detail-client";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    notFound();
  }
  const category = getCategoryBySlug(tool.categorySlug) ?? null;
  return <ToolDetailClient tool={tool} category={category} />;
}
