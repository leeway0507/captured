import { setBackendEnvAPI } from "@/app/components/utils/env-utiils";
import useSWR from "swr";

const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    }).then((res) => res.json());

export const GetUserAddressInfo = (addressId: string, accessToken: string) => {
    const { data, error, isLoading } = useSWR(
        [`${setBackendEnvAPI}/api/mypage/get-address-info?address_id=${addressId}`, accessToken],
        ([url, accessToken]) => fetcher(url, accessToken)
    );
    return { data: data, error: error, isLoading: isLoading };
};

export const GetOrderRows = (ordreId: string, accessToken: string) => {
    const { data, error, isLoading } = useSWR(
        [`${setBackendEnvAPI}/api/order/get-order-row?order_id=${ordreId}`, accessToken],
        ([url, token]) => fetcher(url, token)
    );

    return { data: data, error: error, isLoading: isLoading };
};
