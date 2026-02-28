import { NavMenu } from "@/components/custom-components/menu-nav/menu-links"
import { TopMenuNavigation } from "@/components/custom-components/server/header"
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { StickyTrigger } from "../../../components/custom-components/custom-trigger"

export const PublicMenu = ({
	links, triggerColors, disableMd = true
	}:
	{
		links:any[], triggerColors?:string, disableMd?:boolean
	}
) => {
	const triggerC = triggerColors ? 'bg-'+triggerColors : 'bg-(--wise-spend-green)'
	return(
		<>
			<div className="block md:hidden">
				<Sidebar>
					<SidebarHeader className="bg-green-100"/>
					<SidebarContent className="bg-green-100">
						<SidebarGroup className="text-black">
							<NavMenu menuList={links} className="
							flex 
							gap-2
							flex-col 
							md:text-sm"></NavMenu>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
				<div className={triggerC+" f-fit fixed"}>
					<StickyTrigger/>
				</div>
			</div>
			<div className="hidden md:block">
				{!disableMd && <TopMenuNavigation>
				<>
					<Link href={'/'}>
					<Image src={'/assets/logo.png'} alt='logo' width={150} height={10}></Image>
					</Link>
					<NavMenu menuList={links} className="md:flex flex-row gap-10 text-sm"></NavMenu>
				</>
				</TopMenuNavigation>}
			</div>
		</>
	)
}