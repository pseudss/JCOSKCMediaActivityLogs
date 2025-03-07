'use client';

import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {IndexList} from "@/components/IndexComponents/IndexComponent";
import {ModifiedTable} from "@/components/IndexComponents/ModifiedTable";

const employees = [
    {
        id: 'ckx1y1g0g0000qz6g0g0g0g0',
        employeeId: 'E001',
        firstName: 'John',
        lastName: 'Doe',
        position: 'Software Engineer',
        department: 'Engineering',
        email: 'john.doe@example.com',
    },
    {
        id: 'ckx1y1g0g0000qz6g0g0g0g1',
        employeeId: 'E002',
        firstName: 'Jane',
        lastName: 'Smith',
        position: 'Product Manager',
        department: 'Product',
        email: 'jane.smith@example.com',
    },
    {
        id: 'ckx1y1g0g0000qz6g0g0g0g2',
        employeeId: 'E003',
        firstName: 'Alice',
        lastName: 'Johnson',
        position: 'UX Designer',
        department: 'Design',
        email: 'alice.johnson@example.com',
    },
    {
        id: 'ckx1y1g0g0000qz6g0g0g0g3',
        employeeId: 'E004',
        firstName: 'Bob',
        lastName: 'Brown',
        position: 'Data Analyst',
        department: 'Analytics',
        email: 'bob.brown@example.com',
    },
    {
        id: 'ckx1y1g0g0000qz6g0g0g0g4',
        employeeId: 'E005',
        firstName: 'Charlie',
        lastName: 'Davis',
        position: 'HR Specialist',
        department: 'Human Resources',
        email: 'charlie.davis@example.com',
    },
];

export default function IndexPage() {
    return (
        <div>
            <Card className="mb-4">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                List Header
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Sub Description of List</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <IndexList employees={employees}/>
            <div className="pt-6"/>
            <Card className="mb-4">
                <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                List Header 2
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Sub Description of List 2</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <ModifiedTable employees={employees}/>
        </div>
    )
}
