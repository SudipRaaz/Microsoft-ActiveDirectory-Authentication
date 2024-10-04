'use client';

import { SessionProvider } from "next-auth/react";
import { TeamsAwareProvider } from "./TeamAwareComponent";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <TeamsAwareProvider>
        {children}
      </TeamsAwareProvider>
    </SessionProvider>
  );
}