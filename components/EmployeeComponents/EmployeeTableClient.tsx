'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter } from 'lucide-react';
import { EmployeeTableRow } from './EmployeeTableRow'; 

type EmployeeSummary = {
    id: string;
    name: string;
    position: string;
    department: string;
    status: string;
};

interface EmployeeTableClientProps {
    initialEmployees: EmployeeSummary[];
    canViewDetails: boolean;
    canEdit: boolean;
}

export function EmployeeTableClient({ initialEmployees, canViewDetails, canEdit }: EmployeeTableClientProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmployees = useMemo(() => {
        if (!searchTerm) {
            return initialEmployees;
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return initialEmployees.filter(employee =>
            employee.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            employee.position.toLowerCase().includes(lowerCaseSearchTerm) ||
            employee.department.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [initialEmployees, searchTerm]);

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search employees by name, position, department..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </div>

            <div className="rounded-md border">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead style={{ width: '30%' }}>Name</TableHead>
                            <TableHead style={{ width: '30%' }}>Position</TableHead>
                            <TableHead style={{ width: '30%' }}>Department</TableHead>
                            <TableHead style={{ width: '10%' }}>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
                                <EmployeeTableRow
                                    key={employee.id}
                                    employee={employee}
                                    canViewDetails={canViewDetails}
                                    canEdit={canEdit}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}