import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { predefinedPermissions } from '../lib/permissions';

const prisma = new PrismaClient();

async function main() {
  // Create permissions from the predefined list
  const createdPermissions = [];
  for (const permDef of predefinedPermissions) {
    const permission = await prisma.permission.upsert({
      where: { name: permDef.name },
      update: { description: permDef.description },
      create: {
        name: permDef.name,
        description: permDef.description
      }
    });
    createdPermissions.push(permission);
    console.log(`Upserted permission: ${permission.name}`);
  }

  const manageUsersPerm = createdPermissions.find(p => p.name === 'ManageUsers');
  const manageRolesPerm = createdPermissions.find(p => p.name === 'ManageRoles');

  const role = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Administrator role'
    }
  });
  console.log(`Upserted role: ${role.name}`);

  // Link permissions to role via RolePermission
  if (manageUsersPerm) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: role.id, permissionId: manageUsersPerm.id } },
      update: {},
      create: { roleId: role.id, permissionId: manageUsersPerm.id }
    });
    console.log(`Linked permission ${manageUsersPerm.name} to role ${role.name}`);
  }

  if (manageRolesPerm) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: role.id, permissionId: manageRolesPerm.id } },
      update: {},
      create: { roleId: role.id, permissionId: manageRolesPerm.id }
    });
    console.log(`Linked permission ${manageRolesPerm.name} to role ${role.name}`);
  }
  // Add logic to link other permissions as needed

  const user = await prisma.user.upsert({
    where: { username: 'asd_admin' },
    update: {},
    create: {
      username: 'asd_admin',
      password: await bcrypt.hash('admin123', 10),
      first_name: 'Admin',
      last_name: 'User',
      active: true
    }
  });
  console.log(`Upserted user: ${user.username}`);

  // Connect user to role via UserRole
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: role.id } },
    update: {},
    create: { userId: user.id, roleId: role.id }
  });
  console.log(`Linked user ${user.username} to role ${role.name}`);

  console.log('Seeding finished.');
}

main()
  .catch(e => {
    console.error("Error during seeding:", e); // Log errors properly
    process.exit(1); // Exit with error code
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
