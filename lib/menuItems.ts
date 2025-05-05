import {
    BookOpen,
    ShieldCheck,
    Users,
    DollarSign,
    Calendar,
    BarChart3,
    Presentation,
    ClipboardList,
    UserPlus,
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
            name: "Applicants",
            url: "/applicants",
            icon: UserPlus,
            description: "Manage job applicants and recruitment",
            ability: { action: 'read', subject: 'Applicants' } // Changed from 'manage'
        },
        {
            name: "Employees",
            url: "/employees",
            icon: Users,
            ability: { action: 'read', subject: 'Employees' } // Changed from 'manage'
        },
        {
            name: "Plantilla",
            url: "/plantilla",
            icon: ClipboardList,
            description: "Creation and updating of employee positions",
            ability: { action: 'read', subject: 'Plantilla' } // Changed from 'manage'
        },
        {
            name: "Payroll",
            url: "/payroll",
            icon: DollarSign,
            ability: { action: 'read', subject: 'Payroll' } // Changed from 'manage'
        },
        {
            name: "Leave Administration",
            url: "/leave-administration",
            icon: Calendar,
            ability: { action: 'read', subject: 'Leave' } // Changed from 'manage'
        },
        {
            name: "Training Administration",
            url: "/training-administration",
            icon: Presentation,
            ability: { action: 'read', subject: 'Training' } // Changed from 'manage'
        },
        {
            name: "Reports",
            url: "/reports",
            icon: BarChart3,
            ability: { action: 'read', subject: 'Reports' } // Kept as 'read'
        },
    ],
    system: [
        {
            name: "Access Management",
            url: "/access-management",
            icon: ShieldCheck,
            ability: { action: 'manage', subject: 'AccessManagement' } // Kept as 'manage' - typically requires higher privilege
        },
        {
            name: "Library",
            url: "/library",
            icon: BookOpen,
            ability: { action: 'read', subject: 'Library' } // Changed from 'manage'
        },
    ],
}

