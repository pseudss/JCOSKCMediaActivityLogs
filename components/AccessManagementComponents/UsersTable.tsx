import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User } from "@/interface/access-management";

interface UsersTableProps {
  users: User[];
  onRowClick: (user: User) => void;
}

export function UsersTable({ users, onRowClick }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => onRowClick(user)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.first_name} {user.last_name}</TableCell>
              <TableCell>
                {user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <Badge key={role.id} variant="secondary" className="mr-1 mb-1">
                      {role.name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">No roles</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={user.active ? "default" : "destructive"}>
                  {user.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-muted-foreground">
              No users found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}