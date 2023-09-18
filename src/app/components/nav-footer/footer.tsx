import Image from "next/image";

export default function Footer() {
    return (
        <div className="flex flex-col bg-footer-gray py-2">
            <div className="flex flex-row justify-between px-10 tb:px-16 py-3 border-b-2 text-sm tb:text-base">
                <a href={process.env.INSTARGRAM_URL} className="ms-2">
                    <div className="flex-center">
                        <Image src="/icons/instagram.svg" width={16} height={16} alt="instagram" />
                        <div className="ms-2">인스타그램</div>
                    </div>
                </a>
                <a href={process.env.CUSTOM_ID_URL}>
                    <div className="flex-center">
                        <Image src="/icons/approval.svg" width={20} height={20} alt="instagram" />
                        <div className="ms-2">개인통관부호 발급</div>
                    </div>
                </a>
            </div>

            <div className="flex flex-row justify-between px-5 tb:px-12 py-3 text-sm tb:text-base">
                <a href=".">FAQ</a>
                <a href=".">문의하기</a>
                <a href=".">교환 및 반품</a>
                <a href=".">배송안내</a>
                <a href=".">주문조회</a>
            </div>
            <div className="py-3"></div>
            <div className="flex flex-col px-5 tb:px-12 text-xs tb:text-sm">
                <div className="mb-1 pb-1 text-sm tb:text-base">스톡헌터스</div>
                <div className="blue-black">
                    <div className="mb-1 pb-1">사업자 등록 번호 : 372-55-00754</div>
                    <div className="mb-1 pb-1">서울특별시 양천구 목동중앙로 143 101, 801</div>
                    <a href="." className="hover:text-main-black">
                        <div className="mb-1 pb-1 ">서비스 이용 약관</div>
                    </a>
                    <a href="." className="hover:text-main-black">
                        <div className="mb-1 pb-1">개인정보 처리 방침</div>
                    </a>
                    <div>COPY RIGHT © 2023 Captured. ALL RIGHT RESERVED.</div>
                </div>
            </div>
            <div className="py-2"></div>
        </div>
    );
}
