"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode, useContext } from 'react'; // Import useContext
import { AbilityContext } from '@/components/ThemeProvider/AbilityContext'; // Import AbilityContext
import Loading from '../loading'; // Assuming a loading component exists

// Keep Session/User interfaces if needed elsewhere, but AbilityContext is primary now
interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles?: string[]; 
}

interface Session {
    user: User;
}

interface AccessManagementLayoutProps {
    children: ReactNode;
}

export default function AccessManagementLayout({ children }: AccessManagementLayoutProps) {
    const { status } = useSession();
    const router = useRouter();
    const ability = useContext(AbilityContext); // Get ability from context
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        if (status === "loading") {
            return; // Wait until session status is determined
        }

        if (status === "unauthenticated") {
            router.push("/login"); // Redirect unauthenticated users to login
            return;
        }

        // Check ability once authenticated
        if (status === "authenticated") {
            // Use ability.can() to check permission
            if (!ability.can('manage', 'AccessManagement')) {
                router.push("/unauthorized"); // Redirect if user lacks permission
            } else {
                setIsCheckingAuth(false); // Allow rendering if user has permission
            }
        }

    }, [status, router, ability]); // Add ability to dependency array

    // Show loading state while checking session and ability
    if (status === "loading" || isCheckingAuth) {
        return <Loading />;
    }

    // Render children only if authenticated and authorized
    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
}