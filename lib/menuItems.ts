import {
    BookOpen,
    ShieldCheck,
    Users,
    BarChart3,
    Activity,
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
            name: "Member",
            url: "/member",
            icon: Users,
            ability: { action: 'read', subject: 'Member' }
        },
        {
            name: "Member Activity Logs",
            url: "/member-activity-logs",
            icon: Activity,
            ability: { action: 'read', subject: 'Member' }
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
            name: "Library",
            url: "/library",
            icon: BookOpen,
            ability: { action: 'read', subject: 'Library' }
        },
    ],
}

