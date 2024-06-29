function ServicePolicy() {
    const title = 'text-base font-medium py-4'
    return (
        <>
            <div className="text-2xl py-2 font-medium">CAPTURED 서비스 이용약관</div>
            <>
                <div className={`${title}`}>제 1 조 ( 목적 ) </div>
                <div>
                    이 약관은 스톡헌터스( 이하 “회사” ) 가 제공하는 쇼핑몰형 구매대행 관련 서비스 (
                    이하 “서비스” ) 를 이용함에 있어 회사와 이용자 간의 권리·의무, 책임사항 및 절차
                    등을 규정함을 목적으로 합니다.
                </div>
            </>
            <>
                <div className={`${title}`}>제 2 조 ( 정의 )</div>
                <div className="pb-2"> 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</div>
                <ol className="list-decimal px-4 flex flex-col gap-1">
                    <li>
                        “몰”은 회사가 이 약관에 의하여 재화 또는 용역 ( 이하 “재화 등” ) 을
                        이용자에게 제공하기 위하여 정보통신설비와 정보통신망을 이용하여 재화 등을
                        거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 “몰”을 운영하는
                        회사의 의미로도 사용합니다.
                    </li>
                    <li> “이용자”라 함은 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
                    <li>
                        “해외사업자”라 함은 대한민국 이외의 국적이거나 대한민국 이외의 국가에 사업자
                        등록, 법인, 영업소, 호스트서버 소재지 등을 가진 사업자를 의미합니다.
                    </li>
                    <li>
                        “쇼핑몰형 구매대행”이라 함은 회사가 “몰”을 통해 해외에서 구매 가능한 재화
                        등에 대하여 정보를 제공하고 이용자의 청약을 받아, 회사가 해당 재화 등을
                        이용자의 명의로 수입하여 판매하는 것을 의미합니다. 다만, 이 경우 재화 등은
                        이용자의 자가 소비용에 한정합니다.
                    </li>
                    <li>
                        “검수”라 함은 이용자가 구매한 재화 등의 누락, 하자, 파손 여부 등을 회사가
                        정한 기준에 따라 확인하는 서비스를 의미합니다.
                    </li>
                </ol>
            </>

            <>
                <div className={`${title}`}>제 3 조 ( 서비스의 제공 )</div>
                <div className="py-2"> 회사는 다음 각 호의 업무를 수행할 수 있습니다.</div>
                <ol className="list-decimal px-4 flex flex-col gap-1">
                    <li> 재화 등에 대한 정보제공</li>
                    <li> 수입 및 통관 관련 업무</li>
                    <li> 국제반송 관련 업무</li>
                    <li> 기타 회사가 정하는 업무</li>
                </ol>
            </>
            <>
                <div className={`${title}`}>제 4 조 ( 서비스이용 제한 )</div>
                <div className="pb-2">
                    ① 회사는 이용자의 서비스 이용 요청이 다음 각 호의 어느 하나에 해당하는 경우
                    서비스 제공을 거절할 수 있습니다.
                    <ol className="list-decimal px-6 flex flex-col gap-1">
                        <li> 신청내용에 허위, 기재누락, 오기가 있는 경우</li>
                        <li>
                            이용자가 요청한 서비스의 제공이 회사의 경영상 또는 기술상의 이유로
                            현저히 곤란한 경우
                        </li>
                        <li>
                            {' '}
                            이용자가 불법 또는 부당한 목적을 위해 서비스를 이용하는 것으로 판단되는
                            경우
                        </li>
                    </ol>
                </div>
                <div>
                    ② 전항에 따라 서비스 제공을 거절하는 경우, 회사는 이용자에게 거절의 사유 및
                    근거를 통지하여야 합니다.
                </div>
            </>
            <>
                <div className={`${title}`}>제 5 조 ( 상품가의 구성 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① “몰”에 표시된 재화 등의 판매 가격은 [ 해외사업자로부터의 해당 재화 등
                        구매가격, 해외사업자로부터 회사의 해외 수령 장소까지의 운송료, 해외 현지
                        세금, 해외 구매 계약 체결 수수료, 해외 현지 수령 장소 ( 해외 물류센터 )
                        이용료, 국제운송료와 수입관세, 수입부가세, 국내운송료, 기타세금 등 ( 이하
                        “관·부가세 등” )] 이 포함된 가격입니다.
                    </div>
                    <div>
                        ② 회사는 이용자가 재화 등의 판매가격을 지급하기 전에 전항에 따른 판매가격의
                        구성 내역을 구분하여 고지하여야 합니다.
                    </div>
                    <div>
                        ③ 판매가격은 해외사업자의 할인 행사, 환율 변화 등의 사유로 변동될 수 있으며,
                        이로 인하여 회사가 청약을 받은 재화를 공급할 수 없는 경우 그 사유를
                        이용자에게 알리고 요금을 3 영업일 이내에 환급하는 등의 조치를 해야 합니다.
                    </div>
                </div>
            </>

            <>
                <div className={`${title}`}>제 6 조 ( 계약의 성립 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① 회사는 이용자의 구매의 신청이 있으면 수신확인통지를 합니다.
                        수신확인통지에는 주문내역, 금액, 수령 주소 등의 신청 정보와 구매 신청의
                        정정, 취소 등에 관한 정보 등을 포함하여야 합니다.
                    </div>
                    <div>
                        ② 계약은 이용자의 구매신청에 대하여 회사의 수신확인통지가 이용자에게 도달한
                        때에 성립됩니다 .
                    </div>
                    <div>
                        ③ 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우 지체 없이
                        회사에 구매 신청 변경 또는 취소를 요청할 수 있으며, 회사는 지체 없이 그
                        요청에 따라 처리하여야 합니다. 다만 이미 요금을 지급한 경우에는 제 11 조의
                        청약철회 등에 관한 규정에 따릅니다.
                    </div>
                </div>
            </>
            <>
                <div className={`${title}`}>제 7 조 ( 검수 및 재포장 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① 회사는 이용자가 구매 신청한 재화 등에 대하여 동일성 여부 및 하자·파손
                        여부, 운송물이 수출입 법령 등에 저촉되지 않는지 여부 등의 확인을 위해 해당
                        운송물의 개봉·검수를 할 수 있습니다. 회사는 검수의 기준 및 범위를 정하여
                        이용자에게 미리 통지합니다.
                    </div>
                    <div>
                        ② 회사가 재화 등의 하자, 파손 등을 발견한 경우, 이용자에게 이를 통보하고
                        이용자의 요청에 따라 계약을 해제 또는 해지, 청약철회 ( 이하 “청약철회 등” )
                        하거나, 재화 등의 인도를 진행합니다.
                    </div>
                    <div>
                        ③ 이용자가 구매 신청한 재화 등에 대하여 회사가 검수를 통해 악취, 액체누수
                        등의 이상이 있다고 판단한 경우 이용자에게 이러한 사실을 통지하고 해당 재화
                        등을 별도 보관하는 등 임시조치를 취할 수 있습니다.
                    </div>
                    <div>
                        ④ 제 3 항의 경우 회사는 이용자의 요구에 따라 해당 재화 등을 처분하며, 해당
                        재화의 판매가를 배상하고 처분에 소요되는 비용을 부담합니다.
                    </div>
                    <div>
                        ⑤ 회사는 포장이 운송에 적합하지 아니한 때에는 운송 중 발생될 수 있는 충격의
                        정도를 고려하여 추가 포장을 할 수 있습니다.
                    </div>
                </div>
            </>

            <>
                <div className={`${title}`}>제 8 조 ( 배송 )</div>
                <div>
                    이용자가 복수의 재화 등을 구매하고, 각 재화 등을 공급하는 해외사업자가 다를
                    경우에는 해당 재화 등을 회사의 해외 수령 장소에 도착하는 순서대로 배송할 수
                    있으며, 관·부가세 회피를 위한 분할배송 및 가격허위 신고 등 이용자의 불법행위
                    요청에는 협조하지 않습니다.
                </div>
                <div className={`${title}`}>제 9 조 ( 통관 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① 회사는 이용자를 위하여 회사가 정한 운송 및 통관 업무 위탁사를 통해
                        통관절차를 수행합니다. 이 때 발생하는 관·부가세 등은 이용자 또는 수하인이
                        부담합니다.
                    </div>
                    <div>
                        ② 제 1 항의 통관 업무를 수행할 때에, 회사가 정한 운송 및 통관 업무 위탁사가
                        관·부가세 등을 이용자를 대신하여 납부하면, 회사는 이용자가 재화 등의 구매
                        계약 체결 시 미리 지급한 관·부가세 등을 운송 및 통관 업무 위탁사와
                        정산합니다.
                    </div>
                </div>
                <div className={`${title}`}>제 10 조 ( 긴급조치 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① 회사는 재화 등에 관하여 이용자의 책임 있는 사유로 인하여 관할관청 등의
                        관련법령에 근거한 적법한 인도 요구가 있는 경우 해당 재화 등을 관할 기관에
                        인도합니다. 이 경우 회사는 지체 없이 이를 이용자에게 통지합니다.
                    </div>
                    <div>
                        ② 전항의 조치로 인하여 이용자가 손해를 입은 경우 회사는 그 손해를
                        배상합니다.
                    </div>
                    <div>
                        ③ 제 1 항의 관할관청 등이 재화 등을 반환한 경우, 회사는 지체 없이 구매계약에
                        따른 채무를 계속해서 이행해야 합니다.
                    </div>
                </div>
            </>

            <div>
                <div className={`${title}`}>제 11 조 ( 청약철회 등 )</div>
                회사의 “몰”에 소개된 해외에서 구매 가능한 재화 등의 구매에 관한 계약을 체결한
                이용자는 계약내용에 관한 서면을 받은 날 ( 그 서면을 받은 때보다 재화 등의 공급이
                늦게 이루어진 경우에는 재화 등을 공급받거나 재화 등의 공급이 시작된 날을 말합니다 )
                부터 7 일 이내에는 청약의 철회 등을 할 수 있습니다.
            </div>
            <>
                <div className={`${title}`}>제 12 조 ( 청약철회 등의 제한 )</div>
                <div className="pb-2">
                    ① 이용자는 재화 등을 배송 받은 경우 다음 각 호의 어느 하나에 해당하는 경우에는
                    청약철회 등을 할 수 없습니다.
                    <ol className="list-decimal px-6 flex flex-col gap-1">
                        <li>
                            이용자에게 책임 있는 사유로 재화 등이 분실 또는 파손된 경우 ( 다만, 재화
                            등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수
                            있습니다 )
                        </li>
                        <li>
                            {' '}
                            이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한
                            경우
                        </li>
                        <li>
                            {' '}
                            시간의 경과에 의하여 재판매가 곤란할 정도로 재화 등의 가치가 현저히
                            감소한 경우
                        </li>
                        <li>
                            {' '}
                            같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본인 재화 등의
                            포장을 훼손한 경우
                        </li>
                        <li>
                            천재지변, 대규모 할인으로 인한 물동량 증가, 현지 업체의 배송지연 등
                            회사가 통제할 수 없는 사유로 배송지연이 발생하는 경우
                        </li>
                        <li>
                            그 밖에 이용자의 주문에 따라 개별적으로 생산되는 재화 등 또는 이와
                            유사한 재화 등에 대하여 청약철회를 인정하는 경우 쇼핑몰형
                            구매대행업체에게 회복할 수 없는 중대한 피해가 예상되는 경우로서 사전에
                            해당 거래에 대하여 별도로 그 사실을 고지한 재화를 구매한 경우
                        </li>
                    </ol>
                </div>
                <div>
                    ② 전항 제 2 호 내지 제 4 호의 경우에 회사가 “몰”에 사전에 청약철회 등이 제한되는
                    사실을 이용자가 쉽게 알 수 있는 곳에 표시하거나 시용상품을 제공하는 등의 조치를
                    하지 않았다면 이용자의 청약철회 등은 제한되지 않습니다.
                </div>
            </>
            <>
                <div className={`${title}`}>제 13 조 ( 상품상이, 하자, 파손 등 )</div>
                <div>
                    이용자는 제 12 조에 불구하고 재화 등의 내용이 표시·광고 내용과 다르거나
                    계약내용과 다르게 이행된 때에는 해당 재화 등을 공급받은 날부터 3 월 이내, 그
                    사실을 안 날 또는 알 수 있었던 날부터 30 일 이내에 청약철회 등을 할 수 있습니다.
                </div>
            </>

            <>
                <div className={`${title}`}>제 14 조 ( 청약철회의 효과 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① 회사는 이용자로부터 재화 등을 반품 받은 경우 3 영업일 이내에 이미 지급받은
                        재화 등의 요금을 환급합니다. 이 경우 회사가 이용자에게 재화 등의 환급을
                        지연한 때에는 그 지연기간에 대하여 연 100 분의 20 의 지연이자율을 곱하여
                        산정한 지연이자를 지급합니다.
                    </div>
                    <div>
                        ② 회사는 제 1 항의 요금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐
                        등의 지급수단으로 재화 등의 요금을 지급한 때에는 지체 없이 해당 지급수단을
                        제공한 사업자로 하여금 재화 등의 요금의 청구를 정지 또는 취소하도록
                        요청합니다.
                    </div>
                </div>
            </>
            <>
                <div className={`${title}`}>제 15 조 ( 반품 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① 이용자가 구매한 재화 등에 대하여 회사와 해외사업자간의 매매계약이 체결되어
                        해당 재화가 회사의 해외 현지 수령 장소로 발송된 이후 이용자가 청약철회 등을
                        한 경우, 해외 현지 운송료 및 구매 수수료, 해외 현지 반송료는 이용자가
                        부담합니다. 이 경우, 회사는 이용자에게 해당 매매계약이 체결된 일시 및 발송의
                        일시를 증빙하는 자료를 제시하여야 합니다.
                    </div>
                    <div>
                        ② 이용자가 구매한 재화 등에 대하여 회사가 이용자의 국내 수령 장소로 발송한
                        이후 이용자가 청약철회 등을 하는 경우, 해당 재화 등의 수입 시 발생한 해외
                        현지 운송료, 해외 세금, 해외 현지 수령 장소 이용료, 선적비용, 항공운송료,
                        통관 업무 위탁 수수료, 관·부가세 등 해당 재화 등을 수입하기 위해 들어간
                        비용과 회사의 국내주소지로 해당 재화를 반송하는 운송료는 이용자가
                        부담합니다.
                    </div>
                    <div>
                        ③ 재화 등의 내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행되어
                        청약철회 등을 하는 경우 재화 등의 반품에 필요한 비용은 회사가 부담합니다.
                    </div>
                    <div>
                        ④ 이용자가 재화 등을 제공받을 때 발송비를 부담한 경우에 회사는 청약철회 등의
                        경우 그 비용을 누가 부담하는지를 이용자가 알기 쉽도록 명확하게 표시합니다.
                    </div>
                    <div>
                        ⑤ 회사는 제 1 항 및 제 2 항의 사실을 사전에 “몰”에 이용자가 쉽게 알 수 있는
                        곳에 표시하는 등의 조치를 취해야 합니다.
                    </div>
                </div>
            </>

            <>
                <div className={`${title}`}>제 16 조 ( 교환과 수리 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① 회사는 재화 등의 재고를 보유하고 있지 않으므로 교환은 불가능하나, 청약철회
                        등에 따른 반품 및 환불은 가능합니다.
                    </div>
                    <div>② 회사는 재화 등의 수리 (A/S) 업무를 수행하지 않습니다. </div>
                    <div>
                        ③ 제 1 항 및 제 2 항의 사항을 회사가 “몰”에 사전에 이용자가 쉽게 알 수 있는
                        곳에 표시하는 등의 조치를 취하지 않았다면, 회사는 이용자의 교환과 수리
                        요구에 협조하여야 합니다.
                    </div>
                </div>
            </>
            <>
                <div className={`${title}`}>제 17 조 ( 분쟁해결 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를
                        보상처리하기 위하여 피해보상처리기구를 설치․운영합니다.
                    </div>
                    <div>
                        ② 회사는 이용자로부터 제출되는 불만사항 및 의견을 다른 사안에 우선하여
                        처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와
                        처리일정을 지체 없이 통지하여야 합니다.
                    </div>
                    <div>
                        ③ 회사와 대한민국 국민 또는 대한민국에 사무소를 가지는 이용자 간에 발생한
                        분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는
                        시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.
                    </div>
                </div>
            </>

            <>
                <div className={`${title}`}>제 18 조 ( 관할법원 및 준거법 )</div>
                <div className="flex flex-col gap-2">
                    <div>
                        ① 회사와 대한민국 국민 또는 대한민국에 사무소를 가지는 이용자 간에 발생한
                        소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를
                        관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는
                        거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에
                        제기합니다.
                    </div>
                    <div>
                        ② 회사와 대한민국 국민 또는 대한민국에 사무소를 가지는 이용자 간에 발생한
                        소송의 준거법은 대한민국법으로 합니다.
                    </div>
                </div>
            </>
            <div className="py-8">이 약관은 2023년 12월 1일부터 적용됩니다.</div>
        </>
    )
}

export default ServicePolicy
