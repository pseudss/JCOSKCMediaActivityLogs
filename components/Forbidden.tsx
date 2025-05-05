'use client';

import { ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from './ui/button';

export function Forbidden() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-red-100 rounded-full p-3 w-fit">
             <ShieldAlert className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            You do not have the necessary permissions to view this page.
          </p>
          <Button asChild>
            <Link href="/">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}