import { userAddressProps } from "@/app/type";

export const getAddress = async (accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return [];
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/get-address`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await res.json();
    return data;
};

export const deleteAddress = async (address: userAddressProps, accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/delete-address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(address),
    });
    const data = await res.json();
    return data;
};

export const resetPassword = async (password: string, accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/resset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ password: password }),
    });
    const data = await res.json();
    return data;
};
