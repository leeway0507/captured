import CustomInput from "@/app/components/custom-input/cusotm-input";
import { checkPasswordPolicy, checkPasswordAgain } from "@/app/components/custom-input/check-policy";
import { useState } from "react";

export default function PersonalInfoForm() {
    const email = "wanted@captured.co.kr";
    const name = "김철수";
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    return (
        <div className="flex flex-col my-8 text-sm max-w-[500px] mx-auto">
            <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col">
                    <label htmlFor="email">이메일 주소</label>
                    <input type="text" value={email} disabled className="custom-input-disabled" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name">성 명</label>
                    <input type="text" value={name} disabled className="custom-input-disabled" />
                </div>
                {/* <div className="pt-5 text-lg">비밀번호 변경</div> */}
                <div className="flex justify-between gap-4 ">
                    <div className="flex flex-col text-sm">
                        <CustomInput
                            label="비밀번호"
                            type="password"
                            info="8글자 이상의 영문 숫자 조합이어야 합니다."
                            value={password1}
                            setValue={setPassword1}
                            id="password1"
                            checkPolicy={checkPasswordPolicy}
                        />
                    </div>
                    <div className="flex flex-col">
                        <CustomInput
                            label="비밀번호 확인"
                            type="password"
                            info="비밀번호가 일치하지 않습니다."
                            value={password2}
                            setValue={setPassword2}
                            id="password2"
                            checkPolicy={(value) => checkPasswordAgain(password1, value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
