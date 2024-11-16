import { Calendar, CircleUser, Home, Inbox, Search, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter
} from "@/components/ui/sidebar"
import { Button } from "../ui"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: Inbox,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
    {
        title: "Logout",
        url: "/logout",
        icon: CircleUser,
    },

]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                
            </SidebarContent>
            <SidebarFooter>
            <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu >
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild >
                                        <Link to={item.url}>
                                            <item.icon className="w-12 h-12" />
                                            <span className="text-md">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* <div>
                    <Button>{'Logout'}</Button>
                </div> */}
            </SidebarFooter>
        </Sidebar>
    )
}
