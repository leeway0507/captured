import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <div className="font-test text-4xl text-rose-600 tracking-[0.05rem] py-1 px-4">CAPTURED</div>
        </Link>
    );
}
