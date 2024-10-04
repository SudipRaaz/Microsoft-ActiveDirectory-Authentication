// @src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    idToken?: string;
    userProfile?: {
      oid?: string;
      preferred_username?: string;
      [key: string]: unknown;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    profile?: {
      oid?: string;
      preferred_username?: string;
      [key: string]: unknown;
    };
  }
}