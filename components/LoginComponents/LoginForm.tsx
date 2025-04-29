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
import React, { SetStateAction, useState } from "react";

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const result = await signIn('credentials', {
            username,
            password,
            redirect: false,
        });
    
        if (result?.error) {
            try {
                const errorResponse = JSON.parse(result.error);
                setError(errorResponse.message || 'Invalid credentials');
            } catch {
                setError(result.error);
            }
        } else {
            router.push('/employees');
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
                            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                    <Button type="submit">Sign In</Button>
                </CardContent>
            </form>
        </Card>
    );
};
