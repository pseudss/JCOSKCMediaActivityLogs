import { notFound, redirect } from "next/navigation"
import { EmployeeDetail } from "@/components/EmployeeComponents/employee-details"
import { getEmployeeById } from "@/lib/employee_records"
import { ReactElement } from "react";
import { auth } from "@/auth";
import { defineAbilityFor, UserForAbility } from "@/lib/ability";
import { Forbidden } from "@/components/Forbidden";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EmployeeDetailPage({
  params,
}: PageProps): Promise<ReactElement> {

  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  const userForAbilityCheck = session.user as UserForAbility;
  const ability = defineAbilityFor(userForAbilityCheck);

  if (!ability.can('read', 'EmployeeDetails')) {
    return <Forbidden />;
  }

  const employee = await getEmployeeById(params.id);

  if (!employee) {
    notFound();
  }

  return <EmployeeDetail employee={employee} />;
}
