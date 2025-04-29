import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Role, EditUserData, NewUserData } from "@/interface/access-management";

interface ManageUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newData?: NewUserData; 
  editData?: EditUserData;
  roles: Role[];
  isLoading: boolean;
  onSubmit: (data: NewUserData | EditUserData) => Promise<void>;
}

export const ManageUserDialog: React.FC<ManageUserDialogProps> = ({
  open,
  onOpenChange,
  newData,
  editData,
  roles,
  isLoading,
  onSubmit,
}) => {
const isEdit = Boolean(editData?.id);

  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    roleIds: [] as string[],
    active: true,
  });

  useEffect(() => {
    if (editData) {
      setForm({
        username: editData.username,
        firstName: editData.firstName,
        lastName: editData.lastName,
        password: editData.password || "",
        roleIds: editData.roleIds,
        active: editData.active,
      });
    } else {
      setForm({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        roleIds: [],
        active: true,
      });
    }
  }, [newData, open]);

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
  if (isEdit && editData) {
    const dataToSubmit: EditUserData = {
      id: editData.id,
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
      roleIds: form.roleIds,
      active: form.active,
    };
    onSubmit(dataToSubmit);
  } else if (newData) {
    const dataToSubmit: NewUserData = {
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
      password: form.password || "",
      roleIds: form.roleIds,
      active: form.active,
    };
    onSubmit(dataToSubmit);
  }
};

const handleToggleStatusClick = () => {
  setForm(prev => ({
   ...prev,
    active: !prev.active,
  }));
};

return (
  <Dialog open={open} onOpenChange={onOpenChange}>
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
            disabled={isEdit}
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

        {/* Password field - only for create mode */}
        {!isEdit && (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        )}

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
                <Label htmlFor={`role-${role.id}`}>
                  {role.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Edit mode specific fields */}
        {isEdit && (
          <>
            {/* Status toggle */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Status:
              </Label>
              <Button
                type="button"
                variant={form.active ? "default" : "outline"}
                onClick={handleToggleStatusClick}
                disabled={isLoading}
                className="col-span-3 justify-start"
              >
                {form.active ? "Active" : "Inactive"}
              </Button>
            </div>
          </>
        )}
      </div>

      <DialogFooter>
        <Button 
          type="button"
          variant="secondary"
          onClick={() => onOpenChange(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isEdit ? "Save Changes" : "Create User"}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
};
