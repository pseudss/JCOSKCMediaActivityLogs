export interface User {
    id: number
    name: string
    email: string
    role: string
    status: string
    last_login: string
  }
  
  export interface Role {
    id: number
    name: string
    users: number
    permissions: number
  }
  
  export interface Permission {
    id: number
    name: string
    description: string
    roles: string[]
  }
  
  export const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "Active",
      last_login: "2023-03-15 09:45 AM",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
      status: "Active",
      last_login: "2023-03-14 02:30 PM",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "User",
      status: "Inactive",
      last_login: "2023-02-28 11:20 AM",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Manager",
      status: "Active",
      last_login: "2023-03-15 10:15 AM",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "User",
      status: "Active",
      last_login: "2023-03-13 04:50 PM",
    },
  ]
  
  export const roles: Role[] = [
    { id: 1, name: "Admin", users: 2, permissions: 15 },
    { id: 2, name: "Manager", users: 5, permissions: 10 },
    { id: 3, name: "User", users: 25, permissions: 5 },
    { id: 4, name: "Viewer", users: 8, permissions: 3 },
  ]
  
  export const permissions: Permission[] = [
    {
      id: 1,
      name: "View Employees",
      description: "Can view employee records",
      roles: ["Admin", "Manager", "User", "Viewer"],
    },
    { id: 2, name: "Edit Employees", description: "Can edit employee records", roles: ["Admin", "Manager"] },
    { id: 3, name: "Delete Employees", description: "Can delete employee records", roles: ["Admin"] },
    { id: 4, name: "View Payroll", description: "Can view payroll information", roles: ["Admin", "Manager"] },
    { id: 5, name: "Process Payroll", description: "Can process payroll", roles: ["Admin"] },
    { id: 6, name: "Manage Users", description: "Can manage system users", roles: ["Admin"] },
    { id: 7, name: "View Reports", description: "Can view system reports", roles: ["Admin", "Manager", "User"] },
  ]
  
  