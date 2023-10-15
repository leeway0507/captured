import { userAddressProps } from "@/app/type";

export const getAddress = async (accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return [];
    }

    const res = await fetch(`http://127.0.0.1:8000/api/mypage/get-address`, {
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

    const res = await fetch(`http://127.0.0.1:8000/mypage/delete-address`, {
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
