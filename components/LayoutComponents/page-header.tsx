'use client'; // Add this line if not already present, as usePathname is a client hook

import React from 'react';
import { Card, CardTitle } from '../ui/card';
import { menuItems } from '@/lib/menuItems';
import { usePathname } from 'next/navigation'; // Import usePathname

interface PageHeaderProps {
  subtitle?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  subtitle,
  children
}) => {
  const pathname = usePathname();
  const currentMenuItem = menuItems.main.concat(menuItems.system).find(item => pathname.includes(item.url));
  const pageTitle = currentMenuItem ? currentMenuItem.name : '';

  return (
    <div>
        <Card className="flex items-center justify-between mb-6 p-6">
            <div>
                <CardTitle className="text-3xl font-bold">
                    {pageTitle}
                </CardTitle>
                {subtitle && (
                    <p className="text-muted-foreground mt-1">
                        {subtitle}
                    </p>
                )}
            </div>
            {children}
        </Card>
    </div>
  );
};
