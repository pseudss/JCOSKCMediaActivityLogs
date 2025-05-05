import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// --- IMPORTANT FOR FIRST-TIME USERS --- 
// This script seeds the database with initial data like permissions, roles, and default users.
// It's crucial for setting up the application's access control.
// Run this script using 'npx prisma db seed' after setting up your database connection.
// Make sure to change the default passwords for the seeded users for security!

// Define your application's permissions here
const permissionsToSeed = [
  // User Management
  { name: 'manage_users', description: 'Full control over users (create, read, update, delete)' },
  { name: 'read_users', description: 'View user list and details' },
  { name: 'create_users', description: 'Add new users' },
  { name: 'update_users', description: 'Modify existing user details' },
  { name: 'delete_users', description: 'Remove users' },

  // Role Management
  { name: 'manage_roles', description: 'Full control over roles and their permissions' },
  { name: 'read_roles', description: 'View role list and details' },
  { name: 'create_roles', description: 'Add new roles' },
  { name: 'update_roles', description: 'Modify existing roles' },
  { name: 'delete_roles', description: 'Remove roles' },

  // Permission Management (usually admin only)
  { name: 'manage_permissions', description: 'Full control over permissions (typically for seeding/dev)' },

  // Employee Management
  { name: 'manage_employees', description: 'Full control over employee records' },
  { name: 'read_employees', description: 'View employee list and details' },
  { name: 'create_employees', description: 'Add new employee records' },
  { name: 'update_employees', description: 'Modify existing employee records' },
  { name: 'delete_employees', description: 'Remove employee records' },

  // Applicant Management
  { name: 'manage_applicants', description: 'Full control over applicants' },
  { name: 'read_applicants', description: 'View applicant list and details' },

  // Plantilla Management
  { name: 'manage_plantilla', description: 'Full control over plantilla items' },
  { name: 'read_plantilla', description: 'View plantilla details' },

  // Payroll Management
  { name: 'manage_payroll', description: 'Full control over payroll processing' },
  { name: 'read_payroll', description: 'View payroll information' },

  // Leave Administration
  { name: 'manage_leave', description: 'Full control over leave administration' },
  { name: 'read_leave', description: 'View leave information' },

  // Training Administration
  { name: 'manage_training', description: 'Full control over training administration' },
  { name: 'read_training', description: 'View training information' },

  // Reports
  { name: 'read_reports', description: 'Generate and view reports' },

  // Library Management
  { name: 'manage_library', description: 'Full control over library items' },
  { name: 'read_library', description: 'View library items' },

  // Profile Management (Self)
  { name: 'manage_profile', description: 'Update own user profile' },
];

async function main() {
  console.log(`Start seeding permissions...`);
  const createdPermissionsMap = new Map<string, { id: string; name: string }>();
  for (const p of permissionsToSeed) {
    const permission = await prisma.permission.upsert({
      where: { name: p.name },
      update: { description: p.description },
      create: { name: p.name, description: p.description },
    });
    createdPermissionsMap.set(permission.name, permission);
    console.log(`Upserted permission: ${permission.name}`);
  }
  console.log(`Finished seeding permissions.`);

  // --- Role and User Seeding Logic ---
  console.log(`Start seeding roles and users...`);

  // --- Upsert SuperAdmin Role ---
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SuperAdmin' }, 
    update: {},
    create: {
      name: 'SuperAdmin',
      description: 'Super Administrator role with unrestricted access',
    },
  });
  console.log(`Upserted role: ${superAdminRole.name}`);

  // --- Assign ALL permissions to SuperAdmin role ---
  console.log(`Assigning all permissions to ${superAdminRole.name} role...`);
  for (const permission of createdPermissionsMap.values()) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: superAdminRole.id, permissionId: permission.id } },
      update: {},
      create: { roleId: superAdminRole.id, permissionId: permission.id },
    });
  }
  console.log(`Finished assigning permissions to ${superAdminRole.name} role.`);

  // --- Upsert SuperAdmin User ---
  const superAdminUser = await prisma.user.upsert({
    where: { username: 'asd_admin' }, 
    update: {},
    create: {
      username: 'asd_admin',
      password: await bcrypt.hash('admin123', 12), // <<< SET A STRONG, UNIQUE PASSWORD HERE
      first_name: 'System',
      last_name: 'Admin',
      active: true,
      isTemporaryPassword: false,
      isSystemUser: true, // Flag for system-level admin
    },
  });
  console.log(`Upserted user: ${superAdminUser.username}`);

  // --- Link SuperAdmin User to SuperAdmin Role ---
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: superAdminUser.id, roleId: superAdminRole.id } },
    update: {},
    create: { userId: superAdminUser.id, roleId: superAdminRole.id },
  });
  console.log(`Linked user ${superAdminUser.username} to role ${superAdminRole.name}`);

  // --- Upsert Admin Role ---
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator role with broad access',
    },
  });
  console.log(`Upserted role: ${adminRole.name}`);

  console.log(`Assigning permissions to ${adminRole.name} role...`);
  for (const permission of createdPermissionsMap.values()) {
    // Exclude specific high-level permissions if needed for the regular Admin
    if (permission.name !== 'manage_permissions') { 
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: adminRole.id, permissionId: permission.id } },
        update: {},
        create: { roleId: adminRole.id, permissionId: permission.id },
      });
    }
  }
  console.log(`Finished assigning permissions to ${adminRole.name} role.`);

  // --- Upsert Admin User ---
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin_user' }, 
    update: {},
    create: {
      username: 'admin_user',
      password: await bcrypt.hash('admin123', 10), // <<< SET A STRONG, UNIQUE PASSWORD HERE
      first_name: 'Regular',
      last_name: 'Admin',
      active: true,
      isTemporaryPassword: false,
      isSystemUser: false, // Regular user
    },
  });
  console.log(`Upserted user: ${adminUser.username}`);

  // --- Link Admin User to Admin Role ---
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
    update: {},
    create: { userId: adminUser.id, roleId: adminRole.id },
  });
  console.log(`Linked user ${adminUser.username} to role ${adminRole.name}`);


  // --- Upsert Standard User Role ---
  const userRole = await prisma.role.upsert({
      where: { name: 'User' },
      update: {},
      create: {
          name: 'User',
          description: 'Standard user role with basic access',
      },
  });
  console.log(`Upserted role: ${userRole.name}`);

  // --- Assign specific permissions to 'User' role ---
  const userPermissions = ['read_employees', 'read_plantilla', 'read_leave', 'read_training', 'manage_profile'];
  console.log(`Assigning permissions to ${userRole.name} role...`);
  for (const permName of userPermissions) {
      const permission = createdPermissionsMap.get(permName);
      if (permission) {
          await prisma.rolePermission.upsert({
              where: { roleId_permissionId: { roleId: userRole.id, permissionId: permission.id } },
              update: {},
              create: { roleId: userRole.id, permissionId: permission.id },
          });
      } else {
          console.warn(`Warning: Permission '${permName}' not found for User role.`);
      }
  }
  console.log(`Finished assigning permissions to ${userRole.name} role.`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
