export interface PermissionDefinition {
  name: string;
  description: string;
}

export const predefinedPermissions: PermissionDefinition[] = [
  {
    name: 'ManageUsers',
    description: 'Permission to manage users (create, edit, delete, enable/disable)'
  },
  {
    name: 'ManageRoles',
    description: 'Permission to manage roles (create, edit, assign permissions)'
  },
  {
    name: 'ViewDashboard',
    description: 'Permission to view the main dashboard'
  },
  {
    name: 'ManageSettings',
    description: 'Permission to access and modify system settings'
  },
  {
    name: 'ViewReports',
    description: 'Permission to view reports and analytics'
  },
  {
    name: 'ManagePermissions',
    description: 'Permission to manage permissions (create, edit, delete)'
  }
];