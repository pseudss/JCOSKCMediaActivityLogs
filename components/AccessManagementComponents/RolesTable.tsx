import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/interface/access-management";
import { Button } from "@/components/ui/button"; // Added for expand/collapse

interface RolesTableProps {
  roles: Role[];
  onRowClick: (role: Role) => void;
  expandedRoleId: string | null;
  onToggleExpand: (roleId: string) => void;
}

export function RolesTable({ roles, onRowClick, expandedRoleId, onToggleExpand }: RolesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead style={{ width: '30%' }}>Role Name</TableHead>
          <TableHead style={{ width: '30%' }}>Description</TableHead>
          <TableHead style={{ width: '40%' }}>Permissions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.length > 0 ? (
          roles.map((role) => (
            <React.Fragment key={role.id}>
              <TableRow
                onClick={() => onRowClick(role)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{role.description || "-"}</TableCell>
                <TableCell>
                  {role.permissions && role.permissions.length > 0 ? (
                    <>
                      {role.permissions.slice(0, 3).map((permission) => (
                        <Badge key={permission.id} variant="outline" className="mr-1 mb-1">
                          {permission.name}
                        </Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 h-auto text-xs"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            onToggleExpand(role.id);
                          }}
                        >
                          {expandedRoleId === role.id ? "Show less" : `+${role.permissions.length - 3} more`}
                        </Button>
                      )}
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">No permissions assigned</span>
                  )}
                </TableCell>
              </TableRow>
              {expandedRoleId === role.id && role.permissions && role.permissions.length > 3 && (
                <TableRow className="bg-muted/30 hover:bg-muted/40">
                  <TableCell colSpan={3} className="py-2 px-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission) => (
                        <Badge key={permission.id} variant="outline">
                          {permission.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground">
              No roles found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}