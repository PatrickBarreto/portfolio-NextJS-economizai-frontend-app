import type { Metadata } from "next";
import "../globals.css";
import { NavMenu } from "@/components/custom-components/menu-nav/menu-links";
import Link from "next/link";
import { TopMenuNavigation } from "@/components/custom-components/server/header";
import Image from "next/image";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


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
    <html lang="en-US" translate="no">
      <body>
        <SidebarProvider className="overflow-auto bg-(--wise-spend-green) md:bg-green-100">
          <div className="block md:hidden">
            <Sidebar>
              <SidebarHeader className="bg-green-100"/>
              <SidebarContent className="bg-green-100">
                <SidebarGroup className="text-black">
                  <NavMenu menuList={publicMenuLinks} className="
                    flex 
                    gap-2
                    flex-col 
                    md:text-sm"></NavMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarTrigger className="bg-(--wise-spend-green)"/>
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
