"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Search, Filter, Users, Key, Plus, UserCog } from "lucide-react"
import { users, roles, permissions } from "@/lib/access_management"

export default function AccessManagementPage() {
  const [activeCategory, setActiveCategory] = useState("users")

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Access Management</h1>
      </div>

      <div className="flex gap-6">
        {/* Left sidebar */}
        <div className="w-1/4">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col w-full">
                <button
                  className={`flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors ${activeCategory === "users" ? "bg-muted text-primary" : ""}`}
                  onClick={() => setActiveCategory("users")}
                >
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Users</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors ${activeCategory === "roles" ? "bg-muted text-primary" : ""}`}
                  onClick={() => setActiveCategory("roles")}
                >
                  <UserCog className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Roles</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-muted transition-colors ${activeCategory === "permissions" ? "bg-muted text-primary" : ""}`}
                  onClick={() => setActiveCategory("permissions")}
                >
                  <Key className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Permissions</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right content area */}
        <div className="w-3/4">
          {activeCategory === "users" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage system users and their access</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add New User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>Create a new user account with appropriate access rights.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="John" />
                        </div>
                        <div>
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Select>
                            <SelectTrigger id="role">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="status">Status</Label>
                          <Select defaultValue="active">
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="password">Temporary Password</Label>
                        <Input id="password" type="password" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="send-email" />
                        <Label htmlFor="send-email">Send welcome email with login instructions</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-6">
                  <div className="font-medium mb-2">User accounts provide access to the system.</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create user accounts for employees who need system access.</li>
                    <li>Assign appropriate roles to control what users can see and do.</li>
                    <li>Regularly review user accounts and disable access when no longer needed.</li>
                  </ul>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search users..." className="pl-8" />
                  </div>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell>{user.last_login}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Reset Password
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              {user.status === "Active" ? "Disable" : "Enable"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeCategory === "roles" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Role Management</CardTitle>
                  <CardDescription>Manage user roles and permissions</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Create New Role</DialogTitle>
                      <DialogDescription>Define a new role with specific permissions.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <Label htmlFor="role-name">Role Name</Label>
                        <Input id="role-name" placeholder="e.g. Department Manager" />
                      </div>
                      <div>
                        <Label htmlFor="role-description">Description</Label>
                        <Input id="role-description" placeholder="e.g. Manages department-level operations" />
                      </div>
                      <div>
                        <Label className="mb-2 block">Permissions</Label>
                        <div className="space-y-2 border rounded-md p-4 max-h-60 overflow-y-auto">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox id={`permission-${permission.id}`} />
                              <Label htmlFor={`permission-${permission.id}`} className="flex-1">
                                <span className="font-medium">{permission.name}</span>
                                <span className="text-sm text-muted-foreground block">{permission.description}</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Role</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-6">
                  <div className="font-medium mb-2">Roles define what users can do in the system.</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create roles that match job responsibilities in your organization.</li>
                    <li>Assign permissions to roles to control access to features and data.</li>
                    <li>Assign users to appropriate roles rather than individual permissions.</li>
                  </ul>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search roles..." className="pl-8" />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Role Name</TableHead>
                        <TableHead>Users</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roles.map((role) => (
                        <TableRow key={role.id}>
                          <TableCell>{role.id}</TableCell>
                          <TableCell>{role.name}</TableCell>
                          <TableCell>{role.users}</TableCell>
                          <TableCell>{role.permissions}</TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[625px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Role: {role.name}</DialogTitle>
                                  <DialogDescription>Modify role details and permissions.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div>
                                    <Label htmlFor="edit-role-name">Role Name</Label>
                                    <Input id="edit-role-name" defaultValue={role.name} />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-role-description">Description</Label>
                                    <Input id="edit-role-description" defaultValue={`${role.name} role description`} />
                                  </div>
                                  <div>
                                    <Label className="mb-2 block">Permissions</Label>
                                    <div className="space-y-2 border rounded-md p-4 max-h-60 overflow-y-auto">
                                      {permissions.map((permission) => (
                                        <div key={permission.id} className="flex items-center space-x-2">
                                          <Checkbox
                                            id={`edit-permission-${permission.id}`}
                                            defaultChecked={permission.roles.includes(role.name)}
                                          />
                                          <Label htmlFor={`edit-permission-${permission.id}`} className="flex-1">
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
                                  <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm">
                              View Users
                            </Button>
                            {role.name !== "Admin" && (
                              <Button variant="ghost" size="sm" className="text-red-500">
                                Delete
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeCategory === "permissions" && (
            <Card>
              <CardHeader>
                <CardTitle>Permission Management</CardTitle>
                <CardDescription>Configure system permissions and access controls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-6">
                  <div className="font-medium mb-2">Permissions control access to system features.</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Permissions are assigned to roles, not directly to users.</li>
                    <li>Review permission assignments to ensure proper security.</li>
                    <li>System permissions are predefined and cannot be created or deleted.</li>
                  </ul>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search permissions..." className="pl-8" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by module" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Modules</SelectItem>
                      <SelectItem value="employees">Employees</SelectItem>
                      <SelectItem value="payroll">Payroll</SelectItem>
                      <SelectItem value="reports">Reports</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Permission Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Assigned Roles</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell>{permission.id}</TableCell>
                          <TableCell>{permission.name}</TableCell>
                          <TableCell>{permission.description}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {permission.roles.map((role) => (
                                <Badge key={role} variant="outline">
                                  {role}
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
        </div>
      </div>
    </div>
  )
}

