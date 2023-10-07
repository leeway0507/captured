import Client from "./client";
import MainPc from "./main-pc";
import MainMobile from "./main-mobile";

export default function Product() {
    return <Client Mobile={<MainMobile />} Pc={<MainPc />} />;
}
