import type { Metadata } from "next";
import "../globals.css";
import { NavMenu } from "@/components/custom-components/menu-nav/menu-links";
import Link from "next/link";
import { TopMenuNavigation } from "@/components/custom-components/server/header";
import Image from "next/image";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PublicMenu } from "./_components/menu";


export const metadata: Metadata = {
  title: "Wise Spend",
  description: "compare and decide",
};

export const publicMenuLinks = [
  {label: "Sing in", link: "/sing-in", id:'sing-in'},
  {label: "Sing up", link: "/sing-up", id:'sing-up'},
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" translate="no">
        <body>
          <SidebarProvider className="overflow-auto bg-green-100 md:bg-green-100">
            <main className="w-screen md:flex-col">
              {children}
            </main>
          </SidebarProvider>
        </body>
    </html>
  );
}
