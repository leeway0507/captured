"use client";

import Thumbnail, { thumbnailInfo } from "./banner";
import useMobile from "../hook/use-mobile";
import { useEffect, useState } from "react";

export default function Banner({ pc, mobile }: { pc: []; mobile: [] }) {
    const { isMobile } = useMobile();
    const [thumbnail, setThumbnail] = useState<thumbnailInfo[]>();

    useEffect(() => {
        if (isMobile == true) setThumbnail(mobile);
        if (isMobile == false) setThumbnail(pc);
    }, [isMobile, pc, mobile]);

    return <Thumbnail thumbnailInfos={thumbnail} isMobile={isMobile} />;
}
