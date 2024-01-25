"use client";

import Thumbnail, { thumbnailInfo } from "./banner";
import useMobile from "../hook/use-mobile";
import { useEffect, useState } from "react";

export default function Banner({meta}:{meta:{pc:[],mobile:[]}}) {
    const { isMobile } = useMobile();
    const [thumbnail, setThumbnail] = useState<thumbnailInfo[]>();

    useEffect(() => {
        if (isMobile == true) setThumbnail(meta.mobile);
        if (isMobile == false) setThumbnail(meta.pc);
    }, [isMobile, meta]);

    return <Thumbnail thumbnailInfos={thumbnail} isMobile={isMobile} />;
}
