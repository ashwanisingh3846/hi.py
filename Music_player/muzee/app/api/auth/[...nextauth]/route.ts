import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "@/app/lib/db";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRETE ?? "", // ✅ also fixed typo
        }),
    ],
    adapter: PrismaAdapter(prismaClient),
    secret: process.env.NEXTAUTH_SECRET ?? "some-secret",
    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user, account }) {
        if (user?.email) {
            const dbUser = await prismaClient.user.findUnique({
            where: { email: user.email },
            });

            console.log("DB user:", JSON.stringify(dbUser));

            if (dbUser) {
            token.id = dbUser.id;
            console.log("✅ token.id set to:", token.id);
            }
        }
        return token;
        },
        async session({ session, token }) {
        if (session.user && token?.id) {
            session.user.id = token.id as string;
        }
        return session;
        },
    },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
