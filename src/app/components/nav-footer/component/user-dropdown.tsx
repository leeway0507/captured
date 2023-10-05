import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SignInOutButton from "./sign-btn";
import Link from "next/link";

export default function UserDropDown() {
    const { data: session } = useSession();
    const userIcon = <Image src="/icons/person.svg" alt="person" className="flex-right" width={24} height={24} />;
    return (
        <>
            {!session ? (
                <Link href="/auth/signin" className="px-4 link-animation">
                    {userIcon}
                </Link>
            ) : (
                <Dropdown
                    label={userIcon}
                    arrowIcon={false}
                    theme={{
                        floating: {
                            target: "bg-transparent link-animation enabled:hover:bg-transparent  focus:ring-transparent  ",
                        },
                    }}>
                    <Dropdown.Header>
                        {session.user.kr_name}({session.user.email})
                    </Dropdown.Header>
                    <Dropdown.Item>
                        <Link href="/mypage">마이페이지</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <SignInOutButton />
                    </Dropdown.Item>
                </Dropdown>
            )}
        </>
    );
}
