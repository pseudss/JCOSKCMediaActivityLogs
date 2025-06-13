import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const SALT_ROUNDS = 10;

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { isSystemUser: false },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: { permission: true },
                },
              },
            },
          },
        },
      },
      orderBy: { username: 'asc' },
    });

    const formattedUsers = users.map(({ password: _password, userRoles, ...user }: { password: string; userRoles: any; [key: string]: any }) => ({
      ...user,
      roles: userRoles?.map(({ role }: { role: { id: string; name: string; rolePermissions: Array<{ permission: any }> } }) => ({
        id: role.id,
        name: role.name,
        permissions: role.rolePermissions.map((rp: { permission: any }) => rp.permission), // Corrected: rolePermissions
      })) || [],
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      username,
      first_name,
      last_name,
      roles = [],
      active = true,
      password,
    } = body;

    if (!username || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: 'Missing required fields (username, password, first_name, last_name)' },
        { status: 400 }
      );
    }

    if (!Array.isArray(roles)) {
      return NextResponse.json(
        { error: 'Roles must be an array of role IDs' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        username,
        first_name,
        last_name,
        active,
        password: hashedPassword,
        userRoles: {
          create: roles.map((roleId: string) => ({
            role: { connect: { id: roleId } },
          })),
        },
      },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    const formattedUser = {
      ...userWithoutPassword,
      roles: newUser.userRoles.map(({ role }: { role: { id: string; name: string } }) => role),
    };

    return NextResponse.json(formattedUser, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create user:', error);

    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      const target = error.meta?.target as string[] | undefined;
      if (target && target.includes('username')) {
        return NextResponse.json(
          { error: 'Username already exists' },
          { status: 409 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
