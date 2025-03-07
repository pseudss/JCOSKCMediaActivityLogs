import Link from 'next/link';
import { CardContent } from "@/components/ui/card";
import React from "react";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";

export function ModifiedTable({ employees }: { employees?: any[] }) {
    return (
        <div>
            <CardContent className="p-0">
                {employees && employees.length > 0 ? (
                    <Table>
                        <TableBody>
                            {employees.map((employee: any) => (
                                <TableRow key={employee.id} className="cursor-pointer hover:bg-muted/50">
                                    <TableCell className="font-medium">
                                        <Link href={`/index/${employee.id}`} className="block w-full h-full">
                                            <h1 className="text-lg font-bold tracking-tight">
                                                {`${employee.firstName} ${employee.lastName}`}
                                            </h1>
                                            <span className="text-sm text-muted-foreground">{employee.employeeId}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/index/${employee.id}`} className="block w-full h-full">
                                            <h1 className="text-lg font-bold tracking-tight">
                                                {employee.position}
                                            </h1>
                                            <span className="text-sm text-muted-foreground">{employee.department}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/index/${employee.id}`} className="block w-full h-full">
                                            <h1 className="text-lg font-bold tracking-tight">
                                                {employee.localNumber ? `Local ${employee.localNumber}` : ""}
                                                {employee.contactNumber ? ` | ${employee.contactNumber}` : ""}
                                            </h1>
                                            <span className="text-sm text-muted-foreground">{employee.email}</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-center py-4">No employees found.</p>
                )}
            </CardContent>
        </div>
    );
}
