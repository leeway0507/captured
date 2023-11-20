import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex flex-col bg-footer-gray py-3 font-bold px-4 tb:px-8 xl:px-12 text-xs tb:text-base">
            <div className="flex justify-between tb:justify-around">
                <Link href="/aboutus">사이트 소개</Link>
                <Link href={process.env.NEXT_PUBLIC_INSTARGRAM_URL!}>인스타그램</Link>

                <Link href="/mypage">주문조회</Link>
                <Link href="/support/faq">자주 묻는 질문</Link>
                <Link href={process.env.NEXT_PUBLIC_CUSTOM_ID_URL!} className="tracking-tight">
                    통관부호 발급
                </Link>
            </div>
            <div className="flex-1 flex-col py-5 ">
                <div className="pb-2">스톡헌터스</div>
                <div className="flex flex-col text-blue-black pb-4 gap-1">
                    <div>사업자 등록 번호 : 372-55-00754</div>
                    <div>서울특별시 양천구 목동중앙로 143 101, 801</div>
                    <div>
                        <Link href="/policy/service" className="hover:text-main-black">
                            서비스 이용약관
                        </Link>
                    </div>
                    <div>
                        <Link href="/policy/privacy" className="hover:text-main-black">
                            개인정보 처리방침
                        </Link>
                    </div>
                    <div>COPY RIGHT © 2023 Captured. ALL RIGHT RESERVED.</div>
                </div>
            </div>
        </div>
    );
}
