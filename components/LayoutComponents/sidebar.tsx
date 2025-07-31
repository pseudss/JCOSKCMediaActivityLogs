"use client"

import * as React from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { Main } from "@/components/LayoutComponents/SidebarComponents/main"
import { Config } from "@/components/LayoutComponents/SidebarComponents/config"
import { User } from "@/components/LayoutComponents/SidebarComponents/user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { menuItems } from "@/lib/menuItems"
import { useContext } from "react";
import { AbilityContext } from "@/components/ThemeProvider/AbilityContext";

interface AppSidebarProps {
    user: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        roles: string[];
    };
}

export const SideBar: React.FC<AppSidebarProps> = ({ user }) => {
    const { open } = useSidebar()
    const ability = useContext(AbilityContext);
    const canAccessSystemConfig = menuItems.system.some(item =>
        ability.can(item.ability.action, item.ability.subject)
    );

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="w-full">
                            {open ? (
                                <div className="flex items-center justify-between w-full gap-2">
                                    <img
                                        src="/logo.png"
                                        alt="Logo"
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                    <span className="flex-grow text-center text-sm font-medium">
                                        Media Ministry
                                    </span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 pl-2">
                                <img src="/logo.png"
                                        alt="Logo"
                                        width={32}
                                        height={32}
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <Main items={menuItems.main} />
                {canAccessSystemConfig && <Config systems={menuItems.system} />}
            </SidebarContent>
            <SidebarFooter>
                <User user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}