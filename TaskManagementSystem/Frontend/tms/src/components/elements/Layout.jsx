import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./App-Sidebar"
import DashboardPage from "./DashboardPage"

export default function Layout() {
    return (
        <div className="flex h-screen w-screen">
            
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 overflow-y-auto">
                    <SidebarTrigger className=" mb-4" />
                    <DashboardPage />
                </main>
            </SidebarProvider>
        </div>
    )
}

export function Layout1() {
    return (
        <div className="h-screen min-w-screen flex flex-col md:flex-row">
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 overflow-y-auto p-4">
                    <SidebarTrigger className="md:hidden mb-4" />
                    <DashboardPage />
                </main>
            </SidebarProvider>
        </div>
    )
}