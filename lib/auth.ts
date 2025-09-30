 import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/prisma/client"; 
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma), 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session: {
        strategy: "jwt" as const,
    },
    callbacks: {
        session: ({ session, token }: { session: Session; token: JWT }) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
            },
        }),
        jwt: ({ user, token }: { user?: User; token: JWT }) => { 
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
    },
};

// This file exports only the configuration
// The actual NextAuth handler should be in /app/api/auth/[...nextauth]/route.ts