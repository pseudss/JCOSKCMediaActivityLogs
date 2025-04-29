import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Permission, NewRoleData, EditRoleData } from "@/interface/access-management"

type RoleFormData = NewRoleData & { id?: string };

interface ManageRoleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    roleData?: EditRoleData;
    permissions: Permission[];
    isLoading: boolean; 
    onSubmit: (data: EditRoleData) => Promise<void>;
}

export const ManageRoleDialog: React.FC<ManageRoleDialogProps> = ({
    open,
    onOpenChange,
    roleData,
    permissions,
    isLoading,
    onSubmit,
}) => {
    const isEditing = !!roleData;
    
    const [formData, setFormData] = useState<RoleFormData>(
        roleData || { name: '', description: '', permissionIds: [] }
    );

    useEffect(() => {
        setFormData(
            roleData || { name: '', description: '', permissionIds: [] }
        );
    }, [roleData, open]);
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };
    
    const onPermissionChange = (permissionId: string, checked: boolean) => {
        setFormData((prevData) => {
            const currentPermissionIds = prevData.permissionIds;
            if (checked) {
                // Add permissionId if checked and not already present
                if (!currentPermissionIds.includes(permissionId)) {
                    return {
                        ...prevData,
                        permissionIds: [...currentPermissionIds, permissionId],
                    };
                }
            } else {
                if (currentPermissionIds.includes(permissionId)) {
                    return {
                        ...prevData,
                        permissionIds: currentPermissionIds.filter(
                            (id) => id !== permissionId
                        ),
                    };
                }
            }
            // No change needed
            return prevData;
        });
    };

    // Handle form submission
    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Role' : 'Create New Role'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Edit the details and permissions for this role.'
                            : 'Define a new role with specific permissions.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="name">Role Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g., Editor"
                            value={formData.name}
                            onChange={onInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="Briefly describe the role's purpose"
                            value={formData.description}
                            onChange={onInputChange}
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">Permissions</Label>
                        <div className="space-y-2 border rounded-md p-4 max-h-60 overflow-y-auto">
                            {permissions.map((permission) => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`permission-${permission.id}`}
                                        checked={formData.permissionIds.includes(permission.id)}
                                        onCheckedChange={(checked) =>
                                            onPermissionChange(permission.id, checked === true)
                                        }
                                    />
                                    <Label htmlFor={`permission-${permission.id}`} className="flex-1 cursor-pointer">
                                        <span className="font-medium">{permission.name}</span>
                                        <span className="text-sm text-muted-foreground block">
                                            {permission.description}
                                        </span>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading
                            ? isEditing
                                ? 'Saving...'
                                : 'Creating...'
                            : isEditing
                                ? 'Save Changes'
                                : 'Create Role'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}