'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { defineAbilityFor, UserForAbility, AppSubjects } from "@/lib/ability";
import { Session } from "next-auth";

type SessionWithUserRole = Omit<Session, 'user'> & {
    user?: Session['user'] & {
        userRoles?: UserForAbility['userRoles'];
        isTemporaryPassword?: boolean;
    }
}

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
    
        if (result?.error) {
            try {
                const errorResponse = JSON.parse(result.error);
                setError(errorResponse.message || "Invalid credentials or user inactive.");
            } catch {
                setError(result.error || "An unknown login error occurred.");
            }
        } else if (result?.ok) {
            try {
                await new Promise(resolve => setTimeout(resolve, 300));
                const session = await getSession() as SessionWithUserRole | null;

                if (!session?.user) {
                    setError("Failed to retrieve user session after login.");
                    return;
                }

                let targetPath = "/profile";

                if (session.user.isTemporaryPassword) {
                    targetPath = "/profile";
                } else {
                    if (session.user.userRoles) {
                        const userForAbility = {
                            id: session.user.id ?? '',
                            userRoles: session.user.userRoles
                        } as UserForAbility;

                        const ability = defineAbilityFor(userForAbility);
                        const prioritizedRoutes: { path: string; subject: AppSubjects }[] = [
                            { path: "/employees", subject: "Employees" },
                            { path: "/access-management", subject: "AccessManagement" },
                            { path: "/profile", subject: "Profile" }
                        ];

                        for (const route of prioritizedRoutes) {
                            if (ability.can('read', route.subject)) {
                                targetPath = route.path;
                                break; 
                            }
                        }
                    } else {
                        console.error("UserRole data missing in session. Defaulting redirect.");
                    }
                }
                router.push(targetPath);

            } catch (err) {
                console.error("Error during post-login redirection:", err);
                setError("An error occurred after login.");
            }
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
                        <div className="divide-dashed"></div>
                        <p className="text-balance text-muted-foreground text-sm">
                            Enter your username below to login to your account
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-600 text-sm text-center">{error}</p>} {/* Added text-sm/center */}
                    <Button type="submit">Sign In</Button>
                </CardContent>
            </form>
        </Card>
    );
};
