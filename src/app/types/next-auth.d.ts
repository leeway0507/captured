import NextAuth from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        user_id: number;
        email: string;
        kr_name: string;
        email_verification: boolean;
        access_token: string;
    }
    interface Session {
        user: {
            email: string;
            user_id: number;
            kr_name: string;
            email_verification: boolean;
            access_token: Object;
        };
    }
}
