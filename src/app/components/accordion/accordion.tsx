import "./accordion.css";
import { useState } from "react";
function AccordionComponent({ title, content, cat }: { title: string; content: React.ReactNode; cat: string }) {
    const id = "accordion-" + cat;
    const [active, setActive] = useState(false);
    const openToggle = () => {
        setActive(!active);
    };
    return (
        <div className="accordion">
            <input type="checkbox" id={id} className="click-effect" />
            <label htmlFor={id} className="text-xl-2xl py-3" onClick={openToggle}>
                <div className="flex justify-between  active:bg-light-gray">
                    {title}
                    <em style={{ background: "url(/icons/expand.svg)" }} />
                </div>
            </label>
            <div className={`w-full ${active ? "block" : "hidden"}`}>
                <div className="m-4">{content}</div>
            </div>
        </div>
    );
}

export default AccordionComponent;