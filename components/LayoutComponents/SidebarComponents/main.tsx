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

export function Main({items}: {
    items: {
        name: string
        url: string
        icon?: LucideIcon
    }[]
}) {
    const pathname = usePathname();
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
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild isActive={isActiveRoute(item.url)}>
                            <Link href={item.url}>
                                {item.icon && <item.icon />}
                                {item.name}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
