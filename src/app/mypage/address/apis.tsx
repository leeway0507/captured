import { addressFormProps } from "../type";

//api-call - 통관부호 확인
//status : 제작필요
//type : GET
//url : /api/mypage/address/check-custom-id
//function : check_custom_id(name:str, custom_id:str, phone:str) => response[200]
interface verifyCustomIdProps {
    reqData: { name: string; customId: string; phone: string };
    setCustomStatus: (value: boolean) => void;
}

export const verifyCustomId = (props: verifyCustomIdProps) => {
    const { reqData, setCustomStatus } = props;

    const result = 200;
    if (result === 200) {
        return setCustomStatus(true);
    } else return setCustomStatus(false);
};

//api-call - 도로명 주소(한글)
//status : 제작필요
//type : GET
//url : /api/mypage/address/find-address
//function : find_kr_address(address:str) => Dict(kor_address:str,en_address:str)

interface findKrAddressProps {
    address: string;
    setKrAddressProps: (v: string) => void;
    setEnAddressProps: (v: string) => void;
}

export const find_kr_address = (props: findKrAddressProps) => {
    const { address, setKrAddressProps, setEnAddressProps } = props;

    const result = {
        kor_address: "서울특별시 강남구 테헤란로 427",
        en_address: "427, Teheran-ro, Gangnam-gu, Seoul, Republic of Korea",
    };
    setKrAddressProps(result.kor_address);
    setEnAddressProps(result.en_address);
};

//api-call - 도로명 주소(영문)
//status : 제작필요
//type : GET
//url : /api/mypage/address/find-address
//function : find_address(address:str) => Dict(en_address:str)

interface findEnAddressProps {
    address: string;
    setEnAddressProps: (v: string) => void;
}

export const find_en_address = (props: findEnAddressProps) => {
    const { address, setEnAddressProps } = props;

    const result = {
        en_address: "427, Teheran-ro, Gangnam-gu, Seoul, Republic of Korea",
    };

    setEnAddressProps(result.en_address);
};

//api-call - 배송주소 추가 및 변경
//status : 제작필요
//type : POST
//url : /api/mypage/add-address
//function : add_address(addressFormProps) => response[201]
//DB : user_address

interface AddAddressProps {
    reqData: addressFormProps;
    setOpenSuccessModal: (v: boolean) => void;
    setOpenFailureModal: (v: boolean) => void;
}

export const AddAddress = (props: AddAddressProps) => {
    const { reqData, setOpenSuccessModal, setOpenFailureModal } = props;

    const result = 201;
    if (result === 201) {
        setOpenSuccessModal(true);
    } else setOpenFailureModal(true);
};
