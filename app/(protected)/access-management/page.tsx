"use client"

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, Plus } from "lucide-react";

import { ManageUserDialog } from "@/components/AccessManagementComponents/UsersComponent/ManageUserDialog";
import { ManageRoleDialog } from "@/components/AccessManagementComponents/RolesComponent/ManageRoleDialog";
import { Role, User, EditUserData, EditRoleData, Permission } from "@/interface/access-management";
import { PageHeader } from "@/components/LayoutComponents/page-header";

import { AccessCategoryNav } from "@/components/AccessManagementComponents/AccessCategoryNav";
import { UsersTable } from "@/components/AccessManagementComponents/UsersTable";
import { RolesTable } from "@/components/AccessManagementComponents/RolesTable";
import { PermissionsTable } from "@/components/AccessManagementComponents/PermissionsTable";

export default function AccessManagementPage() {
    const [activeCategory, setActiveCategory] = useState("users");
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [manageUserDialogOpen, setManageUserDialogOpen] = useState(false);
    const [userFormData, setUserFormData] = useState<EditUserData | undefined>(undefined);
    const [isLoadingUserAction, setIsLoadingUserAction] = useState(false);
    const [manageRoleDialogOpen, setManageRoleDialogOpen] = useState(false);
    const [roleFormData, setRoleFormData] = useState<EditRoleData | undefined>(undefined);
    const [isLoadingRoleAction, setIsLoadingRoleAction] = useState(false);
    const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const [usersRes, rolesRes, permissionsRes] = await Promise.all([
                    fetch("/api/access-management/users"),
                    fetch("/api/access-management/roles"),
                    fetch("/api/access-management/permissions"),
                ]);
    
                if (!usersRes.ok || !rolesRes.ok || !permissionsRes.ok) {
                    const usersError = !usersRes.ok ? await usersRes.json().catch(() => ({ message: `Failed to fetch users (${usersRes.status})` })) : null;
                    const rolesError = !rolesRes.ok ? await rolesRes.json().catch(() => ({ message: `Failed to fetch roles (${rolesRes.status})` })) : null;
                    const permissionsError = !permissionsRes.ok ? await permissionsRes.json().catch(() => ({ message: `Failed to fetch permissions (${permissionsRes.status})` })) : null;    
                    const errorMessage = [usersError?.message, rolesError?.message, permissionsError?.message]
                            .filter(Boolean).join("; ") || "Failed to fetch access management data";
                    throw new Error(errorMessage);
                }

                const usersData = await usersRes.json();
                const rolesData = await rolesRes.json();
                const permissionsData = await permissionsRes.json();

                const usersWithRoles: User[] = usersData.map((user: any) => {
                    let userRoles: Role[] = [];
                    if (user.UserRole && Array.isArray(user.UserRole)) {
                        userRoles = user.UserRole.map((ur: any) => {
                            const fullRole = rolesData.find((r: Role) => r.id === ur.roleId);
                            // Map permissions for the role if found
                            const rolePermissions = fullRole ? permissionsData.filter((p: Permission) => (fullRole.permissionIds || []).includes(p.id)) : [];
                            return fullRole ? { id: fullRole.id, name: fullRole.name, description: fullRole.description, permissions: rolePermissions } : null;
                        }).filter(Boolean) as Role[];
                    } else if (user.roleIds) { 
                        userRoles = rolesData
                            .filter((role: any) => user.roleIds.includes(role.id))
                            .map((role: any) => ({
                                ...role,
                                permissions: permissionsData.filter((p: Permission) => (role.permissionIds || []).includes(p.id))
                            }));
                    } else if (user.roles && Array.isArray(user.roles)) { 
                         userRoles = user.roles.map((role: any) => ({
                            id: role.id,
                            name: role.name,
                            description: role.description,
                            permissions: permissionsData.filter((p: Permission) => (role.permissionIds || []).includes(p.id))
                        }))
                    }
                    return {
                        ...user,
                        id: user.id, username: user.username, first_name: user.first_name, last_name: user.last_name, active: user.active,
                        roles: userRoles,
                    } as User;
                });
    
                setUsers(usersWithRoles);
                setRoles(rolesData.map((rawRole: any) => ({ 
                    id: rawRole.id,
                    name: rawRole.name,
                    description: rawRole.description,
                    permissions: permissionsData.filter((p: Permission) => (rawRole.permissionIds || []).includes(p.id))
                } as Role)));
                setPermissions(permissionsData);
    
            } catch (err: any) {
                console.error("Error fetching access management data", err);
                alert(`Failed to load data: ${err.message}`);
            }
        }
    
        fetchData();
    }, []);

    const handleOpenManageUserDialog = (user?: User) => {
        if (user) {
            setUserFormData({
                id: user.id,
                username: user.username,
                firstName: user.first_name,
                lastName: user.last_name,
                roleIds: user.roles.map(role => role.id),
                active: user.active,
            });
        } else {
            setUserFormData({
                username: "",
                firstName: "",
                lastName: "",
                roleIds: [],
                active: true,
                password: "",
            });
        }
        setManageUserDialogOpen(true);
    };
    
    const handleUserSubmit = async (data: EditUserData) => {
        setIsLoadingUserAction(true);
        try {
            if (data.id) {
                const payload = {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    roleIds: data.roleIds,
                    active: data.active,
                    password: data.password, 
                };
                const response = await fetch(`/api/access-management/users/${data.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
    
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `Failed to update user (${response.status})` }));
                    throw new Error(errorData.error || errorData.message || "Failed to update user");
                }
    
                setUsers(prevUsers =>
                    prevUsers.map(u =>
                        u.id === data.id
                            ? {
                                ...u,
                                first_name: data.firstName,
                                last_name: data.lastName,
                                roles: roles.filter(r => data.roleIds.includes(r.id)),
                                active: data.active,
                            }
                            : u
                    )
                );
    
            } else {
                 const payload = {
                    username: data.username,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    roles: data.roleIds, 
                    active: data.active,
                    password: data.password,
                };
                const response = await fetch("/api/access-management/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
    
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: `Failed to create user (${response.status})` }));
                    throw new Error(errorData.error || errorData.message || "Failed to create user");
                }
    
                const createdUser = await response.json();
                const assignedRoles = roles.filter(role => (createdUser.roleIds || createdUser.roles || []).includes(role.id));
                setUsers(prevUsers => [...prevUsers, {
                    ...createdUser,
                    id: createdUser.id, 
                    username: createdUser.username,
                    first_name: createdUser.first_name,
                    last_name: createdUser.last_name,
                    active: createdUser.active,
                    roles: assignedRoles,
                }]);
            }
            
            setManageUserDialogOpen(false);
            setUserFormData(undefined);
    
        } catch (error: any) {
            console.error("Error saving user:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsLoadingUserAction(false);
        }
    };
    
    const handleOpenManageRoleDialog = (role?: Role) => {
        if (role) {
          setRoleFormData({
                id: role.id,
                name: role.name,
                description: role.description ?? "",
                permissionIds: role.permissions ? role.permissions.map(p => p.id) : [],
            });
        } else {
            setRoleFormData({
                name: "",
                description: "",
                permissionIds: [],
            });
        }
        setManageRoleDialogOpen(true);
    };
    
    const handleRoleSubmit = async (data: EditRoleData) => {
         setIsLoadingRoleAction(true);
         try {
             const payload = {
                 name: data.name,
                 description: data.description,
                 permissionIds: data.permissionIds,
             };
             const url = data.id ? `/api/access-management/roles/${data.id}` : "/api/access-management/roles";
             const method = data.id ? "PATCH" : "POST";

             const response = await fetch(url, {
                 method: method,
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify(payload),
             });

             if (!response.ok) {
                 const errorData = await response.json().catch(() => ({ message: `Request failed (${response.status})` }));
                 throw new Error(errorData.error || errorData.message || `Failed to ${data.id ? 'update' : 'create'} role`);
             }

             const savedRoleFromApi = await response.json();
             const finalSavedRole: Role = {
                 id: savedRoleFromApi.id,
                 name: savedRoleFromApi.name,
                 description: savedRoleFromApi.description,
                 permissions: permissions.filter(p => (savedRoleFromApi.permissionIds || data.permissionIds).includes(p.id)),
             };

             if (data.id) {
                 setRoles(prevRoles => prevRoles.map(r => (r.id === finalSavedRole.id ? finalSavedRole : r)));
             } else {
                 setRoles(prevRoles => [...prevRoles, finalSavedRole]);
             }
    
             setManageRoleDialogOpen(false);
             setRoleFormData(undefined);
    
         } catch (error: any) {
             console.error("Error saving role:", error);
             alert(`Error: ${error.message}`);
         } finally {
             setIsLoadingRoleAction(false);
         }
       };
    
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleToggleRoleExpand = (roleId: string) => {
        setExpandedRoleId(prevId => (prevId === roleId ? null : roleId));
    };
    
    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return users.filter(user =>
            user.first_name.toLowerCase().includes(lowerCaseQuery) ||
            user.last_name.toLowerCase().includes(lowerCaseQuery) ||
            user.username.toLowerCase().includes(lowerCaseQuery) ||
            user.roles.some(role => role.name.toLowerCase().includes(lowerCaseQuery))
        );
    }, [users, searchQuery]);

    const filteredRoles = useMemo(() => {
        if (!searchQuery) return roles;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return roles.filter(role =>
            role.name.toLowerCase().includes(lowerCaseQuery) ||
            (role.description ?? "").toLowerCase().includes(lowerCaseQuery) ||
            (role.permissions?.some(p => p.name.toLowerCase().includes(lowerCaseQuery)))
        );
    }, [roles, searchQuery]);
    
    const filteredPermissions = useMemo(() => {
        if (!searchQuery) return permissions;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return permissions.filter(permission =>
            permission.name.toLowerCase().includes(lowerCaseQuery) ||
            (permission.description ?? "").toLowerCase().includes(lowerCaseQuery)
        );
    }, [permissions, searchQuery]);

    return (
        <div> 
            <PageHeader/>
            <div className="flex gap-6">
                <div className="w-1/4">
                    <AccessCategoryNav activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
                </div>
                <div className="w-3/4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="capitalize">{activeCategory}</CardTitle>
                                <CardDescription>
                                    Manage {activeCategory === "users" ? "system users" : activeCategory === "roles" ? "user roles" : "access permissions"}.
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search..."
                                        className="pl-8 w-64"
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                    />
                                </div>
                                {activeCategory === "users" && (
                                    <Button size="sm" onClick={() => handleOpenManageUserDialog()}>
                                        <UserPlus className="mr-2 h-4 w-4" /> Add User
                                    </Button>
                                )}
                                {activeCategory === "roles" && (
                                    <Button size="sm" onClick={() => handleOpenManageRoleDialog()}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Role
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {activeCategory === "users" && (
                                <UsersTable users={filteredUsers} onRowClick={handleOpenManageUserDialog} />
                            )}
                            {activeCategory === "roles" && (
                                <RolesTable
                                    roles={filteredRoles}
                                    onRowClick={handleOpenManageRoleDialog}
                                    expandedRoleId={expandedRoleId}
                                    onToggleExpand={handleToggleRoleExpand}
                                />
                            )}
                            {activeCategory === "permissions" && (
                                <PermissionsTable permissions={filteredPermissions} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            {manageUserDialogOpen && (
                <ManageUserDialog
                    isOpen={manageUserDialogOpen}
                    onOpenChange={() => {
                        setManageUserDialogOpen(false);
                        setUserFormData(undefined);
                    }}
                    onSubmit={handleUserSubmit}
                    userData={userFormData}
                    roles={roles} 
                    isLoading={isLoadingUserAction}
                />
            )}
            {manageRoleDialogOpen && roleFormData && ( 
                <ManageRoleDialog
                    open={manageRoleDialogOpen}
                    onOpenChange={() => {
                        setManageRoleDialogOpen(false);
                        setRoleFormData(undefined);
                    }}
                    onSubmit={handleRoleSubmit}
                    roleData={roleFormData}
                    permissions={permissions} 
                    isLoading={isLoadingRoleAction}
                />
            )}
        </div>
    );
}
