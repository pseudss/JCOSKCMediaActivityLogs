import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import React from 'react'

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EmployeePage({ params }: PageProps) {
  const employee = await params;
  if (!params) {
    return <div>Employee not found</div>;
  }
  
  return (
    <div className="container py-2 space-y-2">
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Employee Id: {employee.id}
              </h1>
              <p className="text-muted-foreground">
                <Label></Label>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}