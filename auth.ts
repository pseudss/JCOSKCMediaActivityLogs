import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

interface AuthUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  isTemporaryPassword: boolean;
  UserRole: any;
}

interface ExtendedJWT extends JWT {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  isTemporaryPassword: boolean;
  UserRole?: any;
}

interface ExtendedSessionUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  isTemporaryPassword: boolean;
  UserRole: any;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.username || !credentials?.password) {
          console.error("Missing username or password");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { username: String(credentials.username) },
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
          });

          if (!user) {
            console.error("User not found:", credentials.username);
            return null;
          }
          if (!user.active) {
            console.error("User is not active:", credentials.username);
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            String(credentials.password),
            user.password
          );

          if (!isValidPassword) {
            console.error("Invalid password for user:", credentials.username);
            return null;
          }

          return {
            id: user.id.toString(),
            username: user.username,
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            isTemporaryPassword: user.isTemporaryPassword,
            UserRole: user.UserRole,
          };

        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
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
        extendedToken.UserRole = authUser.UserRole;
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

        if (extendedToken.UserRole) {
          sessionUser.UserRole = extendedToken.UserRole;
        } else {
          console.error('[Auth] UserRole missing on token in session callback!');
        }
      } else {
        console.error("[Auth] Token or session.user missing in session callback");
      }
      return session;
    },
  },
  trustHost: true
});
