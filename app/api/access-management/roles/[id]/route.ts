import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request, 
  context: any
) {
  const roleId = context.params.id;

  try {
    if (!roleId) {
      return NextResponse.json({ error: 'Role ID is required in the URL' }, { status: 400 });
    }

    const body = await req.json();
    const { name, description, permissionIds } = body;

    const updatedRole = await prisma.$transaction(async (tx) => {
      const roleUpdateData: { name?: string; description?: string } = {};
      if (name !== undefined) roleUpdateData.name = name;
      if (description !== undefined) roleUpdateData.description = description;

      if (Object.keys(roleUpdateData).length > 0) {
        await tx.role.update({
          where: { id: roleId },
          data: roleUpdateData,
        });
      }

      if (permissionIds !== undefined) {
        await tx.rolePermission.deleteMany({
          where: { roleId },
        });

        if (permissionIds.length > 0) {
          await tx.rolePermission.createMany({
            data: permissionIds.map((permissionId: number) => ({
              roleId,
              permissionId,
            })),
          });
        }
      }

      const finalRole = await tx.role.findUnique({
        where: { id: roleId },
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      });

      if (!finalRole) {
        throw new Error("Role not found after update attempt.");
      }

      return {
        ...finalRole,
        permissions: finalRole.rolePermissions.map((rp) => rp.permission) || []
      };
    });

    return NextResponse.json(updatedRole);

  } catch (error: any) {
    console.error("Error updating role:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Role name already exists" }, { status: 409 });
    }
    if (error.code === 'P2025' || error.message === "Role not found after update attempt.") {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}
