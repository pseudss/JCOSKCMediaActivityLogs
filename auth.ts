import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { JWT } from "next-auth/jwt";

type UserForAbility = Prisma.UserGetPayload<{
    include: {
        UserRole: {
            include: {
                role: {
                    include: {
                        RolePermission: {
                            include: {
                                permission: true;
                            };
                        };
                    };
                };
            };
        };
    };
}>;

interface AuthUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  isTemporaryPassword: boolean;
  UserRole: UserForAbility['UserRole'];
}

interface ExtendedJWT extends JWT {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isTemporaryPassword: boolean;
    UserRole?: UserForAbility['UserRole'];
}
interface ExtendedSessionUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isTemporaryPassword: boolean;
    UserRole: UserForAbility['UserRole'];
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
                          permission: true 
                        }
                      }
                    }
                  }
                }
              }
            }
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

          console.log('[Auth] UserRole structure in authorize:', JSON.stringify(user.UserRole, null, 2));

          return {
            id: user.id.toString(),
            username: user.username,
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            isTemporaryPassword: user.isTemporaryPassword,
            UserRole: user.UserRole as UserForAbility['UserRole'],

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

        console.log('[Auth] Token structure in jwt callback:', JSON.stringify(extendedToken, null, 2));
      }
      return extendedToken;
    },
    async session({ session, token }) {
      const extendedToken = token as ExtendedJWT;
      console.log('[Auth] Received token in session callback:', JSON.stringify(extendedToken, null, 2));

      if (extendedToken && session.user) {
        const sessionUser = session.user as unknown as ExtendedSessionUser;

        sessionUser.id = extendedToken.id;
        sessionUser.username = extendedToken.username;
        sessionUser.firstName = extendedToken.firstName;
        sessionUser.lastName = extendedToken.lastName;
        sessionUser.isTemporaryPassword = extendedToken.isTemporaryPassword;

        if (extendedToken.UserRole) {
            sessionUser.UserRole = extendedToken.UserRole;
            console.log('[Auth] Assigned UserRole to session user.');
        } else {
            console.error('[Auth] UserRole missing on token in session callback!');
        }

        console.log('[Auth] Final session object in session callback:', JSON.stringify(session, null, 2));

      } else {
         console.error("[Auth] Token or session.user missing in session callback");
      }
      return session;
    },
  },
});
