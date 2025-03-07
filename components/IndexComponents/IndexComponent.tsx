import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";

export function IndexList({employees}: { employees: any }) {
    return (
        <CardContent className="p-0">
            {employees && employees.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee ID</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee: any) => (
                            <TableRow
                                key={employee.id}
                                className="cursor-pointer hover:bg-muted/50"
                            >
                                <TableCell className="font-medium">
                                    <Link
                                        href={`/index/${employee.id}`}
                                        className="block w-full h-full"
                                    >
                                        {employee.employeeId}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/index/${employee.id}`}
                                        className="block w-full h-full"
                                    >
                                        {`${employee.lastName}, ${employee.firstName}`}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/index/${employee.id}`}
                                        className="block w-full h-full"
                                    >
                                        {employee.position}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/index/${employee.id}`}
                                        className="block w-full h-full"
                                    >
                                        {employee.department}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={`/index/${employee.id}`}
                                        className="block w-full h-full"
                                    >
                                        {employee.email}
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
    );
}