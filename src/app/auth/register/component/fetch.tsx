import { userAddressProps, userProps } from "@/app/type";
import { user, user_address } from "@/app/types/fastapi-schema";

interface register {
    userData: userProps;
    addressData: userAddressProps;
}

export const register = async (props: register) => {
    const { userData, addressData } = props;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user(userData), address: user_address(addressData) }),
    });

    console.log("res.ok", res.ok);

    return res.ok ? true : false;
};

export const checkEmailDuplication = async (email: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/email-check?email=${email}`);
    const data = await res.json();
    return data.isUnique;
};
