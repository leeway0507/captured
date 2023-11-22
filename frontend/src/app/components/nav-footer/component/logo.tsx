import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <div
                className="-rotate-[5.7deg] font-test text-2xl tb:me-8 tb:text-xl xl:text-2xl text-rose-600 px-4 py-2 tracking-[0.2rem] border-4 border-rose-600 rounded"
                style={{ textShadow: "2px 2px 2px lightgrey" }}>
                CAPTURED
            </div>
        </Link>
    );
}
