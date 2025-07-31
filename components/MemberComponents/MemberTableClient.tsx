'use client'

import { useState, useMemo, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MemberTableRow } from './MemberTableRow'
import type { Member } from '@/interface/member'
import { Button } from '../ui/button'

interface MemberTableClientProps {
  initialMembers: Member[];
  onRefresh?: () => void;
}

export function MemberTableClient({ initialMembers, onRefresh }: MemberTableClientProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Filter members based on search input
  const filteredMembers = useMemo(() => {
    return initialMembers.filter(member =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      (member.description && member.description.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, initialMembers]);

  // Paginate the filtered list
  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMembers, currentPage]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Input
          placeholder="Search members..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead> {/* Added new TableHead for numbering */}
            <TableHead>Name</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedMembers.map((member, index) => (
            <MemberTableRow
              key={member.id}
              member={member}
              onRefresh={onRefresh}
              // Calculate the global index (not just for the current page)
              memberIndex={(currentPage - 1) * itemsPerPage + index + 1}
            />
          ))}
          {paginatedMembers.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No members found.</TableCell> {/* Changed colSpan to 6 */}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination controls */}
        <div className="flex justify-end mt-6 space-x-2 items-center">
        <Button
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="text-sm self-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
      
    </div>
  );
}
