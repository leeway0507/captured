import { setBackendEnvAPI } from "@/app/components/utils/env-utiils";

export const getOrderHistory = async (accessToken: string) => {
    const res = await fetch(`${setBackendEnvAPI()}/api/order/get-order-history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await res.json();
};

export const getUserAddressInfo = async (addressId: string, accessToken: string) => {
    const res = await fetch(`${setBackendEnvAPI()}/api/mypage/get-address-info?address_id=${addressId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await res.json();
};

export const getOrderRows = async (ordreId: string, accessToken: string) => {
    const res = await fetch(`${setBackendEnvAPI()}/api/order/get-order-row?order_id=${ordreId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await res.json();
};
