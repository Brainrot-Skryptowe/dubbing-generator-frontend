"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUserDetails } from "@/hooks/useUserDetails";
import User from "@/types/user";

type AuthContextType = {
  setToken: (token: string | undefined) => void;
  user: User;
  refetchUser: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | undefined>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || undefined;
    }
    return undefined;
  });
  const { data: user, refetch, isPending } = useUserDetails(token);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    refetch();
  }, [token, refetch]);

  const setToken = (newToken: string | undefined) => {
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider
      value={{ setToken, user, refetchUser: refetch, isLoading: isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
