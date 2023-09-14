import Image from "next/image";

export default function BrandList() {
    return (
        <div>
            <div className="flex flex-row ">
                <a href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </a>
                <a href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </a>
                <a href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </a>
                <a href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </a>
                <a href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </a>
            </div>
            <div className="flex flex-row">
                <a href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </a>
                <a href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </a>
                <a href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </a>
                <a href="." className="brand-box bg-slate-900">
                    <Image
                        src="/brands/adidas-original-logo.png"
                        alt="test-img"
                        width={100}
                        height={100}
                        className="img-hover w-full h-full"
                    />
                </a>
                <a href="." className="brand-box">
                    <Image
                        src="/brands/arcteryx-logo.png"
                        width={100}
                        height={100}
                        alt="Arcteryx-logo"
                        className="img-hover w-full h-full"
                    />
                </a>
            </div>
            <a href="." className="mt-1 me-2 flex justify-end blue-black text-xs tb:text-base hover:text-main-black">
                브랜드 더보기
            </a>
        </div>
    );
}
