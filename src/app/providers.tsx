"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/components/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { ReelProvider } from "@/components/movie-provider";
import { ReelDataProvider } from "@/components/reel-data-provider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ReelProvider>
            <ReelDataProvider>{children}</ReelDataProvider>
          </ReelProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
