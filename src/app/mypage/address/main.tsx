import { phoneNumberAutoFormat } from "@/app/components/custom-input/check-policy";
import { useState } from "react";
import { userAddressProps } from "../type";
import { useRouter } from "next/navigation";
import AlertModalWithoutBtn from "@/app/components/modal/alert-modal-without-btn";
import YesNoModal from "@/app/components/modal/yes-no-modal";
import * as api from "./apis";
import AddressForm, { addAddressFromProps } from "./component/address-form";

const Main = (props: userAddressProps) => {
    const { addressId, krName, enName, customId, phone, krAddress, enAddress, krAddressDetail, enAddressDetail } =
        props;
    const router = useRouter();

    const [krNameProps, setKrNameProps] = useState(krName);
    const [enNameProps, setEnNameProps] = useState(enName);
    const [customIdProps, setCustomIdProps] = useState(customId);
    const [phoneProps, setPhoneProps] = useState(() => phoneNumberAutoFormat(phone));
    const [krAddressProps, setKrAddressProps] = useState(krAddress);
    const [krAddressDetailProps, setKrAddressDetailProps] = useState(krAddressDetail);
    const [enAddressProps, setEnAddressProps] = useState(enAddress);
    const [enAddressDetailProps, setEnAddressDetailProps] = useState(enAddressDetail);

    //modal

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openFailureModal, setOpenFailureModal] = useState(false);

    function FailureModal() {
        return AlertModalWithoutBtn({
            title: "주소 추가 실패",
            content: "주소 추가에 실패하였습니다.",
            isOpen: openFailureModal,
            setIsOpen: setOpenFailureModal,
            checkColor: "red",
        });
    }
    const SuccessModal = () => {
        return AlertModalWithoutBtn({
            title: "주소 추가 성공",
            content: "주소 추가에 성공하였습니다.",
            isOpen: openSuccessModal,
            setIsOpen: setOpenSuccessModal,
            trueCallback: () => {
                // router.push("/mypage/?pageindex=2");
                router.back();
            },
            checkColor: "green",
        });
    };

    const customIdTrueButton = () => {
        return (
            <div className="flex gap-5">
                <YesNoModal
                    toggleName={<div>{"추가/변경하기"}</div>}
                    title="주소 추가"
                    content="해당 주소를 등록하시겠습니까?"
                    buttonClassName="basis-3/4 black-bar"
                    trueCallback={() =>
                        api.AddAddress({
                            reqData: addressFromObject,
                            setOpenSuccessModal: setOpenSuccessModal,
                            setOpenFailureModal: setOpenFailureModal,
                        })
                    }
                />
                <button type="button" className="black-bar basis-1/4 tracking-[0.2em]" onClick={() => router.back()}>
                    취소
                </button>
            </div>
        );
    };

    const customIdFalseButton = () => {
        return (
            <div className="flex gap-5">
                <button type="button" className="basis-3/4 black-bar">
                    통관부호 확인이 필요합니다.
                </button>
                <button type="button" className="black-bar basis-1/4 tracking-[0.2em]" onClick={() => router.back()}>
                    취소
                </button>
            </div>
        );
    };

    const addressFromObject: addAddressFromProps = {
        addressId: addressId,
        krName: krNameProps,
        enName: enNameProps,
        customId: customIdProps,
        phone: phoneProps,
        krAddress: krAddressProps,
        enAddress: enAddressProps,
        krAddressDetail: krAddressDetailProps,
        enAddressDetail: enAddressDetailProps,
        setAddressId: () => {},
        setKrName: setKrNameProps,
        setEnName: setEnNameProps,
        setCustomId: setCustomIdProps,
        setPhone: setPhoneProps,
        setKrAddress: setKrAddressProps,
        setEnAddress: setEnAddressProps,
        setKrAddressDetail: setKrAddressDetailProps,
        setEnAddressDetail: setEnAddressDetailProps,
        customIdTrueButton: customIdTrueButton(),
        customIdFalseButton: customIdFalseButton(),
    };

    return (
        <>
            <AddressForm {...addressFromObject} />
            <SuccessModal />
            <FailureModal />
        </>
    );
};

export default Main;
