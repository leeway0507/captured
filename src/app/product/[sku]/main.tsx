import MainMobile from "./main-mobile";
import MainPc from "./main-pc";
import { mockDB } from "@/app/api/mock-apis";
import { headers } from "next/headers";

export const utilServerSideDeviceDetection = (userAgent: string | null) => {
    if (!userAgent) return false;
    return /(iPad|iPhone|Android|Mobile)/i.test(userAgent) || false;
};

export default function Product() {
    const headersList = headers();

    const sku = Number(headersList.get("x-invoke-path")?.split("/").slice(-1)) || false;

    if (!sku) return <div>404 : {headersList.get("x-invoke-path")?.split("/").slice(-1)}</div>;

    const product = mockDB[sku - 1] || false;

    if (!product) return <div>404 : {headersList.get("x-invoke-path")?.split("/").slice(-1)}</div>;

    // //API call to get product details
    // // api : /api/product/:id
    // // pageurl : /product/:brand/product-name + id

    const userAgent = headersList.get("user-agent");

    const isMobile = utilServerSideDeviceDetection(userAgent);

    return (
        <div>
            <div>User Agent: {isMobile ? "hello" : "world"}</div>
            <div>
                {" "}
                {Array.from(headersList.entries()).map(([key, value]) => (
                    <div key={key}>
                        {key}: {value}
                    </div>
                ))}
            </div>
            <>
                <div className="px-5">
                    <MainMobile {...product} />
                </div>

                <div className="px-5">
                    <MainPc {...product} />
                </div>
            </>
        </div>
    );
}
