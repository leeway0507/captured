import { setBackendEnvAPI } from "@/app/components/utils/env-utiils";
import { userAddressProps } from "@/app/type";

export const createAddress = async (address: userAddressProps, access_token: string | undefined) => {
    if (access_token == undefined) {
        return;
    }

    const res = await fetch(`${setBackendEnvAPI()}/api/mypage/create-address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(address),
    });
    const data = await res.json();
    return data;
};

export const updateAddress = async (address: userAddressProps, access_token: string | undefined) => {
    if (access_token == undefined) {
        return;
    }

    const res = await fetch(`${setBackendEnvAPI()}/api/mypage/update-address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(address),
    });
    const data = await res.json();
    return data;
};
