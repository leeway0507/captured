import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-footer-gray w-full px-2 tb:px-4 mb-[50px] tb:mb-[0px] pt-8 pb-12">
            <div id="footer" className="flex flex-col gap-4 text-xs tb:text-sm max-w-[1440px] mx-auto">
                <FooterNavBar />
                <CompanyInfo />
                <Policy />
            </div>
        </div>
    );
}

const FooterNavBar = () => (
    <div className="flex gap-3 font-bold">
        <Link href="/aboutus">사이트 소개</Link>
        <Link href="/support/faq">자주 묻는 질문</Link>
        <Link href="/mypage">주문조회</Link>
        <Link target="_blank" href={process.env.NEXT_PUBLIC_INSTARGRAM_URL!}>
            인스타그램
        </Link>
        <Link target="_blank" href={process.env.NEXT_PUBLIC_CUSTOM_ID_URL!} className="tracking-tight">
            통관부호 발급
        </Link>
    </div>
);

const CompanyInfo = () => (
    <>
        <div className="flex flex-col tb-1">
            <div className="font-bold">스톡헌터스</div>
            <div>사업자등록번호 372-55-00754 | 대표자 이양우 </div>
            <div>0502-1935-3403 | {process.env.NEXT_PUBLIC_CUSTOMER_EMAIL} </div>
            <div>
                {" "}
                {/* <Link href={""} className="font-bold opacity-70">
                    사업자정보 확인
                </Link> */}
            </div>
            <div>서울시 양천구 목동중앙로 143 101, 801</div>
        </div>
        <div>COPY RIGHT © 2023 CAPTURED. ALL RIGHT RESERVED.</div>
    </>
);

const Policy = () => (
    <div className="flex gap-1 tb:gap-4 ">
        <Link href="/policy/service" className="hover:text-main-black">
            서비스 이용약관 |
        </Link>
        <Link href="/policy/privacy" className="hover:text-main-black">
            개인정보 처리방침 |
        </Link>
        <Link href="/policy/privacy/agreement-third-party" className="hover:text-main-black">
            개인정보 제3자 제공 동의
        </Link>
    </div>
);
