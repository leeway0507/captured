import NextAuth from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        userId: string;
        email: string;
        krName: string;
        emailVerification: boolean;
        accessToken: string;
    }
    interface Session {
        user: {
            email: string;
            userId: string;
            krName: string;
            emailVerification: boolean;
            accessToken: string;
        };
    }
}
