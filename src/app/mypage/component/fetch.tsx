import { userAddressProps } from "@/app/type";

export const getAddress = async (access_token: string | undefined) => {
    if (access_token == undefined) {
        return [];
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mypage/get-address`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    });
    const data = await res.json();
    return data;
};

export const deleteAddress = async (address: userAddressProps, access_token: string | undefined) => {
    if (access_token == undefined) {
        return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mypage/delete-address`, {
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
