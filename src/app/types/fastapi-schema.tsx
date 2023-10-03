import { userAddressProps, userProps } from "../type";

export const user_address = (data: userAddressProps) => {
    return {
        address_id: data.addressId,
        kr_name: data.krName,
        en_name: data.enName,
        custom_id: data.customId,
        phone: data.phone,
        kr_address: data.krAddress,
        kr_address_detail: data.krAddressDetail,
        en_address: data.enAddress,
        en_address_detail: data.enAddressDetail,
    };
};

export const user = (data: userProps) => {
    return {
        email: data.email,
        password: data.password,
        kr_name: data.name,
    };
};
