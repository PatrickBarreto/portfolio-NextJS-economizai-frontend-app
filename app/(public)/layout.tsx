import type { Metadata } from "next";
import "../globals.css";
import { menuLinks } from "@/src/menu-links";
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
  return (
    <html lang="en">
      <body>
        <TopMenuNavigation>
          <>
            <Link href={'/home'}>
              <Image src={'/assets/logo.png'} alt='logo' width={150} height={10}></Image>
            </Link>
            <ul className="md:flex flex-row gap-10">
              {
                menuLinks.map((l) => {
                  return(
                    <li id={l.id}> 
                      <Link href={l.link}>{l.label}</Link> 
                    </li>
                  )
                })
              }
            </ul>
          </>
        </TopMenuNavigation>
        <main className="h-screen pt-10 md:pt-(--header-height)">
          {children}
        </main>
      </body>
    </html>
  );
}
