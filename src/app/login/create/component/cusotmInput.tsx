import { type } from "os";
import { useState } from "react";

type customInputProps = {
    label: string;
    type: string;
    value: string;
    setValue: (value: string) => void;
    id: string;
    placeholder?: string | undefined;
    info: string;
    checkPolicy: (value: string) => boolean;
};

export default function CustomInput({
    label,
    type,
    placeholder = undefined,
    info,
    value,
    setValue,
    id,
    checkPolicy,
}: customInputProps) {
    return (
        <>
            <label htmlFor="password2" className="text-lg">
                {label}
            </label>
            <input
                type={type}
                className={`mt-0 block w-full px-0.5 border-0 border-b border-gray-200 focus:ring-0 focus:border-main-black ${
                    !checkPolicy(value) && "focus:border-orange-600"
                }`}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                value={value}
                id={id}
                placeholder={placeholder ?? ""}
            />
            <div className={`text-sm pt-1  ${checkPolicy(value) ? "text-white" : "text-orange-600"}`}>{info}</div>
        </>
    );
}
