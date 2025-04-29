'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Role, NewUserData } from '@/interface/access-management';

interface AddUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    newUserData: NewUserData;
    roles: Role[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRoleChange: (roleId: string, checked: boolean) => void; // <--- roleId type is number
    onCreateUser: () => void; // Handler for the create button click (from parent)
    isLoading?: boolean; // Optional: to show loading state on button
}

export function AddUserDialog({
    open,
    onOpenChange,
    newUserData,
    roles,
    onInputChange,
    onRoleChange,
    onCreateUser,
    isLoading = false,
}: AddUserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account with appropriate access rights.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="username" className="mb-2 block">Username</Label>
                        <Input
                            id="username"
                            placeholder="Username"
                            value={newUserData.username}
                            onChange={onInputChange} // Call the parent's input handler
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                placeholder="John"
                                value={newUserData.firstName}
                                onChange={onInputChange} // Call the parent's input handler
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                value={newUserData.lastName}
                                onChange={onInputChange} // Call the parent's input handler
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="mb-2 block">Roles</Label>
                        <div className="space-y-2 border rounded-md p-4 max-h-60 overflow-y-auto">
                            {/* Map over the roles passed as a prop */}
                            {roles.map((role) => (
                                <div key={role.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`role-${role.id}`}
                                        // Check if the role.id is included in the roleIds array from parent state
                                        checked={newUserData.roleIds.includes(role.id)}
                                        onCheckedChange={(checked) => {
                                            // 👇 Call the parent's handler here 👇
                                            // Pass the role.id and whether it's checked
                                            onRoleChange(role.id, checked === true);
                                        }}
                                    />
                                    <Label htmlFor={`role-${role.id}`}>{role.name}</Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="status">Status</Label>
                            
                            <Select
                                value={String(newUserData.status)}
                                onValueChange={(value) => {
                                    const booleanValue = value === 'true';
                                    onInputChange({ target: { id: 'status', value: booleanValue } } as any);
                                }}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Active</SelectItem>
                                    <SelectItem value="false">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="password">Temporary Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={newUserData.password}
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={onCreateUser} disabled={isLoading}>
                         {isLoading ? 'Creating...' : 'Create User'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}