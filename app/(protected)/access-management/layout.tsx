"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode, useContext } from 'react';
import { AbilityContext } from '@/components/ThemeProvider/AbilityContext';
import Loading from '../loading';

interface AccessManagementLayoutProps {
    children: ReactNode;
}

export default function AccessManagementLayout({ children }: AccessManagementLayoutProps) {
    const { status } = useSession();
    const router = useRouter();
    const ability = useContext(AbilityContext);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        if (status === "loading") {
            return;
        }

        if (status === "unauthenticated") {
            router.push("/login");
            return;

        }

        if (status === "authenticated") {
            if (!ability.can('manage', 'AccessManagement')) {
                router.push("/unauthorized");
            } else {
                setIsCheckingAuth(false);
            }
        }

    }, [status, router, ability]);
    if (status === "loading" || isCheckingAuth) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
}