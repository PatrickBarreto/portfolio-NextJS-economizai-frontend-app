import type { Metadata } from "next";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavMenu } from "@/components/custom-components/menu-nav/menu-links";
import { CustomSidebar } from "@/components/custom-components/sidebar/sidebar";
import { checkToken } from "./_checkToken/checkToken";

export const metadata: Metadata = {
  title: "Wise Spend",
  description: "compare and decide",
};


export default async function ProthectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkToken()

  const privateMenuLinks = [
    {label: 'Categories', link: '/categories', id:'categories'},
    {label: 'Products', link: '/products', id:'products'},
    {label: 'Brands', link: '/brands', id:'brands'},
    {label: 'Shopping Lists', link: '/shopping-lists', id:'shopping-list'},
  ];

  return (
    <html lang="en">
      <body
        className={''}
      >
        <SidebarProvider className="bg-green-100 overflow-auto">
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
