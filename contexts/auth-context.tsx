"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { mapSupabaseUser } from "@/lib/auth-map";
import { hasEnvVars } from "@/lib/utils";
import type { User, Submission } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  /** 是否已完成首次会话检测（避免仪表盘在刷新前误跳转） */
  isAuthReady: boolean;
  logout: () => Promise<void>;
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, "id" | "status" | "createdAt">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function submissionsStorageKey(userId: string) {
  return `ai-tools-submissions-${userId}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    if (!hasEnvVars) {
      setIsAuthReady(true);
      return;
    }

    const supabase = createClient();

    const loadSubmissions = (userId: string) => {
      const raw = localStorage.getItem(submissionsStorageKey(userId));
      if (!raw) {
        setSubmissions([]);
        return;
      }
      try {
        setSubmissions(JSON.parse(raw) as Submission[]);
      } catch {
        setSubmissions([]);
      }
    };

    const applySession = (sessionUser: SupabaseUser | null) => {
      if (sessionUser) {
        const u = mapSupabaseUser(sessionUser);
        setUser(u);
        loadSubmissions(u.id);
      } else {
        setUser(null);
        setSubmissions([]);
      }
      setIsAuthReady(true);
    };

    void supabase.auth.getSession().then(({ data: { session } }) => {
      applySession(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    if (hasEnvVars) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    setUser(null);
    setSubmissions([]);
  };

  const addSubmission = (submission: Omit<Submission, "id" | "status" | "createdAt">) => {
    if (!user) return;
    const newSubmission: Submission = {
      ...submission,
      id: `sub-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem(submissionsStorageKey(user.id), JSON.stringify(updatedSubmissions));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user?.isLoggedIn,
        isAuthReady,
        logout,
        submissions,
        addSubmission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
