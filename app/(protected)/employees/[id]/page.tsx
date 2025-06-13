"use client"

import { useParams } from "next/navigation"

export default function EmployeeDetailPage() {
  const params = useParams();
  return (
  <div>
    Employee Id: {params.id}
  </div>)
}
