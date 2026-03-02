"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

import type { ReactNode } from "react";

interface ClerkThemeProviderProps {
  children: ReactNode;
}

export function ClerkThemeProvider({ children }: ClerkThemeProviderProps) {
  return (
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
