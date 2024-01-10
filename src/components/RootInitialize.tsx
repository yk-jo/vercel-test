"use client";
import { useAxiosInterceptor } from "@/utils/axiosInstance";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

interface RootInitializeProps {
  children: ReactNode;
}
export default function RootInitialize({ children }: RootInitializeProps) {
  useAxiosInterceptor();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
