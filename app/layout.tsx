'use client';

import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { AuthRedirect } from "@/components/LayoutComponents/auth-redirect";
import React from "react";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <SessionProvider>
            <AuthRedirect>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </AuthRedirect>
        </SessionProvider>
        </body>
        </html>
    );
}
