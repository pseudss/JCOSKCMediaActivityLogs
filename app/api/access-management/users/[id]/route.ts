import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  try {
    if (!userId) {
       return NextResponse.json({ error: 'User ID is required in the URL' }, { status: 400 });
    }

    const body = await request.json();
    const {
      username,
      first_name,
      last_name,
      roleIds,
      active,
      password
    } = body;

    const updateData: any = {};
    if (username !== undefined) updateData.username = username;
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (active !== undefined) updateData.active = active;

    if (password !== undefined && password !== null && password !== '') {
      if (typeof password !== 'string') {
           return NextResponse.json({ error: 'Password must be a string if provided' }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    if (roleIds !== undefined) {
        if (!Array.isArray(roleIds)) {
            return NextResponse.json({ error: 'roleIds must be an array of role IDs' }, { status: 400 });
        }

       const formattedUser = await prisma.$transaction(async (tx) => {
           const existingUserRoles = await tx.userRole.findMany({
               where: { userId: userId },
               select: { roleId: true }
           });
           const existingRoleIds = existingUserRoles.map(ur => ur.roleId);

           const rolesToDisconnect = existingRoleIds.filter(roleId => !roleIds.includes(roleId));
           const rolesToConnect = roleIds.filter((roleId: string) => !existingRoleIds.includes(roleId));

           const userRoleUpdate: any = {};
           if (rolesToDisconnect.length > 0) {
               userRoleUpdate.deleteMany = rolesToDisconnect.map(roleId => ({ roleId: roleId, userId: userId }));
           }
           if (rolesToConnect.length > 0) {
               userRoleUpdate.create = rolesToConnect.map((roleId: string) => ({
                   role: { connect: { id: roleId } }
               }));
           }

           if (Object.keys(userRoleUpdate).length > 0) {
               updateData.UserRole = userRoleUpdate;
           }

           const updatedUser = await tx.user.update({
               where: { id: userId },
               data: updateData,
               include: {
                   UserRole: {
                       include: {
                           role: true,
                       },
                   },
               },
           });

           const { password: _, ...userWithoutPassword } = updatedUser;
           const formattedUserData = {
               ...userWithoutPassword,
               roles: updatedUser.UserRole.map(ur => ur.role),
           };
           return formattedUserData;
       });

       return NextResponse.json(formattedUser);

    } else {
        if (Object.keys(updateData).length === 0) {
             const currentUser = await prisma.user.findUnique({
                  where: { id: userId },
                   include: {
                      UserRole: {
                         include: {
                            role: true,
                         },
                      },
                   },
             });
             if (!currentUser) {
                  return NextResponse.json({ error: 'User not found' }, { status: 404 });
             }
             const { password: _, ...userWithoutPassword } = currentUser;
              const formattedUser = {
                 ...userWithoutPassword,
                 roles: currentUser.UserRole.map(ur => ur.role),
              };
             return NextResponse.json(formattedUser);
        }

        const updatedUser = await prisma.user.update({
             where: { id: userId },
             data: updateData,
             include: {
                 UserRole: {
                    include: {
                        role: true,
                    },
                 },
             },
        });

        const { password: _, ...userWithoutPassword } = updatedUser;
        const formattedUser = {
             ...userWithoutPassword,
             roles: updatedUser.UserRole.map(ur => ur.role),
        };
        return NextResponse.json(formattedUser);
    }

  } catch (error: any) {
    console.error("Failed to update user:", error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }
    if (error instanceof Error && error.message.includes('Transaction failed')) {
        return NextResponse.json({ error: 'Failed to update user roles atomically' }, { status: 500 });
    }
     if (error instanceof SyntaxError && error.message.includes('JSON at position')) {
         return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
     }
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
