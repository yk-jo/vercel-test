"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface RootInitializeProps {
  children: ReactNode;
}
export default function RootInitialize({ children }: RootInitializeProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
