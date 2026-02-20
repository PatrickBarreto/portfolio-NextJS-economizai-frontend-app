import { logout } from "@/app/(prothected)/_checkToken/checkToken"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { LogOut } from "lucide-react"
 
export function CustomSidebar({children}:{
  children: React.ReactElement
}) {

  return (
    <Sidebar>
      <SidebarHeader className="bg-(--wise-spend-green)"/>
      <SidebarContent className="bg-(--wise-spend-green)">
        <SidebarGroup className="text-white">
          {children}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-(--wise-spend-green)">
        <form action={logout}>
          <button><LogOut className="text-white"/></button>
        </form>
      </SidebarFooter>
    </Sidebar>
  )
}