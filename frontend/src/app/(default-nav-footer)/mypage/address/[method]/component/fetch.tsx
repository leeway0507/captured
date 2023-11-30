import { userAddressProps } from "@/app/type";

export const createAddressProxy = async (address: userAddressProps, accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return;
    }
    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const res = await fetch(`${dynamicUrl}/api/mypage/create-address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, accessToken }),
    });
    const data = await res.json();
    return data;
};

export const updateAddressProxy = async (address: userAddressProps, accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return;
    }

    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const res = await fetch(`${dynamicUrl}/api/mypage/update-address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, accessToken }),
    });
    const data = await res.json();
    return data;
};
