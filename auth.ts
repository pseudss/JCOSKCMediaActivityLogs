import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthUser, ExtendedJWT, ExtendedSessionUser } from './interface/access-management';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma as any),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.username || !credentials?.password) {
          console.error("Missing username or password");
          return null;
        }

        console.log("Received credentials:", credentials);

        try {
          const user = await prisma.user.findUnique({
            where: { username: String(credentials.username) },
            include: {
              userRoles: {
                include: {
                  role: {
                    include: {
                      rolePermissions: {
                        include: {
                          permission: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

          if (!user) {
            console.error("User not found:", credentials.username);
            return null;
          }

          if (!user.active) {
            console.error("User is inactive:", credentials.username);
            return null;
          }

          // Use bcryptjs for password comparison
    
          const isValidPassword = await bcrypt.compare(
            String(credentials.password),
            user.password
          );

          if (!isValidPassword) {
            console.error("Invalid password for:", credentials.username);
            return null;
          }

          console.log("Login successful for:", user.username);

          return {
            id: user.id.toString(),
            username: user.username,
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            isTemporaryPassword: user.isTemporaryPassword,
            userRoles: user.userRoles,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authorization failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      const extendedToken = token as ExtendedJWT;
      if (user) {
        const authUser = user as AuthUser;
        extendedToken.id = authUser.id;
        extendedToken.username = authUser.username;
        extendedToken.firstName = authUser.firstName;
        extendedToken.lastName = authUser.lastName;
        extendedToken.isTemporaryPassword = authUser.isTemporaryPassword;
        extendedToken.userRoles = authUser.userRoles;
      }
      return extendedToken;
    },
    async session({ session, token }) {
      const extendedToken = token as ExtendedJWT;

      if (extendedToken && session.user) {
        const sessionUser = session.user as unknown as ExtendedSessionUser;

        sessionUser.id = extendedToken.id;
        sessionUser.username = extendedToken.username;
        sessionUser.firstName = extendedToken.firstName;
        sessionUser.lastName = extendedToken.lastName;
        sessionUser.isTemporaryPassword = extendedToken.isTemporaryPassword;
        sessionUser.userRoles = extendedToken.userRoles ?? [];
      }

      return session;
    },
  },
  trustHost: true,
});
