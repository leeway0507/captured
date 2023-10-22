import { userAddressProps } from "@/app/type";
import { setBackendEnvAPI } from "@/app/components/utils/env-utiils";

export const getAddress = async (accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return [];
    }

    const res = await fetch(`${setBackendEnvAPI()}/api/mypage/get-address`, {
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

    const res = await fetch(`${setBackendEnvAPI()}/api/mypage/delete-address`, {
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

    const res = await fetch(`${setBackendEnvAPI()}/api/mypage/resset-password`, {
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
