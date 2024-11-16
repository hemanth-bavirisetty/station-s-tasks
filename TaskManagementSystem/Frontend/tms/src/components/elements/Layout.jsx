import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./App-Sidebar"
import DashboardPage from "./DashboardPage"
import { useState } from "react"

export  default function Layout() {
   
    return (
        <div className="flex h-screen w-screen">
            <SidebarProvider>
                <AppSidebar />
                <main className="w-screen">

                    <SidebarTrigger />
                    
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
                <main className="flex-1 overflow-y-auto">
                    <div className="">
                        <DashboardPage />
                    </div>
                    <div className="md:hidden">
                        <SidebarTrigger />
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}