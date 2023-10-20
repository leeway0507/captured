import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function UserDropDown() {
    const { data: session } = useSession();
    const userIcon = <Image src="/icons/person.svg" alt="person" className="flex-right" width={28} height={28} />;

    return (
        <>
            {!session ? (
                <Link href="/auth/signin" className="flex px-4 py-2">
                    {userIcon}
                </Link>
            ) : (
                <div className="group relative flex-center">
                    <button className=" flex px-4 py-2 ">{userIcon}</button>
                    <div className="border hidden absolute top-full z-50 group-hover:block flex flex-col bg-white text-sm shadow-lg rounded-md">
                        <div className="whitespace-nowrap py-3 px-4 border-b-2 border-light-gray">
                            {session?.user.krName}(
                            <span className="text-xs">
                                {session?.user.signUpType === "email" ? (
                                    session.user.email
                                ) : (
                                    <span className="captalize">{session.user.signUpType}</span>
                                )}
                            </span>
                            )
                        </div>
                        <Link href="/mypage" className="link-animation">
                            <div className="whitespace-nowrap py-3 px-4 w-full hover:bg-slate-50">마이페이지</div>
                        </Link>
                        <div className="link-animation hover:bg-slate-50 ">
                            <button
                                type="button"
                                className="whitespace-nowrap py-3 px-4 w-full flex-left"
                                onClick={() => signOut({ callbackUrl: "/" })}>
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}