import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Remove Input, Table components if no longer used directly here
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus } from "lucide-react" // Remove Search, Filter if moved
import { getEmployeeSummaries } from "@/lib/employee_records"
import { auth } from "@/auth";
import { defineAbilityFor, UserForAbility } from "@/lib/ability";
import { redirect } from "next/navigation";
// Import the new client component
import { EmployeeTableClient } from "@/components/EmployeeComponents/EmployeeTableClient";

export default async function EmployeesPage() {
  // Fetch session and define ability
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const userForAbilityCheck = session.user as UserForAbility;
  const ability = defineAbilityFor(userForAbilityCheck);
  const canViewDetails = ability.can('read', 'EmployeeDetails');
  const canEditEmployees = ability.can('update', 'Employees');
  const canCreateEmployees = ability.can('create', 'Employees');

  // Fetch employee data
  const employees = await getEmployeeSummaries();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        {canCreateEmployees && (
            <Button asChild>
                {/* Link to the add employee page (you'll need to create this route) */}
                <Link href="/employees/add">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Employee
                </Link>
            </Button>
        )}
      </div>

      {/* Keep the summary cards */}
      <div className="grid gap-6 mb-6 md:grid-cols-3">
        {/* ... Card components ... */}
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
            <p className="text-3xl font-bold">0</p> {/* Replace with actual data if available */}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>View and manage employee information</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Render the Client Component here */}
          <EmployeeTableClient
            initialEmployees={employees}
            canViewDetails={canViewDetails}
            canEdit={canEditEmployees}
          />
        </CardContent>
      </Card>
    </div>
  )
}
