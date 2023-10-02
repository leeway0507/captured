import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
    userId: number;
    email: string;
    password: string;
    krName: string;
    enName: string;
}

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                const user: User = {
                    userId: 1,
                    email: "lee@naver.com",
                    password: "password",
                    krName: "이양우",
                    enName: "lee yangwoo",
                };
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        // signOut: "/auth/signout",
        newUser: "/auth/register",
    },
};
