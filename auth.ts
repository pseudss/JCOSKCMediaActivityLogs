import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

interface AuthUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[]; 
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
          // Fetch user with roles from the database
          const user = await prisma.user.findUnique({
            where: { username: String(credentials.username) },
            include: {
              UserRole: { // Correctly include through the join table
                include: {
                  role: true // Include the actual role data
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

          // Validate password using bcrypt
          const isValidPassword = await bcrypt.compare(
            String(credentials.password),
            user.password // Assuming user.password stores the hashed password
          );

          if (!isValidPassword) {
            console.error("Invalid password for user:", credentials.username);
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
          };

        } catch (error) {
          console.error("Error during authentication:", error);
          // Returning null indicates authentication failure
          return null;
        }
      },
    }),
  ],
  pages: {
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
    },
  },
});
