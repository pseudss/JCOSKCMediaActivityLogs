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

export const menuItems = {
    main: [
        {
            name: "Applicants",
            url: "/applicants",
            icon: UserPlus,
            roles: ["admin", "user"],
            description: "Manage job applicants and recruitment",
        },
        {
            name: "Employees",
            url: "/employees",
            icon: Users,
            roles: ["admin", "user"],
        },
        {
            name: "Plantilla",
            url: "/plantilla",
            icon: ClipboardList,
            roles: ["admin", "user"],
            description: "Creation and updating of employee positions",
        },
        {
            name: "Payroll",
            url: "/payroll",
            icon: DollarSign,
            roles: ["admin", "user"],
        },
        {
            name: "Leave Administration",
            url: "/leave-administration",
            icon: Calendar,
            roles: ["admin", "user"],
        },
        {
            name: "Training Administration",
            url: "/training-administration",
            icon: Presentation,
            roles: ["admin", "user"],
        },
        {
            name: "Reports",
            url: "/reports",
            icon: BarChart3,
            roles: ["admin", "user"],
        },
    ],
    system: [
        {
            name: "Access Management",
            url: "/access-management",
            icon: ShieldCheck,
            roles: ["admin", "user"],
        },
        {
            name: "Library",
            url: "/library",
            icon: BookOpen,
            roles: ["admin"],
        },
    ],
}

