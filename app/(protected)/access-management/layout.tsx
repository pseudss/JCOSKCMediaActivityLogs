"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

// Extend the Session type to include roles
interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles?: string[]; // Add roles property
}

interface Session {
    user: User;
}

interface AccessManagementLayoutProps {
    children: ReactNode;
}

export default function AccessManagementLayout({ children }: AccessManagementLayoutProps) {
    const { data: session, status } = useSession() as { data: Session; status: string }; // Cast session type
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") return;

        if (status === "unauthenticated" || !session || !session.user?.roles?.includes("Admin")) {
            router.push("/unauthorized");
        } else {
            setIsLoading(false);
        }
    }, [status, router, session]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {children}
        </div>
    );
}