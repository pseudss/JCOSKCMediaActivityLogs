"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useContext } from "react"; // Import useContext
import { AbilityContext } from "@/components/ThemeProvider/AbilityContext"; // Import AbilityContext
import { MenuItem } from "@/lib/menuItems"; // Import MenuItem type

export function Config({systems}: {
    // Use the imported MenuItem type which includes the ability property
    systems: MenuItem[]
}) {
    const pathname = usePathname();
    const ability = useContext(AbilityContext); // Get ability from context

    const isActiveRoute = (url: string) => {
        if (url === "/" && pathname === "/") return true;
        if (url !== "/") return pathname.startsWith(url);
        return false;
    };

    return (
        <SidebarGroup>
            <SidebarGroupLabel>System Configuration</SidebarGroupLabel>
            <SidebarMenu>
                {systems.map((item) => (
                    // Check ability before rendering the item
                    ability.can(item.ability.action, item.ability.subject) && (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild isActive={isActiveRoute(item.url)}>
                                <Link href={item.url}>
                                    {item.icon && <item.icon />}
                                    {item.name}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
