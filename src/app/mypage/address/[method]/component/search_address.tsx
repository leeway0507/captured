import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

interface PostcodePopUpProps {
    setKrAddress: (address: string) => void;
    setEnAddress: (address: string) => void;
}

export const PostcodePopUp = (props: PostcodePopUpProps) => {
    const { setKrAddress, setEnAddress } = props;

    const open = useDaumPostcodePopup();

    const handleComplete = (data: any) => {
        let road = data.roadAddress;
        let building = data.buildingName;
        let engAddress = data.roadAddressEnglish;

        if (building !== "") {
            road += `(${building})`;
        }

        setKrAddress(road);
        setEnAddress(engAddress);
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="border p-2 bg-light-gray rounded active:bg-deep-gray text-xs ">
            도로명 주소 찾기
        </button>
    );
};
