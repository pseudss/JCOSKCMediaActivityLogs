import { notFound, redirect } from "next/navigation"
import { EmployeeDetail } from "@/components/EmployeeComponents/employee-details"
import { getEmployeeById } from "@/lib/employee_records"
import { ReactElement } from "react";
import { auth } from "@/auth";
import { defineAbilityFor, UserForAbility } from "@/lib/ability";
import { Forbidden } from "@/components/Forbidden";

interface EmployeePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EmployeeDetailPage({
  params,
}: EmployeePageProps): Promise<ReactElement> {
  const { id } = await params;

  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const userForAbilityCheck = session.user as UserForAbility;
  const ability = defineAbilityFor(userForAbilityCheck);

  if (!ability.can('read', 'EmployeeDetails')) {
    return <Forbidden />;
  }

  const employee = await getEmployeeById(id);

  if (!employee) {
    notFound();
  }

  return <EmployeeDetail employee={employee} />;
}