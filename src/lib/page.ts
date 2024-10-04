// src/lib/auth.ts
'use client';
import type { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

// First, define the types for your custom session and JWT
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    userProfile?: {
      oid?: string;
      preferred_username?: string;
      // Add any other properties from the profile you need
      [key: string]: unknown;
    };
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     idToken?: string;
//     profile?: {
//       oid?: string;
//       preferred_username?: string;
//       // Add any other properties from the profile you need
//       [key: string] : Record<string, unknown>;
//     };
//   }
// }

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.profile = profile;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.idToken = token.idToken;
        session.userProfile = token.profile;
      }
      return session;
    },
  },
  // Add any other configuration options you need
  pages: {
    signIn: '/auth/signin',
  },
  // Enable debug logs in development
  debug: process.env.NODE_ENV === 'development',
};