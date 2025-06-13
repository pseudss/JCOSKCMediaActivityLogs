'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { JSX, ReactNode, useEffect, useMemo } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBar } from "@/components/LayoutComponents/sidebar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from '@/components/ModeToggle';
import Loading from './loading';
import { defineAbilityFor, AppAbility, UserForAbility } from '@/lib/ability';
import { AbilityContext } from '@/components/ThemeProvider/AbilityContext';
import { prismaQuery } from '@casl/prisma/runtime';
import { ConditionsMatcher } from '@casl/ability';

export default function ProtectedLayout({ children }: { children?: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } 
    }, [status, router]);

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const generateBreadcrumbs = () => {
        const pathParts = pathname.split('/').filter(part => part);
        const breadcrumbs: JSX.Element[] = [];

        if (pathname.match(/^\/employees\/[^/]+$/)) {
            return [
                <BreadcrumbItem key="/employees">
                    <BreadcrumbLink href="/employees">Employees</BreadcrumbLink>
                </BreadcrumbItem>,
                <BreadcrumbSeparator key="separator" />,
                <BreadcrumbItem key={pathname}>
                    <BreadcrumbPage>Employee Details</BreadcrumbPage>
                </BreadcrumbItem>
            ];
        }

        pathParts.forEach((part, index) => {
            const href = `/${pathParts.slice(0, index + 1).join('/')}`;
            const isLast = index === pathParts.length - 1;

            if (part === 'protected') return;

            let displayText = capitalizeFirstLetter(decodeURIComponent(part));

            switch (part) {
                case 'employees':
                    displayText = 'Employees';
                    break;
            }

            if (isLast) {
                breadcrumbs.push(
                    <BreadcrumbItem key={href}>
                        <BreadcrumbPage>{displayText}</BreadcrumbPage>
                    </BreadcrumbItem>
                );
            } else {
                breadcrumbs.push(
                    <BreadcrumbItem key={href}>
                        <BreadcrumbLink href={href}>{displayText}</BreadcrumbLink>
                    </BreadcrumbItem>
                );
                breadcrumbs.push(
                    <BreadcrumbSeparator key={`${href}-separator`} />
                );
            }
        });

        return breadcrumbs;
    };

    const ability = useMemo(() => {
                if (session?.user) {
        
                    const userForAbilityCheck = session.user as UserForAbility;
        
                    if (!userForAbilityCheck.userRoles || !Array.isArray(userForAbilityCheck.userRoles)) {
                        console.error('User object has invalid or missing UserRole structure:', userForAbilityCheck);
                        return new AppAbility([], { conditionsMatcher: prismaQuery as unknown as ConditionsMatcher<unknown> });
                    }
        
                    return defineAbilityFor(userForAbilityCheck);
                }
                 console.log('No session user found, returning default ability.');
                return new AppAbility([], { conditionsMatcher: prismaQuery as unknown as ConditionsMatcher<unknown> });
            }, [session]);

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'authenticated' && session?.user) {
        return (
            <AbilityContext.Provider value={ability}>
                <SidebarProvider>
                    <SideBar user={{
                        id: session?.user?.id as string,
                        username: (session?.user as any)?.username as string || '',
                        firstName: (session?.user as any)?.firstName as string || '',
                        lastName: (session?.user as any)?.lastName as string || '',
                        roles: ((session?.user as UserForAbility)?.userRoles || []).map((ur: { role?: { name: string } }) => ur.role?.name).filter(Boolean) as string[],
                    }} />
                    <SidebarInset>
                        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                {pathname !== '/' && (
                                    <Breadcrumb>
                                        <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
                                    </Breadcrumb>
                                )}
                            </div>
                            <div className="flex items-center gap-4 px-4">
                                <ModeToggle />
                            </div>
                        </header>

                        <main className="flex flex-1 flex-col gap-4 p-4">
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </AbilityContext.Provider>
        );
    }
    return null;
}