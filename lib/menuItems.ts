import {
    BookOpen,
    ShieldCheck,
    Users, Table
} from "lucide-react";

export const menuItems = {
    main: [
        {
            name: "Blank Page",
            url: "/blank",
            icon: Users,
            roles: ["admin", "user"],
        },
        {
            name: "Index Page",
            url: "/index",
            icon: Table,
            roles: ["admin", "user"],
        }
    ],
    system: [
        {
            name: "Access Management",
            url: "/access-management",
            icon: ShieldCheck,
            roles: ["admin", 'user'],
        },
        {
            name: "Library",
            url: "/library",
            icon: BookOpen,
            roles: ["admin"],
        }
    ],
}
