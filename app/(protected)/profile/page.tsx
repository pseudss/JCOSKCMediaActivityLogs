'use client';

import { useState, useMemo, FormEvent } from 'react'; // Added FormEvent
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import Loading from '../loading';
import { UserForAbility } from '@/lib/ability';
import { Session } from 'next-auth';

interface ExtendedUser {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string;
    first_name?: string;
    last_name?: string;
    UserRole?: UserForAbility['userRoles'];
}

interface ExtendedSession {
  user?: ExtendedUser;
}

export default function ProfilePage() {
    const { data: session, status, update } = useSession() as { data: ExtendedSession | null, status: string, update: () => Promise<ExtendedSession | null> };
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { userRoles, userPermissions } = useMemo(() => {
        const currentUser = session?.user;
        const roles: string[] = [];
        const permissions = new Set<string>();

        if (currentUser?.UserRole) {
            currentUser.UserRole.forEach(userRole => {
                if (userRole.role) {
                    roles.push(userRole.role.name);
                    userRole.role.rolePermissions?.forEach(rp => {
                        if (rp.permission?.name) {
                            permissions.add(rp.permission.name);
                        }
                    });
                }
            });
        }
        return { userRoles: roles, userPermissions: Array.from(permissions) };
    }, [session]);

    const handleChangePassword = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match.');
            setIsSubmitting(false);
            return;
        }

        if (newPassword.length < 8) {
            toast.error('New password must be at least 8 characters long.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to change password');
            }

            toast.success('Password changed successfully! Redirecting to login...');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            
            await update(); 
            router.push('/login');

        } catch (error: any) {
            toast.error(error.message || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'loading') {
        return <Loading />;
    }

    if (status === 'unauthenticated' || !session?.user) {
        router.push('/login');
        return <Loading/>;
    }

    const currentUser = session.user;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                    <CardDescription>Your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Username</Label>
                        <p className="text-sm text-muted-foreground">{currentUser.username || 'Not provided'}</p>
                    </div>
                    <div>
                        <Label>First Name</Label>
                        <p className="text-sm text-muted-foreground">{currentUser.first_name || 'Not provided'}</p>
                    </div>
                    <div>
                        <Label>Last Name</Label>
                        <p className="text-sm text-muted-foreground">{currentUser.last_name || 'Not provided'}</p>
                    </div>
                     <div>
                        <Label>Email</Label>
                        <p className="text-sm text-muted-foreground">{currentUser.email || 'Not provided'}</p>
                    </div>
                    <div>
                        <Label>Roles</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {userRoles.length > 0 ? (
                                userRoles.map((role) => (
                                    <Badge key={role} variant="secondary">{role}</Badge>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No roles assigned.</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <Label>Permissions (Derived)</Label>
                        <div className="flex flex-wrap gap-2 mt-1 max-h-32 overflow-y-auto">
                            {userPermissions.length > 0 ? (
                                userPermissions.sort().map((permission) => (
                                    <Badge key={permission} variant="outline" className="text-xs">{permission}</Badge>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No specific permissions derived.</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your account password.</CardDescription>
                </CardHeader>
                <form onSubmit={handleChangePassword}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="oldPassword">Old Password</Label>
                            <Input
                                id="oldPassword"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                disabled={isSubmitting}
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={8}
                                disabled={isSubmitting}
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength={8}
                                disabled={isSubmitting}
                                autoComplete="new-password"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Changing...' : 'Change Password'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
