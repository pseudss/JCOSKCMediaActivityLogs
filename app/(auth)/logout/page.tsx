'use client';

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Removed @ts-ignore

function LogoutPage() { // Renamed component to follow PascalCase convention for components
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Only attempt to sign out if the status is determined (not loading)
        // and ideally, if the user is authenticated, though signOut handles no-session cases.
        if (status !== 'loading') {
            signOut({
                redirect: false, // We handle redirect manually
                // callbackUrl: '/login' // Alternatively, signOut can handle the redirect
            }).then(() => {
                router.replace('/login');
            }).catch(error => {
                console.error("Error during sign out:", error);
                // Fallback redirect in case of error, or display an error message
                router.replace('/login'); 
            });
        }
    }, [status, router]);

    // This component doesn't render anything visible, its purpose is the side effect of logging out.
    // A loading indicator could be returned if preferred, but null is fine for a quick redirect.
    return null; 
}

export default LogoutPage;