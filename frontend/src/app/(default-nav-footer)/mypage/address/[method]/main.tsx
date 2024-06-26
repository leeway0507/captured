"use client";
import { phoneNumberAutoFormat } from "@/app/components/custom-input/check-policy";
import { useState } from "react";
import { userAddressProps } from "@/app/type";
import { useRouter } from "next/navigation";
import AddressForm, { addAddressFromProps } from "./component/address-form";
import { updateAddressProxy, createAddressProxy } from "./component/fetch";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import ConfirmPopUpModal from "@/app/components/modal/new-yes-no-modal";
import { AlertPopUpModal } from "@/app/components/modal/new-alert-modal";

const Main = (props: userAddressProps) => {
    const {
        addressId = "",
        krName = "",
        enName = "",
        customId = "",
        phone = "",
        krAddress = "",
        enAddress = "",
        krAddressDetail = "",
        enAddressDetail = "",
    } = props;

    const router = useRouter();
    const { data: session } = useSession();
    const { method } = useParams();

    const [krNameProps, setKrNameProps] = useState(krName);
    const [enNameProps, setEnNameProps] = useState(enName);
    const [customIdProps, setCustomIdProps] = useState(customId);
    const [phoneProps, setPhoneProps] = useState(() => phoneNumberAutoFormat(phone));
    const [krAddressProps, setKrAddressProps] = useState(krAddress);
    const [krAddressDetailProps, setKrAddressDetailProps] = useState(krAddressDetail);
    const [enAddressProps, setEnAddressProps] = useState(enAddress);
    const [enAddressDetailProps, setEnAddressDetailProps] = useState(enAddressDetail);

    const address: userAddressProps = {
        addressId: addressId,
        krName: krNameProps,
        enName: enNameProps,
        customId: customIdProps,
        phone: phoneProps,
        krAddress: krAddressProps,
        enAddress: enAddressProps,
        krAddressDetail: krAddressDetailProps,
        enAddressDetail: enAddressDetailProps,
    };

    //modal

    const failureHandler = AlertPopUpModal(
        "요청 실패",
        <div className="py-4">주소 생성/요청에 실패하였습니다.</div>,
        "black-bar bg-rose-700 w-full",
        () => {}
    );

    const AddButton = () => {
        const callback = () =>
            createAddressProxy(address, session?.user.accessToken).then(router.back).catch(failureHandler);

        const handler = ConfirmPopUpModal(
            "주소 추가",
            <div className="py-4">해당 주소를 등록하시겠습니까?</div>,
            callback
        );
        return (
            <button onClick={handler} className="basis-3/4 black-bar">
                {" "}
                추가하기
            </button>
        );
    };

    const ModificationButton = () => {
        const callback = () =>
            updateAddressProxy(address, session?.user.accessToken).then(router.back).catch(failureHandler);

        const handler = ConfirmPopUpModal(
            "주소 수정",
            <div className="py-4">해당 주소를 수정하시겠습니까?</div>,
            callback
        );
        return (
            <button onClick={handler} className="basis-3/4 black-bar">
                {" "}
                수정하기
            </button>
        );
    };

    const trueButton = () => {
        return (
            <div className="flex gap-5 grow">
                {method === "create" ? <AddButton /> : <ModificationButton />}
                <button type="button" className="black-bar basis-1/4 tracking-[0.2em]" onClick={() => router.back()}>
                    취소
                </button>
            </div>
        );
    };

    const falseButton = () => {
        return (
            <div className="flex gap-5 grow">
                <button type="button" className="basis-3/4 disabled-bar" disabled>
                    필수 항목을 입력해주세요.
                </button>
                <button type="button" className="black-bar basis-1/4 tracking-[0.2em]" onClick={() => router.back()}>
                    취소
                </button>
            </div>
        );
    };

    const addressFromObject: addAddressFromProps = {
        ...address,
        setAddressId: () => {},
        setKrName: setKrNameProps,
        setEnName: setEnNameProps,
        setCustomId: setCustomIdProps,
        setPhone: setPhoneProps,
        setKrAddress: setKrAddressProps,
        setEnAddress: setEnAddressProps,
        setKrAddressDetail: setKrAddressDetailProps,
        setEnAddressDetail: setEnAddressDetailProps,
        trueButton: trueButton(),
        falseButton: falseButton(),
    };

    return (
        <div className="flex-center w-full py-16 px-4">
            <AddressForm {...addressFromObject} />
        </div>
    );
};

export default Main;
