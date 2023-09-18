import Image from "next/image";
import Link from "next/link";

export default function BrandList() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row ">
                <Link href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </Link>
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </Link>
                <Link href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </Link>
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </Link>
                <Link href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </Link>
            </div>
            <div className="flex flex-row w-full">
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </Link>
                <Link href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </Link>
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </Link>
                <Link href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </Link>
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </Link>
            </div>
            <Link
                href="."
                className="mt-1 me-2 flex justify-end text-deep-gray text-xs tb:text-base hover:text-sub-black">
                브랜드 더보기
            </Link>
        </div>
    );
}
