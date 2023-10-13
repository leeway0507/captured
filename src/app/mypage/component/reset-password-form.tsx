import CustomInput from "@/app/components/custom-input/cusotm-input";
import { checkPasswordPolicy, checkPasswordAgain } from "@/app/components/custom-input/check-policy";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ResetPasswordFrom() {
    const { data: session, status } = useSession();
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    console.log("mypage session", session);

    //api-call - 비밀번호 변경
    //status : 제작필요
    //type : GET
    //url : /api/auth/rest-password
    //function : reset-password() => response(200)

    return (
        <div className="flex flex-col my-8 text-sm max-h-[600px] max-w-[500px] mx-auto">
            <div className="flex flex-col justify-between gap-4">
                <div className="flex flex-col">
                    <label htmlFor="email">이메일 주소</label>
                    <input type="text" value={session?.user.email} disabled className="custom-input-disabled" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name">성 명</label>
                    <input type="text" value={session?.user.krName} disabled className="custom-input-disabled" />
                </div>
                <div className="flex justify-between gap-4 ">
                    <div className="flex flex-col basis-1/2">
                        <CustomInput
                            label="신규 비밀번호"
                            type="password"
                            info="8글자 이상의 영문 숫자 조합이어야 합니다."
                            value={password1}
                            setValue={setPassword1}
                            id="password1"
                            checkPolicy={checkPasswordPolicy}
                        />
                    </div>
                    <div className="flex flex-col basis-1/2">
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
                <div className="black-bar tracking-[0.2em]">변경하기</div>
            </div>
        </div>
    );
}
