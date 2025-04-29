'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname

export function AuthRedirect({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname(); // Get current path

    useEffect(() => {
        // Skip checks if already on login/blank or during loading
        if (status === 'loading' || pathname === '/login' || pathname === '/blank') return;

        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated') {
            // Only redirect to /blank if currently at the root or another non-protected, non-login path
            // Adjust this condition based on your specific needs
            if (pathname === '/') {
                 router.push('/blank');
            }
        }
    }, [session, status, router, pathname]); // Add pathname to dependency array

    // Show loading state only if status is loading AND not already showing children
    // This prevents layout shifts if session loads quickly
    if (status === 'loading' && !session) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    // Render children if authenticated or if unauthenticated but on the login page
    if (status === 'authenticated' || (status === 'unauthenticated' && pathname === '/login')) {
        return <>{children}</>;
    }

    // Fallback for unauthenticated users not on the login page (should be redirected, but as a safeguard)
    // Or handle other potential states if necessary
    return null; // Or return a minimal layout/loader if preferred
}