export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface QA {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  url: string;
  logo: string;
  coverImage: string;
  category: string;
  categorySlug: string;
  summary: string;
  description: string;
  qa: QA[];
  isHot: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}

export interface Submission {
  id: string;
  name: string;
  slug: string;
  url: string;
  logo: string;
  coverImage: string;
  summary: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
