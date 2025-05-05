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
import { Role, User, EditUserData, EditRoleData, Permission } from "@/interface/access-management";

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
    
    useEffect(() => {
        async function fetchData() {
            try {
                const [usersRes, rolesRes, permissionsRes] = await Promise.all([
                    fetch("/api/access-management/users"),
                    fetch("/api/access-management/roles"),
                    fetch("/api/access-management/permissions"),
                ]);
    
                if (!usersRes.ok || !rolesRes.ok || !permissionsRes.ok) {
                    // Attempt to read JSON error if available, fallback to status text
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
                            return fullRole ? { id: fullRole.id, name: fullRole.name, description: fullRole.description, permissions: fullRole.permissions } : null;
                        }).filter(Boolean) as Role[];
                    } else if (user.roleIds) {
                        userRoles = rolesData.filter((role: Role) => user.roleIds.includes(role.id));
                    } else if (user.roles && Array.isArray(user.roles)) {
                        userRoles = user.roles.map((role: any) => ({
                            id: role.id,
                            name: role.name,
                            description: role.description,
                            permissions: role.permissions
                        }))
                    }
                    return {
                        ...user,
                        id: user.id, username: user.username, first_name: user.first_name, last_name: user.last_name, active: user.active,
                        roles: userRoles,
                    } as User;
                });
    
                setUsers(usersWithRoles);
                setRoles(rolesData);
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
        }
        else {
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
                console.log("Submitting update for user:", data);
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
    
                console.log("User updated successfully via API.");
    
                    // Update the user in the local state
                setUsers(prevUsers =>
                    prevUsers.map(u =>
                        u.id === data.id
                            ? {
                                ...u,
                                first_name: data.firstName,
                                last_name: data.lastName,
                                roles: roles.filter(r => data.roleIds.includes(r.id)), // Update roles based on selected IDs
                                active: data.active,
                            }
                            : u
                    )
                );
    
            } else {
                    // It's a create operation
                console.log("Submitting new user:", data);
                 const payload = {
                    username: data.username,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    roles: data.roleIds, // Send role IDs for creation
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
                console.log("API Create User Response:", createdUser);

                    // Add the new user to the local state
                const assignedRoles = roles.filter(role => (createdUser.roles || []).includes(role.id)); // Assuming API returns role IDs on creation
                setUsers(prevUsers => [...prevUsers, {
                    ...createdUser,
                    id: createdUser.id,
                    username: createdUser.username,
                    first_name: createdUser.first_name,
                    last_name: createdUser.last_name,
                    active: createdUser.active,
                    roles: assignedRoles, // Attach the full role objects
                }]);
            }
    
                // Close the dialog and clear the form state
            setManageUserDialogOpen(false);
            setUserFormData(undefined);
    
        } catch (error: any) {
            console.error("Error saving user:", error);
            alert(`Error: ${error.message}`); // Basic error display
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
                // Create mode: Set form data to initial empty state
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
             if (data.id) {
                 // It's an update operation (editing)
                 console.log("Submitting update for role:", data);
                 const response = await fetch(`/api/access-management/roles/${data.id}`, {
                     method: "PATCH",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({
                         name: data.name,
                         description: data.description,
                         permissionIds: data.permissionIds,
                     }),
                 });
    
                 if (!response.ok) {
                     const contentType = response.headers.get("content-type");
                     let errorData: any = { message: `Request failed with status ${response.status}` };
                     if (contentType && contentType.indexOf("application/json") !== -1) {
                         try { errorData = await response.json().catch(() => ({ message: `Failed to parse JSON error (${response.status})` })); } catch (jsonError) { /* ignore parse error */ }
                     }
                     throw new Error(errorData.error || errorData.message || "Failed to update role");
                 }
    
                 const updatedRoleFromApi = await response.json();
                 const finalUpdatedRole: Role = {
                     id: updatedRoleFromApi.id,
                     name: updatedRoleFromApi.name,
                     description: updatedRoleFromApi.description,
                     // When updating local state, use the full permissions list to find the permission objects
                     // based on the permissionIds returned or sent.
                     permissions: permissions.filter(p => (updatedRoleFromApi.permissionIds || []).includes(p.id)),
                 };
    
                 setRoles(prevRoles =>
                     prevRoles.map(r => (r.id === finalUpdatedRole.id ? finalUpdatedRole : r))
                 );
    
             } else {
                 // It's a create operation
                 console.log("Submitting new role:", data);
                  const response = await fetch("/api/access-management/roles", {
                     method: "POST",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({
                         name: data.name,
                         description: data.description,
                         permissionIds: data.permissionIds,
                     }),
                 });
    
                  if (!response.ok) {
                     const contentType = response.headers.get("content-type");
                     let errorData: any = { message: `Request failed with status ${response.status}` };
                     if (contentType && contentType.indexOf("application/json") !== -1) {
                         try { errorData = await response.json().catch(() => ({ message: `Failed to parse JSON error (${response.status})` })); } catch (jsonError) { /* ignore parse error */ }
                     }
                     throw new Error(errorData.error || errorData.message || "Failed to create role");
                 }
    
                 const createdRole = await response.json();
                 console.log("API Create Response:", createdRole);
                 const finalCreatedRole: Role = {
                      id: createdRole.id,
                      name: createdRole.name,
                      description: createdRole.description,
                      permissions: permissions.filter(p => (createdRole.permissionIds || []).includes(p.id)),
                 };
    
    
                 setRoles(prevRoles => [...prevRoles, finalCreatedRole]);
             }
    
             setManageRoleDialogOpen(false);
             setRoleFormData(undefined); // Clear form state
    
         } catch (error: any) {
             console.error("Error saving role:", error);
             alert(`Error: ${error.message}`); // Basic error display
         } finally {
             setIsLoadingRoleAction(false);
         }
       };
    
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    
    const filteredUsers = useMemo(() => {
        if (!searchQuery) {
            return users;
        }
        const lowerCaseQuery = searchQuery.toLowerCase();
        return users.filter(user =>
            user.first_name.toLowerCase().includes(lowerCaseQuery) ||
            user.last_name.toLowerCase().includes(lowerCaseQuery) ||
            user.username.toLowerCase().includes(lowerCaseQuery) ||
            user.roles.some(role => role.name.toLowerCase().includes(lowerCaseQuery))
        );
    }, [users, searchQuery]);
    
    const filteredRoles = useMemo(() => {
        if (!searchQuery) {
            return roles;
        }
        const lowerCaseQuery = searchQuery.toLowerCase();
        return roles.filter(role =>
            role.name.toLowerCase().includes(lowerCaseQuery) ||
            (role.description ?? "").toLowerCase().includes(lowerCaseQuery) ||
            (role.permissions ?? []).some(permission =>
                permission.name.toLowerCase().includes(lowerCaseQuery) ||
                permission.description?.toLowerCase().includes(lowerCaseQuery)
            )
        );
    }, [roles, searchQuery, permissions]);
    
    const filteredPermissions = useMemo(() => {
        if (!searchQuery) {
            return permissions;
        }
        const lowerCaseQuery = searchQuery.toLowerCase();
        return permissions.filter(permission =>
            permission.name.toLowerCase().includes(lowerCaseQuery) ||
            (permission.description ?? "").toLowerCase().includes(lowerCaseQuery)
        );
    }, [permissions, searchQuery]);

    return (
        <div className="flex flex-col min-h-screen">

             <div className="p-6"> 
                 <div className="flex items-center justify-between mb-6">
                     <h1 className="text-3xl font-bold">Access Management</h1>
                 </div>

                 <div className="flex gap-6"> {/* Main flex container */}
                     <div className="w-1/4"> {/* Side navigation */}
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
                                         onClick={() => setActiveCategory("users")}>
                                         <Users className="h-4 w-4 flex-shrink-0" />
                                         <span className="truncate">Users</span>
                                     </button>
                                     <button
                                         className={cn(
                                             "flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors",
                                             activeCategory === "roles" ? "bg-muted text-primary" : ""
                                         )}
                                         onClick={() => setActiveCategory("roles")}>
                                         <UserCog className="h-4 w-4 flex-shrink-0" />
                                         <span className="truncate">Roles</span>
                                     </button>
                                      <button
                                          className={cn(
                                              "flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors",
                                              activeCategory === "permissions" ? "bg-muted text-primary" : ""
                                          )}
                                          onClick={() => setActiveCategory("permissions")}>
                                          <Key className="h-4 w-4 flex-shrink-0" />
                                          <span className="truncate">Permissions</span>
                                      </button>
                                 </div>
                             </CardContent>
                         </Card>
                     </div>

                     <div className="w-3/4"> {/* Main content area */}
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
                                     {/* Add Permission button can be added here if needed */}
                                 </div>
                             </CardHeader>
                             <CardContent>
                                 {activeCategory === "users" && (
                                     <Table>
                                         <TableHeader>
                                             <TableRow>
                                                 <TableHead>Username</TableHead>
                                                 <TableHead>Name</TableHead>
                                                 <TableHead>Roles</TableHead>
                                                 <TableHead>Status</TableHead>
                                                 <TableHead className="text-right">Actions</TableHead>
                                             </TableRow>
                                         </TableHeader>
                                         <TableBody>
                                             {filteredUsers.length > 0 ? (
                                                 filteredUsers.map((user) => (
                                                     <TableRow key={user.id}>
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
                                                         <TableCell className="text-right">
                                                             <Button variant="ghost" size="sm" onClick={() => handleOpenManageUserDialog(user)}>
                                                                 Edit
                                                             </Button>
                                                         </TableCell>
                                                     </TableRow>
                                                 ))
                                             ) : (
                                                 <TableRow>
                                                     <TableCell colSpan={5} className="text-center text-muted-foreground">
                                                         No users found.
                                                     </TableCell>
                                                 </TableRow>
                                             )}
                                         </TableBody>
                                     </Table>
                                 )}

                                 {activeCategory === "roles" && (
                                     <Table>
                                         <TableHeader>
                                             <TableRow>
                                                 <TableHead>Role Name</TableHead>
                                                 <TableHead>Description</TableHead>
                                                 <TableHead>Permissions</TableHead>
                                                 <TableHead className="text-right">Actions</TableHead>
                                             </TableRow>
                                         </TableHeader>
                                         <TableBody>
                                             {filteredRoles.length > 0 ? (
                                                 filteredRoles.map((role) => (
                                                     <TableRow key={role.id}>
                                                         <TableCell>{role.name}</TableCell>
                                                         <TableCell className="text-muted-foreground">{role.description || "-"}</TableCell>
                                                         <TableCell>
                                                             {role.permissions && role.permissions.length > 0 ? (
                                                                 role.permissions.map((permission) => (
                                                                     <Badge key={permission.id} variant="outline" className="mr-1 mb-1">
                                                                         {permission.name}
                                                                     </Badge>
                                                                 ))
                                                             ) : (
                                                                 <span className="text-muted-foreground">No permissions</span>
                                                             )}
                                                         </TableCell>
                                                         <TableCell className="text-right">
                                                             <Button variant="ghost" size="sm" onClick={() => handleOpenManageRoleDialog(role)}>
                                                                 Edit
                                                             </Button>
                                                         </TableCell>
                                                     </TableRow>
                                                 ))
                                             ) : (
                                                 <TableRow>
                                                     <TableCell colSpan={4} className="text-center text-muted-foreground">
                                                         No roles found.
                                                     </TableCell>
                                                 </TableRow>
                                             )}
                                         </TableBody>
                                     </Table>
                                 )}

                                 {activeCategory === "permissions" && (
                                     <Table>
                                         <TableHeader>
                                             <TableRow>
                                                 <TableHead>Permission Name</TableHead>
                                                 <TableHead>Description</TableHead>
                                                 {/* <TableHead className="text-right">Actions</TableHead> */}
                                             </TableRow>
                                         </TableHeader>
                                         <TableBody>
                                             {filteredPermissions.length > 0 ? (
                                                 filteredPermissions.map((permission) => (
                                                     <TableRow key={permission.id}>
                                                         <TableCell>{permission.name}</TableCell>
                                                         <TableCell className="text-muted-foreground">{permission.description || "-"}</TableCell>
                                                         {/* <TableCell className="text-right">
                                                             <Button variant="ghost" size="sm">Edit</Button> 
                                                         </TableCell> */}
                                                     </TableRow>
                                                 ))
                                             ) : (
                                                 <TableRow>
                                                     <TableCell colSpan={3} className="text-center text-muted-foreground">
                                                         No permissions found.
                                                     </TableCell>
                                                 </TableRow>
                                             )}
                                         </TableBody>
                                     </Table>
                                 )}
                             </CardContent>
                         </Card>
                     </div>
                 </div>
             </div>

            {/* Manage User Dialog */}
            {manageUserDialogOpen && userFormData && (
                <ManageUserDialog
                    open={manageUserDialogOpen}
                    onOpenChange={() => {
                        setManageUserDialogOpen(false);
                        setUserFormData(undefined); // Clear form data on close
                    }}
                    onSubmit={handleUserSubmit}
                    newData={userFormData}
                    roles={roles} // Pass the full list of roles
                    isLoading={isLoadingUserAction}
                />
            )}

            {/* Manage Role Dialog */}
            {manageRoleDialogOpen && roleFormData && (
                <ManageRoleDialog
                    open={manageRoleDialogOpen}
                    onOpenChange={() => {
                        setManageRoleDialogOpen(false);
                        setRoleFormData(undefined); // Clear form data on close
                    }}
                    onSubmit={handleRoleSubmit}
                    roleData={roleFormData}
                    permissions={permissions} // Pass the full list of permissions
                    isLoading={isLoadingRoleAction}
                />
            )}
        </div>
    );
}