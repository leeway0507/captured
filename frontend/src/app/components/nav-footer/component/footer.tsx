import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex flex-col bg-footer-gray py-2 font-bold ">
            <div className="flex flex-row justify-between px-16 xl:px-24 py-3 border-b-2 text-sm tb:text-base">
                <Link href={process.env.NEXT_PUBLIC_INSTARGRAM_URL!} className="ms-2">
                    <div className="flex-center">
                        <Image src="/icons/instagram.svg" width={16} height={16} alt="instagram" />
                        <div className="ms-2">인스타그램</div>
                    </div>
                </Link>
                <Link href={process.env.NEXT_PUBLIC_CUSTOM_ID_URL!}>
                    <div className="flex-center">
                        <Image src="/icons/approval.svg" width={20} height={20} alt="instagram" />
                        <div className="ms-2">개인통관부호 발급</div>
                    </div>
                </Link>
            </div>

            <div className="flex flex-row justify-between px-8 tb:px-12 xl:px-16 py-3 text-xs tb:text-sm tb:text-base">
                <Link href="/support/aboutus">ABOUT US</Link>
                <Link href="/support/faq">FAQ</Link>
                <Link href="/support/policy/delivery">배송안내</Link>
                <Link href="/support/policy/privacy">개인정보</Link>
                <Link href="/mypage">주문조회</Link>
            </div>
            <div className="py-3"></div>
            <div className="flex-1 flex-col px-8 tb:px-12 xl:px-16 text-xs tb:text-sm ">
                <div className="text-sm tb:text-base pb-2">스톡헌터스</div>
                <div className="flex flex-col text-blue-black pb-4 gap-1">
                    <div>사업자 등록 번호 : 372-55-00754</div>
                    <div>서울특별시 양천구 목동중앙로 143 101, 801</div>
                    <div>
                        <Link href="/support/policy/service" className="hover:text-main-black">
                            서비스 이용약관
                        </Link>
                    </div>
                    <div>
                        <Link href="/support/policy/privacy" className="hover:text-main-black">
                            개인정보 처리방침
                        </Link>
                    </div>
                    <div>COPY RIGHT © 2023 Captured. ALL RIGHT RESERVED.</div>
                </div>
            </div>
        </div>
    );
}
