import type { Metadata } from "next";
import "../globals.css";
import { NavMenu } from "@/components/custom-components/menu-nav/menu-links";
import Link from "next/link";
import { TopMenuNavigation } from "@/components/custom-components/server/header";
import Image from "next/image";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


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
        <SidebarProvider className="bg-green-100 overflow-auto">
          <div className="block md:hidden">
            <Sidebar>
              <SidebarHeader className="bg-(--wise-spend-green)"/>
              <SidebarContent className="bg-(--wise-spend-green)">
                <SidebarGroup className="text-white">
                  <NavMenu menuList={publicMenuLinks} className="md:flex flex-row gap-10 text-sm"></NavMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarTrigger/>
          </div>
          <div className="hidden md:block">
          <TopMenuNavigation>
            <>
              <Link href={'/home'}>
                <Image src={'/assets/logo.png'} alt='logo' width={150} height={10}></Image>
              </Link>
              <NavMenu menuList={publicMenuLinks} className="md:flex flex-row gap-10 text-sm"></NavMenu>
            </>
          </TopMenuNavigation>
          </div>
          <main className="h-screen w-screen pt-10 md:pt-(--header-height)">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
