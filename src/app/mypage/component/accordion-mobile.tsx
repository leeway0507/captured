import AccordionComponent from "@/app/components/accordion/accordion";
import PersonalInfoForm from "./personal-info-form";
export default function AccordionMobile() {
    return (
        <div className="basis-full">
            <AccordionComponent title="개인정보 변경" content={PersonalInfoForm()} cat="AddRemoveAddress" />
            <AccordionComponent title="주소지 변경" content="test" cat="changePersonalInfo" />
        </div>
    );
}
