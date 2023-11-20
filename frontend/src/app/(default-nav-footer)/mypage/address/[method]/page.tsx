import Main from "./main";
import { userAddressProps } from "@/app/type";

export default function Page({ params, searchParams }: { params: any; searchParams: userAddressProps }) {
    return <Main {...searchParams} />;
}
