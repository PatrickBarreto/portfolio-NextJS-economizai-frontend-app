import type { Metadata } from "next";
import "../globals.css";
import { NavMenu } from "@/src/custom-components/menu-nav/menu-links";
import Link from "next/link";
import { TopMenuNavigation } from "@/src/custom-components/server/header";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Wise Spend",
  description: "compare and decide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publicMenuLinks = [
    {label: "Sing in", link: "/sing-in", id:'sing-in'},
    {label: "Sing up", link: "/sing-up", id:'sing-up'},
  ];
  return (
    <html lang="en">
      <body>
        <TopMenuNavigation>
          <>
            <Link href={'/home'}>
              <Image src={'/assets/logo.png'} alt='logo' width={150} height={10}></Image>
            </Link>
            <NavMenu menuList={publicMenuLinks} className="md:flex flex-row gap-10 text-sm"></NavMenu>
          </>
        </TopMenuNavigation>
        <main className="h-screen pt-10 md:pt-(--header-height)">
          {children}
        </main>
      </body>
    </html>
  );
}
