'use client'

import Link from "next/link";

export interface ButtonInterface {
    href: string,
    content: string,
    buttonClassName?: string
}

export const NavButton:React.FC<ButtonInterface>= ({href, content = 'Click', buttonClassName="w-100 h-10 rounded-md"}) => {
    return (
      <Link href={href}>
        <button className={buttonClassName + " bg-(--wise-spend-green) text-white"}>
            {content}
        </button>
      </Link>
    );
}