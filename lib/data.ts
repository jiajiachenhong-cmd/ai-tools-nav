import categoriesData from "@/data/categories.json";
import toolsData from "@/data/tools.json";
import userData from "@/data/user.json";
import type { Category, Tool, User } from "./types";

// 导出分类数据
export const categories: Category[] = categoriesData;

// 导出工具数据
export const tools: Tool[] = toolsData;

// 导出默认用户数据
export const defaultUser: User = userData;

// 获取热门工具（前4个）
export function getHotTools(): Tool[] {
  return tools.filter((tool) => tool.isHot).slice(0, 4);
}

// 获取最新收录工具（按创建时间排序，取最新4个）
export function getLatestTools(): Tool[] {
  return [...tools]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
}

// 按分类获取工具
export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((tool) => tool.categorySlug === categorySlug);
}

// 根据 slug 获取单个工具
export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

// 根据 slug 获取分类
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

// 搜索工具（按名称和描述）
export function searchTools(query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.summary.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery)
  );
}
