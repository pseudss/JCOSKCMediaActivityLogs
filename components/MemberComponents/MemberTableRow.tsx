import { Member } from '@/interface/member';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { EditMemberModal } from './EditMemberModal';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MemberTableRowProps {
  member: Member;
  onRefresh?: () => void;
  memberIndex: number; // Add the new prop for the member number
}

export function MemberTableRow({ member, onRefresh, memberIndex }: MemberTableRowProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <TableCell className="font-medium">{memberIndex}</TableCell> {/* Display the member number here */}
      <TableCell>{member.name}</TableCell>
      <TableCell>{member.description || "No position"}</TableCell>
      <TableCell>{formatDate(member.createdAt)}</TableCell>
      <TableCell>
        <Badge variant={member.active ? 'default' : 'destructive'}>
          {member.active ? 'Active' : 'Inactive'}
        </Badge>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <EditMemberModal
                member={member}
                onMemberUpdated={onRefresh}
                onMemberDeleted={onRefresh}
                trigger={
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit member</span>
                  </Button>
                }
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to edit or delete member</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  );
}