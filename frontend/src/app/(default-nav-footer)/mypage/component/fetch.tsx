import { userAddressProps } from "@/app/type";

// export const getAddress = async (accessToken: string | undefined) => {
//     if (accessToken == undefined) {
//         return [];
//     }

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/get-address`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
//     const data = await res.json();
//     return data;
// };

export const getAddressProxy = async (accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return [];
    }
    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const res = await fetch(`${dynamicUrl}/api/get-address`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: accessToken }),
    });
    const data = await res.json();
    return data;
};

export const deleteAddress = async (address: userAddressProps, accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage/delete-address`, {
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

export const resetPasswordProxy = async (password: string, accessToken: string | undefined) => {
    if (accessToken == undefined) {
        return [];
    }

    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const res = await fetch(`${dynamicUrl}/api/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: accessToken, password }),
    });
    const data = await res.json();
    return data;
};
