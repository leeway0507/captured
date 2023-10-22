import { Account, User } from "next-auth";
import { setBackendEnvAPI } from "@/app/components/utils/env-utiils";

export const signInByEmail = async (params: URLSearchParams) => {
    const res = await fetch(`${setBackendEnvAPI()}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
        cache: "no-store",
    });
    return { status: res.status, user: await res.json() };
};

export const registerOauthUser = async (account: Account, profile: any, user: User) => {
    const body = { signUpType: "", userId: "", krName: "", emailVerification: true };

    body.signUpType = account.provider;
    body.userId = account.providerAccountId;
    body.krName = body.signUpType === "kakao" ? user.name! : profile.response.name;

    const res = await fetch(`${setBackendEnvAPI()}/api/auth/register-oauth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });
    return { status: res.status, user: await res.json() };
};

export const getOauthUser = async (account: Account) => {
    const res = await fetch(`${setBackendEnvAPI()}/api/auth/sign-in-sns?id=${account!.providerAccountId}`, {
        cache: "no-store",
    });

    return { status: res.status, user: await res.json() };
};
