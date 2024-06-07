"use client";

import Thumbnail from "./bannertwo";
import useMobile from "../hook/use-mobile";

export default function Banner() {
    const { isMobile } = useMobile();

    return <Thumbnail isMobile={isMobile} />;
}
