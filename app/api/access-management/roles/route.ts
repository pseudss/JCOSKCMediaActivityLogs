import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role, Permission } from "@/interface/access-management"
import { Prisma } from "@/prisma/generated/client";

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      where: {
        name: {
          not: 'SuperAdmin'
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        rolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    const formattedRoles: Role[] = roles.map((role: any) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.rolePermissions.map((rp: { permission: Permission }) => rp.permission)
    }));

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

    if (!name) {
      return NextResponse.json({ error: "Role name is required" }, { status: 400 });
    }
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
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      });
      
      const permissions = roleWithPermissions?.rolePermissions.map(
        (rp: { permission: any }) => rp.permission
      ) || [];

      return {
        ...roleWithPermissions,
        permissions,
      };
    });

    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error("Error creating role:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ error: `A role with the name '${name}' already exists.` }, { status: 409 });
      }
    }
    return NextResponse.json({ error: "Failed to create role" }, { status: 500 });
  }
}
