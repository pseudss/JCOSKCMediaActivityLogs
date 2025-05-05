import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Role, EditUserData } from "@/interface/access-management"; // Keep EditUserData, it defines the shape

interface ManageUserDialogProps {
  isOpen: boolean; // Renamed from 'open' for clarity, matches parent
  onOpenChange: (open: boolean) => void;
  userData?: EditUserData; // Changed from editData/newData to userData
  roles: Role[];
  isLoading: boolean;
  onSubmit: (data: EditUserData) => Promise<void>; // onSubmit expects EditUserData shape
}

export const ManageUserDialog: React.FC<ManageUserDialogProps> = ({
  isOpen,
  onOpenChange,
  userData, // Use userData prop
  roles,
  isLoading,
  onSubmit,
}) => {
  // Determine if it's edit mode based on userData having an id
  const isEdit = Boolean(userData?.id);

  // Initialize form state
  const [form, setForm] = useState<EditUserData>({
    id: undefined,
    username: "",
    firstName: "",
    lastName: "",
    password: "", // Keep password field for potential updates or creation
    roleIds: [],
    active: true,
  });

  // Effect to update form when userData changes or dialog opens
  useEffect(() => {
    if (isOpen) { // Only update form when dialog is open
      if (userData) {
        // If userData is provided, populate the form (covers both edit and potentially pre-filled create)
        setForm({
          id: userData.id, // Include id if present
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          password: userData.password || "", // Use existing password or empty
          roleIds: userData.roleIds || [],
          active: userData.active !== undefined ? userData.active : true,
        });
      } else {
        // If no userData, reset form for creation
        setForm({
          id: undefined,
          username: "",
          firstName: "",
          lastName: "",
          password: "",
          roleIds: [],
          active: true,
        });
      }
    }
  }, [userData, isOpen]); // Depend on userData and isOpen

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleChange = (roleId: string, checked: boolean) => {
    setForm(prev => ({
      ...prev,
      roleIds: checked
        ? [...prev.roleIds, roleId]
        : prev.roleIds.filter(id => id !== roleId),
    }));
  };

  const handleSubmit = () => {
    // Prepare data based on the current form state
    // The 'id' field determines if it's an update or create in the parent's onSubmit
    const dataToSubmit: EditUserData = {
        id: form.id, // Pass the id (will be undefined for create)
        username: form.username,
        firstName: form.firstName,
        lastName: form.lastName,
        roleIds: form.roleIds,
        active: form.active,
        password: form.password, // Include password
    };
    onSubmit(dataToSubmit);
  };

  // Removed handleToggleStatusClick as active status is handled by checkbox/switch

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit User" : "Add New User"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Edit user details, roles and status."
              : "Create a new user and assign roles."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Username field - disabled in edit mode */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              disabled={isEdit} // Keep disabled for edit
              className="col-span-3"
            />
          </div>

          {/* First Name field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* Last Name field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* Password field - Allow changing password in edit mode too */}
          {/* Consider adding a separate 'Change Password' feature for better UX */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password} // Controlled component
              onChange={handleChange}
              placeholder={isEdit ? "Leave blank to keep current password" : "Enter password"}
              className="col-span-3"
            />
          </div>

          {/* Roles selection */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right mt-2">
              Roles
            </Label>
            <div className="col-span-3">
              {roles.map(role => (
                <div
                  key={role.id}
                  className="flex items-center space-x-2 border-b last:border-b-0 p-2"
                >
                  <Checkbox
                    id={`role-${role.id}`}
                    checked={form.roleIds.includes(role.id)}
                    onCheckedChange={checked =>
                      handleRoleChange(role.id, checked === true)
                    }
                  />
                  <Label htmlFor={`role-${role.id}`} className="flex-1 cursor-pointer">
                    {role.name}
                    {role.description && (
                      <p className="text-xs text-muted-foreground">{role.description}</p>
                    )}
                  </Label>
                </div>
              ))}
              {roles.length === 0 && (
                  <p className="text-sm text-muted-foreground p-2">No roles available.</p>
              )}
            </div>
          </div>

          {/* Active Status */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="active" className="text-right">
              Status
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
               <Checkbox 
                 id="active" 
                 name="active" 
                 checked={form.active} 
                 onCheckedChange={(checked) => setForm(prev => ({...prev, active: checked === true}))} 
               />
               <Label htmlFor="active" className="cursor-pointer">
                 {form.active ? "Active" : "Inactive"}
               </Label>
            </div>
          </div>

        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Changes" : "Create User")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
