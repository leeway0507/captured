import { initFilterMetaProps } from "@/app/(default-nav-footer)/category/[...pageType]/type";

export const dynamic = "force-static";

const getFilterMeta = async () => {
    const jsonData: initFilterMetaProps = require("./init_meta.json");
    return Response.json(jsonData);
};

export { getFilterMeta as GET };
