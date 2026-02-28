import type { Metadata } from "next";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavMenu } from "@/components/custom-components/menu-nav/menu-links";
import { CustomSidebar } from "@/components/custom-components/sidebar/sidebar";
import { checkToken } from "./_checkToken/checkToken";
import { StickyTrigger } from "@/components/custom-components/custom-trigger";

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
    <html lang="en-US" translate="no">
      <body
        className={''}
      >
        <SidebarProvider className="bg-green-100 overflow-auto">
          <CustomSidebar>
            <NavMenu menuList={privateMenuLinks} className="flex flex-col gap-5 p-5 text-sm"></NavMenu>
          </CustomSidebar>    
          <StickyTrigger/>
          <main className="h-screen w-screen">
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
