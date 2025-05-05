'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname

export function AuthRedirect({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        
        if (status === 'loading' || pathname === '/login' || pathname === '/blank') return;

        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated') {
            
            if (pathname === '/') {
                 router.push('/blank');
            }
        }
    }, [session, status, router, pathname]);
    
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
    
    if (status === 'authenticated' || (status === 'unauthenticated' && pathname === '/login')) {
        return <>{children}</>;
    }
    
    return null;
}