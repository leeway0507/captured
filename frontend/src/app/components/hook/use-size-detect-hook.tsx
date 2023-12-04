"use client";
import { useState, useEffect, useRef } from "react";
const useSizeDetect = () => {
    const [innerHeight, setInnerHeight] = useState<number>(0);
    const [maxHeight, setMaxheight] = useState<number>(0);

    const timerRef = useRef<any>(null);

    useEffect(() => {
        const handleResize = () => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setInnerHeight(window.innerHeight);
            }, 300);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (innerHeight >= maxHeight) {
            setMaxheight(innerHeight);
        }
    }, [innerHeight]);
    return { innerHeight, maxHeight };
};

export default useSizeDetect;
