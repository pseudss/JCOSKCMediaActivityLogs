import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Clean up existing data
    await prisma.rolePermission.deleteMany({});
    await prisma.permission.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});

    // Seed Roles
    const adminRole = await prisma.role.upsert({
        where: {name: "Admin"},
        update: {},
        create: {
            name: "Admin",
            description: "Administrator role with full permissions",
        },
    });

    const userRole = await prisma.role.upsert({
        where: {name: "User"},
        update: {},
        create: {
            name: "User",
            description: "Default user role with limited permissions",
        },
    });

    // Seed Permissions
    const manageUsersPermission = await prisma.permission.create({
        data: {
            name: "Manage Users",
            description: "Permission to manage users",
        },
    });

    // Assign Permissions to Roles
    await prisma.rolePermission.create({
        data: {
            roleId: adminRole.id,
            permissionId: manageUsersPermission.id,
        },
    });

    // Seed Users
    const hashedPassword = await bcrypt.hash("@dminp@ssw0rd", 10);

    // Create Admin User
    const adminUser = await prisma.user.create({
        data: {
            username: "asd_admin",
            password: hashedPassword,
            firstName: "System",
            lastName: "Administrator",
            email: "admin@example.com",
            UserRole: {
                create: {
                    roleId: adminRole.id
                }
            }
        },
    });

    console.log("Admin user seeded!");

    // Create Non-Admin User
    const nonAdminUser = await prisma.user.create({
        data: {
            username: "asd_user",
            password: hashedPassword, // Hash the password
            firstName: "User",
            lastName: "Only",
            email: "user@example.com",
            UserRole: {
                create: {
                    roleId: userRole.id // Assign the user role
                }
            }
        },
    });

    console.log("Non-admin user seeded!");
}

main()
    .catch((e) => {
        console.error("Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
