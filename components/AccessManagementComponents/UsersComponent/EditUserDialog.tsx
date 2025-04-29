'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; // Adjust import path as needed
import { Button } from "@/components/ui/button"; // Adjust import path as needed
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Role {
    id: string;
    name: string;
}
interface EditUserData {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    roleIds: string[];
}

interface EditUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editUserData: EditUserData | null;
    roles: Role[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    onRoleChange: (roleId: string, checked: boolean) => void;
    onSaveEditUser: () => void;
    isLoading?: boolean;
}

export function EditUserDialog({
    open,
    onOpenChange,
    editUserData,
    roles,
    onInputChange,
    onRoleChange,
    onSaveEditUser,
    isLoading = false,
}: EditUserDialogProps) {
    if (!editUserData) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User: {editUserData.username}</DialogTitle>
                    <DialogDescription>Update user information and access rights.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div>
                        <Label htmlFor="edit-username">Username</Label>
                        <Input
                            id="edit-username"
                            value={editUserData.username}
                            disabled
                        />
                     </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="edit-firstName">First Name</Label>
                            <Input
                                id="edit-firstName" // Use consistent ID
                                value={editUserData.firstName} // Use value from editUserData prop
                                onChange={onInputChange} // Call the parent's input handler
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-lastName">Last Name</Label>
                            <Input
                                id="edit-lastName"
                                value={editUserData.lastName}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2 block">Roles</Label>
                        <div className="space-y-2 border rounded-md p-4 max-h-60 overflow-y-auto">
                            {roles.map(role => (
                                <div key={role.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`edit-role-${role.id}`}
                                        checked={editUserData.roleIds.includes(role.id)}
                                        onCheckedChange={(checked) =>
                                            onRoleChange(role.id, checked === true)
                                        }
                                    />
                                    <Label htmlFor={`edit-role-${role.id}`}>{role.name}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)} type="button">
                        Cancel
                    </Button>
                    {/* This button calls the function passed via the onSaveEditUser prop */}
                    <Button onClick={onSaveEditUser} disabled={isLoading}>
                         {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}