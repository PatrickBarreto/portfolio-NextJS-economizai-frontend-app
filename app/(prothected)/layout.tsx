import type { Metadata } from "next";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavMenu } from "@/src/custom-components/menu-nav/menu-links";
import { CustomSidebar } from "@/src/custom-components/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Wise Spend",
  description: "compare and decide",
};


export default async function ProthectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const privateMenuLinks = [
    {label: 'Categories', link: '/categories', id:'categories'},
    {label: 'Products', link: '/products', id:'products'},
    {label: 'Brands', link: '/brands', id:'brands'},
    {label: 'Shopping Lists', link: '/shopping-list', id:'shopping-list'},
  ];

  return (
    <html lang="en">
      <body
        className={''}
      >
        <SidebarProvider className="bg-green-100">
          <CustomSidebar>
            <NavMenu menuList={privateMenuLinks} className="flex flex-col gap-5 p-5 text-sm"></NavMenu>
          </CustomSidebar>    
          <SidebarTrigger/>
          <main className="h-screen w-screen pt-10 md:pt-(--header-height)">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
