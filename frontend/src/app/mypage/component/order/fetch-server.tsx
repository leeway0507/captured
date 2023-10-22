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
