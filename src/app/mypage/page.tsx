import NavFooter from "@/app/components/nav-footer/client-side/nav-footer";
import Main from "./main";
import OrderHistory from "./component/order/order";

export default function Page() {
    return (
        <NavFooter>
            <Main orderHistory={<OrderHistory />} />
        </NavFooter>
    );
}
