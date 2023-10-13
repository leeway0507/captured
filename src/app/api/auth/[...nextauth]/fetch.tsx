import { Profile, Account, User } from "next-auth";

export const signInByEmail = async (params: URLSearchParams) => {
    const res = await fetch(`http://127.0.0.1:8000/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });
    return await res.json();
};

export const registerOauthUser = async (account: Account, profile: any, user: User) => {
    const body = { signUpType: "", userId: "", krName: "", emailVerification: true };

    body.signUpType = account.provider;
    body.userId = account.providerAccountId;
    body.krName = body.signUpType === "kakao" ? user.name! : profile.response.name;

    const res = await fetch(`http://127.0.0.1:8000/api/auth/register-oauth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return await res.json();
};

export const checkUser = async (account: Account) => {
    const res = await fetch(`http://127.0.0.1:8000/api/auth/user_check?ueser_id=${account!.providerAccountId}`);
    const result: { is_existed: boolean } = await res.json();
    return result;
};
