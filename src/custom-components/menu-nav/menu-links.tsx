'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavMenu = ({menuList, className}:{
  menuList: any[],
  className: string
}) => {
  const pathname = usePathname()

  return <ul className={className}>
    {
      menuList.map((l, index) => {
        return(
          <li key={index}> 
            <Link href={l.link}>
              { (l.link == pathname) ? <><b>{l.label}</b></> : l.label}
              </Link> 
          </li>
        )
      })
    }
  </ul>
}
