import { userAddressProps } from "@/app/type";

export const getAddressProxy = async (accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return [];
    }
    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const res = await fetch(`${dynamicUrl}/api/mypage/get-address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: accessToken }),
    });
    const data = await res.json();
    return data;
};

export const deleteAddressProxy = async (address: userAddressProps, accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return;
    }
    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const res = await fetch(`${dynamicUrl}/api/mypage/delete-address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, accessToken }),
    });
    const data = await res.json();
    return data;
};

export const resetPasswordProxy = async (password: string, accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return [];
    }

    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const res = await fetch(`${dynamicUrl}/api/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: accessToken, password }),
    });
    const data = await res.json();
    return data;
};
