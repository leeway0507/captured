export const getOrderHistory = async (accessToken: string) => {
    const res = await fetch(`http://127.0.0.1:8000/api/order/get-order-history`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return await res.json();
};
