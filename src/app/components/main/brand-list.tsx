import Image from "next/image";
import Link from "next/link";

export default function BrandList() {
    return (
        <div className="flex flex-col w-full">
            <Link href="/brands" className="mt-1 me-2 flex justify-end text-sub-black text-lg hover:text-sub-black">
                브랜드 더보기
            </Link>
            <div className="flex flex-row ">
                <Link href="." className="brand-box bg-main-black">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={1000}
                        height={1000}
                        className="img-hover"
                    />
                </Link>
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={1000}
                        height={1000}
                        alt="Arcteryx-logo"
                        className="img-hover"
                    />
                </Link>
                <Link href="." className="brand-box bg-main-black">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={1000}
                        height={1000}
                        className="img-hover"
                    />
                </Link>
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={1000}
                        height={1000}
                        alt="Arcteryx-logo"
                        className="img-hover"
                    />
                </Link>
                <Link href="." className="brand-box bg-main-black">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={1000}
                        height={1000}
                        className="img-hover"
                    />
                </Link>
            </div>
            <div className="flex flex-row w-full">
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={1000}
                        height={1000}
                        alt="Arcteryx-logo"
                        className="img-hover"
                    />
                </Link>
                <Link href="." className="brand-box bg-main-black">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={1000}
                        height={1000}
                        className="img-hover"
                    />
                </Link>
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={1000}
                        height={1000}
                        alt="Arcteryx-logo"
                        className="img-hover"
                    />
                </Link>
                <Link href="." className="brand-box bg-main-black">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={1000}
                        height={1000}
                        className="img-hover"
                    />
                </Link>
                <Link href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={1000}
                        height={1000}
                        alt="Arcteryx-logo"
                        className="img-hover"
                    />
                </Link>
            </div>
        </div>
    );
}
