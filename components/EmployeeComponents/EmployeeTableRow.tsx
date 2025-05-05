'use client';

import { useRouter } from 'next/navigation';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Define the expected employee prop type (adjust based on getEmployeeSummaries)
type EmployeeSummary = {
    id: string;
    name: string;
    position: string;
    department: string;
    status: string;
};

interface EmployeeTableRowProps {
    employee: EmployeeSummary;
    canViewDetails: boolean;
    canEdit: boolean;
}

export function EmployeeTableRow({ employee, canViewDetails, canEdit }: EmployeeTableRowProps) {
    const router = useRouter();

    const handleRowClick = () => {
        if (canViewDetails) {
            router.push(`/employees/${employee.id}`);
        }
    };

    return (
        <TableRow
            key={employee.id}
            onClick={handleRowClick}
            className={canViewDetails ? 'cursor-pointer hover:bg-muted/50' : ''}
        >
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.position}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>
                <Badge variant={employee.status === "Permanent" ? "default" : "secondary"}>
                    {employee.status}
                </Badge>
            </TableCell>
        </TableRow>
    );
}