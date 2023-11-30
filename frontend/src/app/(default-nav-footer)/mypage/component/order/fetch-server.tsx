export const getOrderHistory = async (accessToken: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/get-order-history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return { status: res.status, data: await res.json() };
};

export const getUserAddressInfo = async (addressId: string, accessToken: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/get-address-info?address_id=${addressId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await res.json();
};

export const getOrderRows = async (ordreId: string, accessToken: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/get-order-row?order_id=${ordreId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await res.json();
};
