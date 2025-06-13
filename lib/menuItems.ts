import {
    BookOpen,
    ShieldCheck,
    Users,
    BarChart3,
} from "lucide-react"
import { Actions, AppSubjects } from "./ability";

export interface MenuItem {
    name: string;
    url: string;
    icon: React.ElementType;
    description?: string;
    ability: {
        action: Actions;
        subject: AppSubjects | 'all';
    };
}

interface MenuItems {
    main: MenuItem[];
    system: MenuItem[];
}

export const menuItems: MenuItems = {
    main: [
        {
            name: "Employees",
            url: "/employees",
            icon: Users,
            ability: { action: 'read', subject: 'Employees' }
        },
        {
            name: "Reports",
            url: "/reports",
            icon: BarChart3,
            ability: { action: 'read', subject: 'Reports' }
        },
    ],
    system: [
        {
            name: "Access Management",
            url: "/access-management",
            icon: ShieldCheck,
            ability: { action: 'manage', subject: 'AccessManagement' }
        },
        {
            name: "Library",
            url: "/library",
            icon: BookOpen,
            ability: { action: 'read', subject: 'Library' }
        },
    ],
}

