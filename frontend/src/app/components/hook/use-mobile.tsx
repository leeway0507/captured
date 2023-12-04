"use client";
import { useState, useEffect } from "react";

const useMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= Number(process.env.NEXT_PUBLIC_MOBILE_WIDTH));
        };
        window.addEventListener("resize", handleResize);
        setIsMobile(window.innerWidth <= Number(process.env.NEXT_PUBLIC_MOBILE_WIDTH));
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { isMobile };
};

export default useMobile;
