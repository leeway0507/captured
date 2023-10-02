"use client";

export default function EmailVerification() {
    const email = "wanted@captured.co.kr";
    return (
        <div className="flex-center flex-col max-w-[600px] m-auto py-12 gap-8 px-5">
            <div className="text-3xl">이메일 인증</div>
            <div className="text-xl ">
                <div>
                    <span className="underline">{email}</span>로 인증메일을 발송하였습니다.
                </div>
                <div className="flex-center pt-4">이메일을 확인하여 계정을 활성화 해주세요.</div>
            </div>
            <div className="text-2xl underline text-blue-600 cursor-pointer active:text-gray-300">
                인증메일 다시 보내기
            </div>
        </div>
    );
}