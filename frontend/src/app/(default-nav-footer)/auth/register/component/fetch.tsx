import { userAddressProps, userProps } from "@/app/type";
import { setBackendEnvAPI } from "@/app/components/utils/env-utiils";

interface register {
    userData: userProps;
    addressData: userAddressProps;
}

export const register = async (props: register) => {
    const { userData, addressData } = props;

    const res = await fetch(`${setBackendEnvAPI()}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_registration: userData, address: addressData }),
    });

    console.log("res.ok", res.ok);

    return res.ok ? true : false;
};

export const checkEmailDuplication = async (email: string) => {
    const res = await fetch(`${setBackendEnvAPI()}/api/auth/email-check?email=${email}`);
    const data = await res.json();
    return data.isUnique;
};
