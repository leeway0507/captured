import { MyPageProvider } from "./mypage-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <MyPageProvider>{children}</MyPageProvider>;
}
