export const getOrderHistory = async (accessToken: string) => {
    const res = await fetch(`${process.env.API_URL}/api/order/get-order-history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await res.json();
};
