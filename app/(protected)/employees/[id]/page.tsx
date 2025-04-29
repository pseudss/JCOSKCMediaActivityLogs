import { notFound } from "next/navigation"
import { EmployeeDetail } from "@/components/EmployeeComponents/employee-details"
import { getEmployeeById } from "@/lib/employee_records"

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const employee = getEmployeeById(params.id)

  if (!employee) {
    notFound()
  }

  return <EmployeeDetail employee={employee} />
}