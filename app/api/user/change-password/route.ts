import { NextResponse } from 'next/server';
// Import getServerSession from your auth configuration file
import { auth } from '@/auth'; // Assuming auth.ts exports 'auth' which includes getServerSession
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Remove the reconstructedAuthOptions, it's not needed here
// const reconstructedAuthOptions: NextAuthOptions = { ... };

export async function POST(req: Request) {
  // Use the imported auth function to get the session
  const session = await auth();

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { oldPassword, newPassword } = await req.json();
    const userId = session.user.id;

    // Basic validation
    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: 'Old and new passwords are required' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters long' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return NextResponse.json({ error: 'Invalid old password' }, { status: 400 });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}