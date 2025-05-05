"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { UserPlus, Search, Users, Key, Plus, UserCog } from "lucide-react"
import { cn } from "@/lib/utils"
import { ManageUserDialog } from "@/components/AccessManagementComponents/UsersComponent/ManageUserDialog";
import { ManageRoleDialog } from "@/components/AccessManagementComponents/RolesComponent/ManageRoleDialog";
import { Role, User, EditUserData, EditRoleData, Permission, NewUserData } from "@/interface/access-management";

export default function AccessManagementPage() {
    const [activeCategory, setActiveCategory] = useState("users");
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [manageUserDialogOpen, setManageUserDialogOpen] = useState(false);
    const [userFormData, setUserFormData] = useState<EditUserData>();
    const [isLoadingUserAction, setIsLoadingUserAction] = useState(false);
    const [manageRoleDialogOpen, setManageRoleDialogOpen] = useState(false);
    const [roleFormData, setRoleFormData] = useState<EditRoleData>();
    const [isLoadingRoleAction, setIsLoadingRoleAction] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAccessManagementData();
    }, []);

    const fetchAccessManagementData = async () => {
        try {
            const [usersRes, rolesRes, permissionsRes] = await Promise.all([
                fetch("/api/access-management/users"),
                fetch("/api/access-management/roles"),
                fetch("/api/access-management/permissions"),
            ]);

            if (!usersRes.ok || !rolesRes.ok || !permissionsRes.ok) {
                const errors = await Promise.all([
                    !usersRes.ok ? usersRes.json().catch(() => ({ message: `Failed to fetch users (${usersRes.status})` })) : null,
                    !rolesRes.ok ? rolesRes.json().catch(() => ({ message: `Failed to fetch roles (${rolesRes.status})` })) : null,
                    !permissionsRes.ok ? permissionsRes.json().catch(() => ({ message: `Failed to fetch permissions (${permissionsRes.status})` })) : null
                ]);
                throw new Error(errors.filter(Boolean).map(e => e.message).join("; ") || "Failed to fetch access management data");
            }

            const [usersData, rolesData, permissionsData] = await Promise.all([
                usersRes.json(),
                rolesRes.json(),
                permissionsRes.json()
            ]);

            const processedUsers = processUserData(usersData, rolesData);
            setUsers(processedUsers);
            setRoles(rolesData);
            setPermissions(permissionsData);

        } catch (err: any) {
            console.error("Error fetching access management data", err);
            alert(`Failed to load data: ${err.message}`);
        }
    };

    const processUserData = (usersData: any[], rolesData: Role[]): User[] => {
        return usersData.map(user => {
            const userRoles = getUserRoles(user, rolesData);
            return {
                ...user,
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                active: user.active,
                roles: userRoles,
            } as User;
        });
    };

    const getUserRoles = (user: any, rolesData: Role[]): Role[] => {
        if (user.UserRole && Array.isArray(user.UserRole)) {
            return user.UserRole
                .map((ur: { roleId: string }) => {
                    const role = rolesData.find(r => r.id === ur.roleId);
                    return role ? { ...role } : null;
                })
                .filter(Boolean);
        }
        if (user.roleIds) {
            return rolesData.filter(role => user.roleIds.includes(role.id));
        }
        if (user.roles && Array.isArray(user.roles)) {
            return user.roles.map((role: { id: any; name: any; description: any; permissions: any }) => ({
                id: role.id,
                name: role.name,
                description: role.description,
                permissions: role.permissions
            }));
        }
        return [];
    };

    const handleOpenManageUserDialog = (user?: User) => {
        const formData = user ? {
            id: user.id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            roleIds: user.roles.map(role => role.id),
            active: user.active,
        } : {
            username: "",
            firstName: "",
            lastName: "",
            roleIds: [],
            active: true,
            password: "",
        };
        setUserFormData(formData);
        setManageUserDialogOpen(true);
    };

    const handleUserSubmit = async (data: EditUserData) => {
        setIsLoadingUserAction(true);
        try {
            const isUpdate = Boolean(data.id);
            const endpoint = isUpdate ? `/api/access-management/users/${data.id}` : "/api/access-management/users";
            const method = isUpdate ? "PATCH" : "POST";
            
            const payload = {
                ...(isUpdate ? {} : { username: data.username }),
                first_name: data.firstName,
                last_name: data.lastName,
                [isUpdate ? 'roleIds' : 'roles']: data.roleIds,
                active: data.active,
                password: data.password,
            };

            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ 
                    message: `Failed to ${isUpdate ? 'update' : 'create'} user (${response.status})` 
                }));
                throw new Error(errorData.error || errorData.message);
            }

            const responseData = await response.json();
            updateUserState(responseData, isUpdate);
            
            setManageUserDialogOpen(false);
            setUserFormData(undefined);
            await fetchAccessManagementData();

        } catch (error: any) {
            console.error("Error saving user:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsLoadingUserAction(false);
        }
    };

    const updateUserState = (userData: any, isUpdate: boolean) => {
        const processedUser = {
            ...userData,
            roles: roles.filter(role => (userData.roles || []).includes(role.id))
        };

        setUsers(prevUsers => isUpdate
            ? prevUsers.map(u => u.id === userData.id ? processedUser : u)
            : [...prevUsers, processedUser]
        );
    };

    const handleOpenManageRoleDialog = (role?: Role) => {
        const formData = role ? {
            id: role.id,
            name: role.name,
            description: role.description ?? "",
            permissionIds: role.permissions?.map(p => p.id) ?? [],
        } : {
            name: "",
            description: "",
            permissionIds: [],
        };
        setRoleFormData(formData);
        setManageRoleDialogOpen(true);
    };

    const handleRoleSubmit = async (data: EditRoleData) => {
        setIsLoadingRoleAction(true);
        try {
            const isUpdate = Boolean(data.id);
            const endpoint = isUpdate ? `/api/access-management/roles/${data.id}` : "/api/access-management/roles";
            const method = isUpdate ? "PATCH" : "POST";

            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    permissionIds: data.permissionIds,
                }),
            });

            if (!response.ok) {
                const errorData = await handleErrorResponse(response);
                throw new Error(errorData.error || errorData.message);
            }

            const roleData = await response.json();
            updateRoleState(roleData, isUpdate);
            
            setManageRoleDialogOpen(false);
            setRoleFormData(undefined);
            await fetchAccessManagementData();

        } catch (error: any) {
            console.error("Error saving role:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsLoadingRoleAction(false);
        }
    };

    const handleErrorResponse = async (response: Response) => {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            try {
                return await response.json();
            } catch {
                return { message: `Failed to parse JSON error (${response.status})` };
            }
        }
        return { message: `Request failed with status ${response.status}` };
    };

    const updateRoleState = (roleData: any, isUpdate: boolean) => {
        const processedRole: Role = {
            id: roleData.id,
            name: roleData.name,
            description: roleData.description,
            permissions: permissions.filter(p => (roleData.permissionIds || []).includes(p.id)),
        };

        setRoles(prevRoles => isUpdate
            ? prevRoles.map(r => r.id === processedRole.id ? processedRole : r)
            : [...prevRoles, processedRole]
        );
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;
        
        const lowerCaseQuery = searchQuery.toLowerCase();
        return users.filter(user => (
            user.first_name.toLowerCase().includes(lowerCaseQuery) ||
            user.last_name.toLowerCase().includes(lowerCaseQuery) ||
            user.username.toLowerCase().includes(lowerCaseQuery) ||
            user.roles.some(role => role.name.toLowerCase().includes(lowerCaseQuery))
        ));
    }, [users, searchQuery]);

    const filteredRoles = useMemo(() => {
        if (!searchQuery) return roles;
        
        const lowerCaseQuery = searchQuery.toLowerCase();
        return roles.filter(role => (
            role.name.toLowerCase().includes(lowerCaseQuery) ||
            (role.description ?? "").toLowerCase().includes(lowerCaseQuery) ||
            (role.permissions ?? []).some(permission => (
                permission.name.toLowerCase().includes(lowerCaseQuery) ||
                permission.description?.toLowerCase().includes(lowerCaseQuery)
            ))
        ));
    }, [roles, searchQuery, permissions]);

    const filteredPermissions = useMemo(() => {
        if (!searchQuery) return permissions;
        
        const lowerCaseQuery = searchQuery.toLowerCase();
        return permissions.filter(permission => (
            permission.name.toLowerCase().includes(lowerCaseQuery) ||
            (permission.description ?? "").toLowerCase().includes(lowerCaseQuery)
        ));
    }, [permissions, searchQuery]);

    return (
        <div className="flex flex-col min-h-screen">
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Access Management</h1>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar Navigation */}
                    <div className="w-1/4">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="flex flex-col w-full">
                                    <button
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors",
                                            activeCategory === "users" ? "bg-muted text-primary" : ""
                                        )}
                                        onClick={() => setActiveCategory("users")}
                                    >
                                        <Users className="h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">Users</span>
                                    </button>
                                    <button
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors",
                                            activeCategory === "roles" ? "bg-muted text-primary" : ""
                                        )}
                                        onClick={() => setActiveCategory("roles")}
                                    >
                                        <UserCog className="h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">Roles</span>
                                    </button>
                                    <button
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors",
                                            activeCategory === "permissions" ? "bg-muted text-primary" : ""
                                        )}
                                        onClick={() => setActiveCategory("permissions")}
                                    >
                                        <Key className="h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">Permissions</span>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-3/4">
                        {/* User Management Section */}
                        {activeCategory === "users" && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>User Management</CardTitle>
                                        <CardDescription>Manage system users and their access</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-full max-w-sm">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="search"
                                                placeholder="Search users..."
                                                className="pl-8"
                                                value={searchQuery}
                                                onChange={handleSearchInputChange}
                                            />
                                        </div>
                                        <Button onClick={() => handleOpenManageUserDialog()}>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Add User
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[30%]">Full Name</TableHead>
                                                    <TableHead className="w-[30%]">Username</TableHead>
                                                    <TableHead className="w-[30%]">Roles</TableHead>
                                                    <TableHead className="w-[10%]">Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredUsers.map((user) => (
                                                    <TableRow
                                                        key={user.id}
                                                        className="cursor-pointer hover:bg-muted/50"
                                                        onClick={() => handleOpenManageUserDialog(user)}
                                                    >
                                                        <TableCell>{user.first_name} {user.last_name}</TableCell>
                                                        <TableCell>{user.username}</TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-wrap gap-1">
                                                                {user.roles.map((role) => (
                                                                    <Badge key={role.id} variant="secondary">
                                                                        {role.name}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="flex items-center gap-2">
                                                                <span
                                                                    style={{
                                                                        display: "inline-block",
                                                                        width: "10px", height: "10px", borderRadius: "50%",
                                                                        backgroundColor: user.active ? "#22c55e" : "#ef4444",
                                                                    }}
                                                                />
                                                                {user.active ? "Active" : "Inactive"}
                                                            </span>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Role Management Section */}
                        {activeCategory === "roles" && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Role Management</CardTitle>
                                        <CardDescription>Manage role definitions and their associated permissions</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-full max-w-sm">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="search"
                                                placeholder="Search roles..."
                                                className="pl-8"
                                                value={searchQuery}
                                                onChange={handleSearchInputChange}
                                            />
                                        </div>
                                        <Button onClick={() => handleOpenManageRoleDialog()}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Role
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[30%]">Role Name</TableHead>
                                                    <TableHead className="w-[30%]">Description</TableHead>
                                                    <TableHead className="w-[40%]">Permissions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredRoles.map((role) => (
                                                    <TableRow
                                                        key={role.id}
                                                        className="cursor-pointer hover:bg-muted/50"
                                                        onClick={() => handleOpenManageRoleDialog(role)}
                                                    >
                                                        <TableCell>{role.name}</TableCell>
                                                        <TableCell>{role.description}</TableCell>
                                                        <TableCell>
                                                            <div className="flex flex-wrap gap-1">
                                                                {(role.permissions ?? []).map((permission) => (
                                                                    <Badge key={permission.id} variant="outline">
                                                                        {permission.description}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Permission List Section */}
                        {activeCategory === "permissions" && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Permission List</CardTitle>
                                        <CardDescription>Configure system permissions and access controls</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-full max-w-sm">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="search"
                                                placeholder="Search permissions..."
                                                className="pl-8"
                                                value={searchQuery}
                                                onChange={handleSearchInputChange}
                                            />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Permission Name</TableHead>
                                                    <TableHead>Description</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredPermissions.map((permission) => (
                                                    <TableRow key={permission.id}>
                                                        <TableCell className="font-medium">{permission.name}</TableCell>
                                                        <TableCell>{permission.description}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Dialogs */}
            <ManageRoleDialog
                open={manageRoleDialogOpen}
                onOpenChange={setManageRoleDialogOpen}
                roleData={roleFormData ? roleFormData as EditRoleData : undefined}
                permissions={permissions}
                isLoading={isLoadingRoleAction}
                onSubmit={handleRoleSubmit}
            />
            <ManageUserDialog
                open={manageUserDialogOpen}
                onOpenChange={setManageUserDialogOpen}
                newData={userFormData ? userFormData as NewUserData : undefined}
                editData={userFormData ? userFormData as EditUserData : undefined}
                roles={roles}
                isLoading={isLoadingUserAction}
                onSubmit={handleUserSubmit}
            />
        </div>
    );
}