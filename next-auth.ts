import CredentialsProvider from "next-auth/providers/credentials"

interface User {
    id: string
    username: string
    firstName: string
    lastName: string
    roles: string[]
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }  
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.APP_PUBLIC_API}/users/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                });

                const user = await res.json();

                console.log('API Response:', user);

                if (res.ok && user.success) {
                    return user.data;
                } else {
                    return null;
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
        async jwt({ token, user }: { token: any, user: User }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.roles = user.roles;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
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