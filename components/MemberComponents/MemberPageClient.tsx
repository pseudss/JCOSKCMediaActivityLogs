'use client'

import { useState } from 'react'
import { MemberTableClient } from './MemberTableClient'
import { AddMemberModal } from './AddMemberModal'
import type { Member } from '@/interface/member'

interface MemberPageClientProps {
  initialMembers: Member[];
}

export function MemberPageClient({ initialMembers }: MemberPageClientProps) {
  const [members, setMembers] = useState(initialMembers)

  const handleMemberAdded = () => {
    // Refresh the members list by refetching from the API
    fetch('/api/member')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(error => console.error('Error refreshing members:', error))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
        <AddMemberModal onMemberAdded={handleMemberAdded} />
      </div>
      <MemberTableClient
        initialMembers={members}
        onRefresh={handleMemberAdded}
      />
    </div>
  )
} 