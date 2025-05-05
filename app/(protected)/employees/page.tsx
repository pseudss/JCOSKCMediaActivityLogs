import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus } from "lucide-react"
import { getEmployeeSummaries } from "@/lib/employee_records"
import { auth } from "@/auth";
import { defineAbilityFor, UserForAbility } from "@/lib/ability";
import { redirect } from "next/navigation";
import { EmployeeTableClient } from "@/components/EmployeeComponents/EmployeeTableClient";

export default async function EmployeesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const userForAbilityCheck = session.user as UserForAbility;
  const ability = defineAbilityFor(userForAbilityCheck);
  const canViewDetails = ability.can('read', 'EmployeeDetails');
  const canEditEmployees = ability.can('update', 'Employees');
  const canCreateEmployees = ability.can('create', 'Employees');

  const employees = await getEmployeeSummaries();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        {canCreateEmployees && (
            <Button asChild>
                <Link href="/employees/add">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New Employee
                </Link>
            </Button>
        )}
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
