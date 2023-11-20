import NavFooter from "@/app/components/nav-footer/nav-footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <NavFooter>{children}</NavFooter>;
}
