import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus } from "lucide-react"
import { getEmployeeSummaries } from "@/lib/employee_records"
import { auth } from "@/auth";
import { defineAbilityFor, UserForAbility } from "@/lib/ability";
import { redirect } from "next/navigation";
import { EmployeeTableClient } from "@/components/EmployeeComponents/EmployeeTableClient";
import { PageHeader } from "@/components/LayoutComponents/page-header"

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
      <PageHeader/>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>View and manage employee information</CardDescription>
          </div>
          {canCreateEmployees && (
            <Link href="/employees/create" passHref>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Create Employee
              </Button>
            </Link>
          )}
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
