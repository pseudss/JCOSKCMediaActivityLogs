import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
// Remove defineAbilityFor import here, it's not needed in authorize
// import { defineAbilityFor, AppAbility } from "./lib/ability";
import { Prisma, User, Role, Permission } from "@prisma/client"; // Import necessary types
import { Session } from "next-auth"; // Import Session
import { JWT } from "next-auth/jwt"; // Import JWT

// Type for the detailed user structure needed by ability.ts
// This matches the structure fetched in 'authorize'
// Use Prisma.UserGetPayload for type safety
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
    UserRole: UserForAbility['UserRole']; // UserRole should be present in the final session
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign-in page.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        // Basic validation
        if (!credentials?.username || !credentials?.password) {
          console.error("Missing username or password");
          return null; // Authentication failed
        }

        try {
          // Fetch user with roles AND permissions (existing query is correct)
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

          // Check if user exists and is active
          if (!user) {
            console.error("User not found:", credentials.username);
            return null; // Authentication failed
          }
          if (!user.active) {
            console.error("User is not active:", credentials.username);
            return null; // Authentication failed (optional: handle inactive users differently)
          }

          const isValidPassword = await bcrypt.compare(
            String(credentials.password),
            user.password
          );

          if (!isValidPassword) {
            console.error("Invalid password for user:", credentials.username);
            return null;
          }

          console.log('[Auth] UserRole structure in authorize:', JSON.stringify(user.UserRole, null, 2)); // Log before returning

          // Ensure the returned object matches AuthUser interface
          return {
            id: user.id.toString(),
            username: user.username,
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            isTemporaryPassword: user.isTemporaryPassword,
            // Explicitly cast UserRole to ensure type compatibility
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
      // Type assertion for the incoming token
      const extendedToken = token as ExtendedJWT;
      if (user) {
        // Type assertion for the incoming user
        const authUser = user as AuthUser;
        extendedToken.id = authUser.id;
        extendedToken.username = authUser.username;
        extendedToken.firstName = authUser.firstName;
        extendedToken.lastName = authUser.lastName;
        extendedToken.isTemporaryPassword = authUser.isTemporaryPassword;
        extendedToken.UserRole = authUser.UserRole; // Assign UserRole

        // Log token structure before returning
        console.log('[Auth] Token structure in jwt callback:', JSON.stringify(extendedToken, null, 2));
      }
      return extendedToken; // Return the extended token
    },
    async session({ session, token }) {
      // Type assertion for the incoming token
      const extendedToken = token as ExtendedJWT;
      console.log('[Auth] Received token in session callback:', JSON.stringify(extendedToken, null, 2)); // Log received token

      // Ensure session.user exists before modifying
      if (extendedToken && session.user) {
        // Type assertion for the session user
        const sessionUser = session.user as unknown as ExtendedSessionUser;

        sessionUser.id = extendedToken.id;
        sessionUser.username = extendedToken.username;
        sessionUser.firstName = extendedToken.firstName;
        sessionUser.lastName = extendedToken.lastName;
        sessionUser.isTemporaryPassword = extendedToken.isTemporaryPassword;

        // Check if UserRole exists on token before assigning
        if (extendedToken.UserRole) {
            // Assign UserRole from the token to the session user
            sessionUser.UserRole = extendedToken.UserRole;
            console.log('[Auth] Assigned UserRole to session user.');
        } else {
            console.error('[Auth] UserRole missing on token in session callback!');
            // Handle the case where UserRole might be missing - perhaps assign empty array or default?
            // For now, we log the error. Depending on requirements, you might need
            // to fetch it again or assign default permissions.
            // sessionUser.UserRole = []; // Example: Assign empty array if missing
        }

        // Log final session object before returning
        console.log('[Auth] Final session object in session callback:', JSON.stringify(session, null, 2));

      } else {
         console.error("[Auth] Token or session.user missing in session callback");
      }
      return session; // Return the modified session
    },
  },
});
