import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <div
                className="tb:me-8 font-test -rotate-[4.4deg] text-2xl xl:text-2xl text-rose-600 px-4 py-2  tracking-[0.2rem] border-4   border-rose-600 rounded"
                style={{ textShadow: "2px 3px 1px lightgrey" }}>
                CAPTURED
            </div>
        </Link>
    );
}
