import { Activity, BarChart3, Wallet } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function AppSidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const menuItems = [
        {
            title: "Transactions",
            url: "/transactions",
            icon: Activity,
        },
        {
            title: "Analysis",
            url: "/analysis",
            icon: BarChart3,
        },
    ];

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="p-6 border-b">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-black" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-lg font-bold">SolTracker</h2>
                        <p className="text-xs text-muted-foreground">Solana Wallet Analytics</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-muted-foreground text-sm font-medium mb-3">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {
                                menuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`w-full transition-all duration-200 hover:bg-accent rounded-lg ${location.pathname === item.url
                                                ? 'bg-primary border  text-primary-foreground'
                                                : 'text-muted-foreground hover:text-foreground'
                                                }`}>
                                            <button onClick={() => {
                                                const walletAddress = localStorage.getItem("walletAddress_tracker");
                                                if (walletAddress) {
                                                    navigate(`${item.url}?wallet=${encodeURIComponent(walletAddress.trim())}`)
                                                }



                                            }}
                                                className="flex items-center gap-3 p-3 text-left w-full">
                                                <item.icon className="w-5 h-5" />
                                                <span className="font-medium">{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}