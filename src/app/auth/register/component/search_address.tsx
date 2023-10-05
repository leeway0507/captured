import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

export const PostcodePopUp = () => {
    const open = useDaumPostcodePopup();

    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <button type="button" onClick={handleClick}>
            Open
        </button>
    );
};
