"use client"

import { type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useContext } from "react"; // Import useContext
import { AbilityContext } from "@/components/ThemeProvider/AbilityContext"; // Import AbilityContext
import { MenuItem } from "@/lib/menuItems"; // Import MenuItem type

export function Main({items}: {
    // Use the imported MenuItem type which includes the ability property
    items: MenuItem[]
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
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
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
