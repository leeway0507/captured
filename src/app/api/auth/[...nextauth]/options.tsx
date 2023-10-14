import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import * as api from "./fetch";

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
                const res = await api.signInByEmail(params).catch(() => {
                    throw new Error("네트워크 상태를 확인해주세요.");
                });
                if (res.status == 404) throw new Error("일치하는 아이디가 없습니다.");
                if (res.status == 401) throw new Error("아이디 또는 패스워드가 일치하지 않습니다.");

                if (res.status == 200) {
                    // Any object returned will be saved in `user` property of the JWT
                    return res.user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
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
                if (account!.type === "credentials") {
                    return true;
                }
                if (account!.type === "oauth") {
                    var user_check = await api.getOauthUser(account!);

                    //register user when user is not existed
                    const res =
                        user_check.status == 404 ? await api.registerOauthUser(account!, profile, user) : user_check;

                    //update user when user is existed
                    user.accessToken = res.user.accessToken;
                    user.krName = res.user.krName;
                    user.signUpType = res.user.signUpType;
                    user.emailVerification = res.user.emailVerification;

                    return true;
                }
                throw new Error("잘못된 접근입니다.");
            } catch (err) {
                return `/auth/login-fail?error=${err}`;
            }
        },

        async jwt({ token, user, account, profile }) {
            console.log("---------jwt---------");
            console.log("token : ", token);
            console.log("user : ", user);
            console.log("account : ", account);
            console.log("profile : ", profile);

            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        error: "/auth/login-fail",
        newUser: "/auth/register",
    },
};
