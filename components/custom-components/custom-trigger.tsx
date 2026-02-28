'use client'
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

export const StickyTrigger = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`transition-all duration-300 ${scrolled ? 'fixed top-4 left-4 z-50' : 'absolute'}`}>
      <SidebarTrigger className="bg-transparent" />
    </div>
  )
}