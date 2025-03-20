import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorize function called');
        if (!credentials?.username || !credentials?.password) {
          console.error('Missing username or password');
          return null;
        }
        
        try {
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
            include: {
              UserRole: {
                include: {
                  role: true
                }
              }
            }
          })
          console.log('Fetched User:', user);
          
          if (!user) {
            console.error('User not found:', credentials.username);
            return null;
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            console.error('Invalid password for user:', credentials.username);
            return null;
          }

          const roles = user.UserRole.map((userRole: { role: { name: any } }) => userRole.role.name);
          console.log('User Roles:', roles);
          return {
            id: user.id,
            username: user.username,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            roles: roles
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.roles = token.roles as string[];
      }
      return session;
    }
  }
}