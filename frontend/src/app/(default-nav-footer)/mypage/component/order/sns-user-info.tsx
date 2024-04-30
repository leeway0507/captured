"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SnsUserInfo = () => {
    const { data: session } = useSession();
    const router = useRouter();
    return (
        <div className="flex flex-col justify-between gap-4 pt-4 pb-8">
            <div className="flex flex-col">
                <label htmlFor="email">회원가입 방식</label>
                <input type="text" value={session?.user.signUpType} disabled className="custom-input-disabled" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="name">성 명</label>
                <input type="text" value={session?.user.krName} disabled className="custom-input-disabled" />
            </div>
        </div>
    );
};

export default SnsUserInfo;
