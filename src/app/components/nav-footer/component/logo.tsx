import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <div
                className="tb:me-8 font-test -rotate-[7deg] text-lg tb:text-xl xl:text-2xl text-rose-600 border-4  px-4 py-2 border-rose-600 tracking-[0.2rem]"
                style={{ boxShadow: "4px 5px 3px lightgrey", textShadow: "2px 3px 1px lightgrey" }}>
                CAPTURED
            </div>
        </Link>
    );
}
