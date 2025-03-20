import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Search, Filter } from "lucide-react"
import { getEmployeeSummaries } from "@/lib/employee_records"

export default function EmployeesPage() {
  const employees = getEmployeeSummaries()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Employees</CardTitle>
            <CardDescription>Active and inactive employees</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{employees.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Employees</CardTitle>
            <CardDescription>Currently working employees</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {employees.filter((e) => e.status === "Permanent" || e.status === "Regular").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>On Leave</CardTitle>
            <CardDescription>Employees currently on leave</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>View and manage employee information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search employees..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <Badge variant={employee.status === "Permanent" ? "default" : "secondary"}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/employees/${employee.id}`}>View</Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

