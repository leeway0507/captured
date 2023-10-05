export const getAddressInfos = async (userId: string, access_token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mypage/address/?user_id=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    });
    const data = await res.json();
    return data;
};
