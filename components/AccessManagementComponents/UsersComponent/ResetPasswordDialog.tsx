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
import { Label } from "@/components/ui/label"; // Adjust import path as needed
import { Input } from "@/components/ui/input"; // Adjust import path as needed

interface UserToResetPassword {
    id: string;
    username: string;
    first_name: string; // Assuming these fields exist on your user object
    last_name: string;
    // ... other user properties if needed
}

interface ResetPasswordDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userToReset?: UserToResetPassword | null; // Can be null if no user is selected
    newPasswordData: { newPassword: string }; // Use an object to match handleInputChange pattern if preferred
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for the new password input
    onSaveResetPassword: () => void;
    isLoading?: boolean; // Optional: to show loading state on button
}

export function ResetPasswordDialog({
    open,
    onOpenChange,
    userToReset,
    newPasswordData,
    onInputChange,
    onSaveResetPassword,
    isLoading = false,
}: ResetPasswordDialogProps) {
     if (!userToReset) return null; // Don't render if no user is selected

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reset Password for {userToReset.first_name} {userToReset.last_name}</DialogTitle>
                    <DialogDescription>Set a new temporary password for this user.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="reset-password">New Password</Label>
                        <Input
                            id="newPassword" // Use a consistent ID
                            type="password"
                            value={newPasswordData.newPassword}
                            onChange={onInputChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={() => onOpenChange(false)} type="button">
                        Cancel
                    </Button>
                    <Button onClick={onSaveResetPassword} disabled={isLoading}>
                         {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}