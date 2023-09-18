"use client";

import { Dropdown } from "flowbite-react";

import Image from "next/image";

export default function UserDropDown() {
    const userIcon = <Image src="/icons/person.svg" alt="person" className="flex-right" width={24} height={24} />;

    return (
        <Dropdown
            label={userIcon}
            arrowIcon={false}
            theme={{
                floating: { target: "bg-transparent enabled:hover:bg-light-gray focus:ring-light-gray " },
            }}>
            <Dropdown.Header>
                <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
            </Dropdown.Header>
            <Dropdown.Item>마이페이지</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>로그아웃</Dropdown.Item>
        </Dropdown>
    );
}
