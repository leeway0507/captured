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
                    //update user when user is existed
                    // Swagger에서는 accessToken을 인식 못하므로 signin result에 대해서는 snake_case를 사용
                    const user = {
                        id: "",
                        userId: "",
                        accessToken: "",
                        krName: "",
                        signUpType: "",
                        emailVerification: false,
                        email: "",
                    };

                    user.userId = res.user.user_id;
                    user.accessToken = res.user.access_token;
                    user.krName = res.user.kr_name;
                    user.signUpType = res.user.sign_up_type;
                    user.emailVerification = res.user.email_verification;
                    user.email = res.user.email;
                    return user;
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
                    const user_check = await api.getOauthUser(account!);

                    // console.log("---------signIn---------");
                    // console.log(user_check);

                    //register user when user is not existed
                    const userInfo =
                        user_check.status == 404 ? await api.registerOauthUser(account!, profile, user) : user_check;

                    if (userInfo.status == 406) throw new Error("406 error");

                    //update user when user is existed
                    // Swagger에서는 accessToken을 인식 못하므로 signin result에 대해서는 snake_case를 사용
                    user.accessToken = userInfo.user.access_token;
                    user.krName = userInfo.user.kr_name;
                    user.signUpType = userInfo.user.sign_up_type;
                    user.emailVerification = userInfo.user.email_verification;

                    return true;
                }
                throw new Error("401 error");
            } catch (err) {
                console.log(err);
                return `/auth/login-fail?error=${err}`;
            }
        },

        async jwt({ token, user, account, profile }) {
            // console.log("---------jwt---------");
            // console.log("token : ", token);
            // console.log("user : ", user);
            // console.log("account : ", account);
            // console.log("profile : ", profile);

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
