import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function GET() {
  try {
    const users = await prisma.user.findMany({
<<<<<<< HEAD
      where: {
        isSystemUser: false, // Exclude system users
      },
=======
>>>>>>> f97a68764c29344a2c4ee239789c2809c8e60d8d
      include: {
        UserRole: {
          include: {
            role: {
              include: {
                RolePermission: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        username: 'asc'
      }
    });

    const formattedUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        roles: user.UserRole.map(ur => ({
          id: ur.role.id,
          name: ur.role.name,
          permissions: ur.role.RolePermission.map(rp => rp.permission)
        }))
      };
    });

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, first_name, last_name, roles = [], active = true, password } = body;

    if (!username || !password || !first_name || !last_name) {
      return NextResponse.json({ error: 'Missing required fields (username, password, first_name, last_name)' }, { status: 400 });
    }
    if (!Array.isArray(roles)) {
        return NextResponse.json({ error: 'Roles must be an array of role IDs' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        username,
        first_name,
        last_name,
        active,
        password: hashedPassword,
        UserRole: {
          create: roles.map((roleId: string) => ({
            role: {
              connect: { id: roleId },
            },
          })),
        },
      },
      include: {
        UserRole: {
          include: {
            role: true,
          },
        },
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    const formattedUser = {
      ...userWithoutPassword,
      roles: (newUser as any).UserRole.map((ur: { role: any }) => ur.role),
    };

    return NextResponse.json(formattedUser, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create user:", error);
    if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
