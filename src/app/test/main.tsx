"use client";

import Slider from "../category/[...pageType]/component/options-array-range-slider";
import { useState } from "react";

const Main = () => {
    const downloadval = [0, 1000000];
    const [val, setVal] = useState<number[]>([0, 1000000]);
    return <div className="m-auto w-[400px] h-[200px]">{Slider(downloadval, setVal)}</div>;
};

export default Main;
