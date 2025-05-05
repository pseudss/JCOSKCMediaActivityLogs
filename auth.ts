import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
<<<<<<< HEAD
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
=======
>>>>>>> f97a68764c29344a2c4ee239789c2809c8e60d8d

interface AuthUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
<<<<<<< HEAD
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
=======
  roles: string[]; 
>>>>>>> f97a68764c29344a2c4ee239789c2809c8e60d8d
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
<<<<<<< HEAD
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
=======
          // Fetch user with roles from the database
          const user = await prisma.user.findUnique({
            where: { username: String(credentials.username) },
            include: {
              UserRole: { // Correctly include through the join table
                include: {
                  role: true // Include the actual role data
>>>>>>> f97a68764c29344a2c4ee239789c2809c8e60d8d
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

<<<<<<< HEAD
          const isValidPassword = await bcrypt.compare(
            String(credentials.password),
            user.password
=======
          // Validate password using bcrypt
          const isValidPassword = await bcrypt.compare(
            String(credentials.password),
            user.password // Assuming user.password stores the hashed password
>>>>>>> f97a68764c29344a2c4ee239789c2809c8e60d8d
          );

          if (!isValidPassword) {
            console.error("Invalid password for user:", credentials.username);
<<<<<<< HEAD
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
=======
            return null; // Authentication failed
          }

          // Map roles from the join table relation
          // Ensure 'role' object has a 'name' property (adjust if different)
          const roles = user.UserRole.map(ur => ur.role.name); // Corrected mapping
          console.log('User Roles:', roles); // For debugging

          // Return the user object in the expected format for JWT/session callbacks
          // Ensure property names match what callbacks expect (e.g., firstName vs first_name)
          return {
            id: user.id.toString(), // Ensure ID is a string if needed by JWT/session
            username: user.username,
            firstName: user.first_name || '', // Use correct field name from Prisma model
            lastName: user.last_name || '', // Use correct field name from Prisma model
            roles: roles,
            // email: user.email // Include email if needed
>>>>>>> f97a68764c29344a2c4ee239789c2809c8e60d8d
          };

        } catch (error) {
          console.error("Error during authentication:", error);
<<<<<<< HEAD
=======
          // Returning null indicates authentication failure
>>>>>>> f97a68764c29344a2c4ee239789c2809c8e60d8d
          return null;
        }
      },
    }),
  ],
  pages: {
<<<<<<< HEAD
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
=======
    signIn: "/login", // Redirect users to custom login page
    // error: '/auth/error', // Optional: Custom error page
  },
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for signing JWTs
  debug: process.env.NODE_ENV === "development", // Enable debug messages in development
  callbacks: {
    // The jwt callback is called whenever a JWT is created or updated.
    async jwt({ token, user }) {
      // If 'user' object exists (passed from authorize), persist its data to the token
      if (user) {
        const authUser = user as AuthUser; // Cast user to the defined interface
        token.id = authUser.id;
        token.username = authUser.username;
        token.firstName = authUser.firstName;
        token.lastName = authUser.lastName;
        token.roles = authUser.roles;
        // token.email = authUser.email; // Persist email if needed
      }
      return token; // Return the token with potentially added user data
    },
    // The session callback is called whenever a session is checked.
    async session({ session, token }) {
      // If 'token' exists (populated by jwt callback), transfer data to the session object
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).username = token.username as string;
        (session.user as any).firstName = token.firstName as string;
        (session.user as any).lastName = token.lastName as string;
        (session.user as any).roles = token.roles as string[];
        // session.user.email = token.email as string; // Add email if needed
      } else {
         // Handle case where token might be missing expected properties
         console.error("Token is missing expected properties in session callback");
      }
      return session; // Return the session object
>>>>>>> f97a68764c29344a2c4ee239789c2809c8e60d8d
    },
  },
});
