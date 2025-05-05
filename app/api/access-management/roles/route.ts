import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role, Permission } from "@/interface/access-management"

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
<<<<<<< HEAD
      where: {
        name: {
          not: 'SuperAdmin' // Exclude the SuperAdmin role
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        RolePermission: {
          include: {
            permission: true,
          },
        },
      },
    });

    const formattedRoles: Role[] = roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.RolePermission.map(rp => rp.permission as Permission)
    }));
=======
            select: {
                id: true,
                name: true,
                description: true,
                RolePermission: {
                  include: {
                    permission: true,
                },
              },
            },
          });

      const formattedRoles: Role[] = roles.map(role => ({
                id: role.id,
                name: role.name,
                description: role.description,
              permissions: role.RolePermission.map(rp => rp.permission as Permission)
            }));
>>>>>>> f97a68764c29344a2c4ee239789c2809c8e60d8d

    return NextResponse.json(formattedRoles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json({ error: "Failed to fetch roles with permissions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, permissionIds } = body;

    // Basic validation
    if (!name) {
      return NextResponse.json({ error: "Role name is required" }, { status: 400 });
    }

    // Create the role and potentially link permissions in a transaction
    const newRole = await prisma.$transaction(async (tx) => {
      const role = await tx.role.create({
        data: {
          name,
          description: description || "",
        },
      });

      if (permissionIds && Array.isArray(permissionIds) && permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: permissionIds.map((permissionId: string) => ({
            roleId: role.id,
            permissionId: permissionId,
          })),
        });
      }

      const roleWithPermissions = await tx.role.findUnique({
        where: { id: role.id },
        include: {
          RolePermission: {
            include: {
              permission: true,
            },
          },
        },
      });

      return {
        ...roleWithPermissions,
        permissions: roleWithPermissions?.RolePermission.map(rp => rp.permission) || []
      };
    });

    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json({ error: "Failed to create role" }, { status: 500 });
  }
}
