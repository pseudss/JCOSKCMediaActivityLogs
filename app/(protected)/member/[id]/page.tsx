"use client"

import { useParams } from "next/navigation"
import { MemberDetail } from "@/components/MemberComponents/Member-Details"

export default function MemberDetailPage() {
  const params = useParams();
  return (
    <div>
      <MemberDetail id={params.id as string} />
    </div>
  )
}
