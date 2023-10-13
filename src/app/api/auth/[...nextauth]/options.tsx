import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import { signInByEmail, registerOauthUser, checkUser } from "./fetch";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                const params = new URLSearchParams();
                params.append("username", credentials?.username || "");
                params.append("password", credentials?.password || "");

                const user = await signInByEmail(params);

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID!,
            clientSecret: process.env.NAVER_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                if (account!.provider === "credentials") {
                    return true;
                }
                if (account!.type === "oauth") {
                    const user_check = await checkUser(account!);
                    //register user when user is not existed
                    !user_check.is_existed && (await registerOauthUser(account!, profile, user));
                    return true;
                }
                return false;
            } catch (fetchError) {
                console.log(fetchError);
                return `signin?errorcode=${fetchError}`;
            }
        },

        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        // signOut: "/auth/signout",
        newUser: "/auth/register",
    },
};
