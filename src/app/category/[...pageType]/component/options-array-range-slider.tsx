"use client";
import ReactSlider from "react-slider";
import "./filter.css";
import { useRef, useState } from "react";

const oneItem = "bg-main-black border-main-black cursor-not-allowed text-light-gray active:text-main-black shadow-md";
const itemBoxClass = "mondaL flex-center text-xs w-[100px] max-w-[200px] min-h-[30px] border-2 px-2 me-2 mb-2";

const Slider = (value: number[], setValue: (v: number[]) => void) => {
    const [localData, setlocalData] = useState<number[]>(value);

    // localValue  =>  setValue With 500ms delay
    const timerRef = useRef<any>(null);

    const changeHandler = (value: number[]) => {
        setlocalData(value);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setValue(value); // <-- re-enclose latest value
        }, 1200); // <-- tune this value to what feels best for you
    };

    if (value.length != 2) {
        if (value.length == 1) {
            return <div className={`${oneItem} ${itemBoxClass}`}>{"₩" + value.toLocaleString()}</div>;
        } else {
            return <></>;
        }
    }

    return (
        <>
            <ReactSlider
                className="horizontal-slider"
                trackClassName="example-track"
                thumbClassName="example-thumb"
                defaultValue={value}
                min={value[0]}
                max={value[1]}
                step={10000}
                onChange={(v) => changeHandler(v)}
                ref={timerRef}
            />
            <div className="flex-center w-full justify-evenly tb:justify-between py-4">
                <div className="flex-center text-lg tb:text-xs basis-4/12">{"₩" + localData[0].toLocaleString()}</div>
                <div className="flex-center ">-</div>
                <div className="flex-center text-lg xl:text-xs basis-4/12">{"₩" + localData[1].toLocaleString()}</div>
            </div>
        </>
    );
};

export default Slider;
