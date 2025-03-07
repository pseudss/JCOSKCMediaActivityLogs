"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

interface AccessManagementLayoutProps {
    children: ReactNode;
}

export default function AccessManagementLayout({ children }: AccessManagementLayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") return;

        if (status === "unauthenticated" || !session || !session?.user?.roles.includes("Admin")) {
            router.push("/unauthorized");
        }
        else {
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