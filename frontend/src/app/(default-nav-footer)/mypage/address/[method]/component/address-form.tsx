import CustomInput from "@/app/components/custom-input/cusotm-input";
import {
    phoneNumberAutoFormat,
    checkName,
    checkEnName,
    checkPhone,
    checkCustomId,
    checkAddressValidation,
} from "@/app/components/custom-input/check-policy";
import { setUserAddressProps } from "@/app/type";
import { PostcodePopUp } from "./search_address";

export interface addAddressFromProps extends setUserAddressProps {
    trueButton: JSX.Element;
    falseButton: JSX.Element;
}

export default function AddressForm(props: addAddressFromProps) {
    const {
        addressId,
        krName,
        enName,
        customId,
        phone,
        krAddress,
        enAddress,
        krAddressDetail,
        enAddressDetail,
        setAddressId,
        setKrName,
        setEnName,
        setCustomId,
        setPhone,
        setKrAddress,
        setEnAddress,
        setKrAddressDetail,
        setEnAddressDetail,
        trueButton,
        falseButton,
    } = props;

    const CheckButton = () => {
        if (checkAddressValidation(krName, enName, customId, phone, krAddress, enAddress)) {
            return trueButton;
        } else {
            return falseButton;
        }
    };

    return (
        <>
            <div className="flex flex-col max-w-md text-xs grow bg-white">
                <div className="flex gap-5">
                    <div className="grow">
                        <CustomInput
                            label="한글 성명"
                            type="text"
                            placeholder="홍길동"
                            info="최소 2글자 이상의 한글이어야 합니다."
                            value={krName}
                            setValue={setKrName}
                            id="krName"
                            checkPolicy={checkName}
                            maxLength={10}
                        />
                    </div>
                    <div className="grow">
                        <CustomInput
                            label="영문 성명"
                            type="text"
                            placeholder="hong gil dong"
                            info="영문 성명을 입력해주세요."
                            value={enName}
                            setValue={setEnName}
                            id="enName"
                            checkPolicy={checkEnName}
                            maxLength={20}
                        />
                    </div>
                </div>
                <CustomInput
                    label="휴대폰번호"
                    type="tel"
                    placeholder="010-0000-0000"
                    info="최대 11자리 숫자만 입력 가능합니다."
                    value={phoneNumberAutoFormat(phone)}
                    setValue={setPhone}
                    id="phone"
                    checkPolicy={checkPhone}
                    maxLength={13}
                />
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="grow me-2">
                            <CustomInput
                                label="개인통관고유부호"
                                type="text"
                                placeholder="p012345678912"
                                info="통관부호 양식이 일치하지 않습니다."
                                value={customId}
                                setValue={setCustomId}
                                id="customId"
                                checkPolicy={checkCustomId}
                                maxLength={13}
                            />
                        </div>
                        <div className="cursor-pointer whitespace-nowrap flex-center pb-3"></div>
                    </div>

                    <div className=" flex-center bg-light-gray text-sub-black rounded-md border px-5 py-3 mb-2 ">
                        개인통관고유부호 불일치는 통관지연, 오배송의 원인이 됩니다.
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-xs">한글 주소</div>
                    <div className="flex justify-between">
                        <div className="grow me-2 flex-left">
                            <div className="py-2 border-b border-light-gray grow text-main-black">
                                {krAddress === "" ? (
                                    <div className="text-sm text-gray-400">한글 도로명 주소 입력</div>
                                ) : (
                                    krAddress
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex  cursor-pointer py-2">
                                <div className="cursor-pointer whitespace-nowrap flex-center">
                                    <PostcodePopUp setKrAddress={setKrAddress} setEnAddress={setEnAddress} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <CustomInput
                            label="상세주소(동,호수 입력)"
                            type="text"
                            placeholder="101,801"
                            info=""
                            value={krAddressDetail}
                            setValue={setKrAddressDetail}
                            id="setKrAddress"
                            checkPolicy={() => true}
                            maxLength={50}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-xs">영문 주소</div>
                    <div className="flex justify-between">
                        <div className="grow me-2 flex-left">
                            <div className="py-2 border-b border-light-gray grow text-main-black">
                                {enAddress === "" ? (
                                    <div className="text-sm text-gray-400">영문 도로명 주소 입력</div>
                                ) : (
                                    enAddress
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex  cursor-pointer py-2">
                                <div className="cursor-pointer whitespace-nowrap flex-center">
                                    <PostcodePopUp setKrAddress={setKrAddress} setEnAddress={setEnAddress} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-2">
                        <CustomInput
                            label="상세주소(동,호수 입력)"
                            type="text"
                            placeholder="101,801"
                            info=""
                            value={enAddressDetail}
                            setValue={setEnAddressDetail}
                            id="setEnAddress"
                            checkPolicy={() => true}
                            maxLength={50}
                        />
                    </div>
                </div>
                <div className="flex gap-5">
                    <CheckButton />
                </div>
            </div>
        </>
    );
}
