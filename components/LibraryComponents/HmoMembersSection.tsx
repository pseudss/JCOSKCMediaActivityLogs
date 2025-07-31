'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import type { Member } from '@/interface/member';
import { DOJHMO } from '@/interface/doj-hmo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function HmoMembersSection() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [hmos, setHmos] = useState<DOJHMO[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (open) {
      fetch('/api/doj-coop')
        .then(res => res.json())
        .then(setHmos);
    }
  }, [open]);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/member');
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    (member.dojHmo?.name && member.dojHmo.name.toLowerCase().includes(search.toLowerCase())) ||
    (member.dojHmo?.code && member.dojHmo.code.toLowerCase().includes(search.toLowerCase())) ||
    (member.office?.name && member.office.name.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return <div>Loading HMO Members...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>HMO Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Input
              placeholder="Search by member, HMO, or office..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="max-w-xs"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member Name</TableHead>
                <TableHead>HMO Name</TableHead>
                <TableHead>HMO Code</TableHead>
                <TableHead>Office</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map(member => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.dojHmo?.name || <span className="text-gray-400">No HMO</span>}</TableCell>
                  <TableCell>{member.dojHmo?.code || <span className="text-gray-400">-</span>}</TableCell>
                  <TableCell>{member.office?.name || <span className="text-gray-400">No office</span>}</TableCell>
                </TableRow>
              ))}
              {filteredMembers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No HMO members found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 