'use client';

import { useState, useMemo } from 'react';
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

type SessionUserWithRoles = NonNullable<ReturnType<typeof useSession>['data']>['user'] & {
    UserRole?: UserForAbility['UserRole'];
};

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Use useMemo to calculate roles and permissions only when session changes
    const { userRoles, userPermissions } = useMemo(() => {
        const user = session?.user as SessionUserWithRoles | undefined;
        const roles: string[] = [];
        const permissions = new Set<string>();

        if (user?.UserRole) {
            user.UserRole.forEach(userRole => {
                if (userRole.role) {
                    roles.push(userRole.role.name);
                    userRole.role.RolePermission?.forEach(rp => {
                        if (rp.permission) {
                            permissions.add(rp.permission.name);
                        }
                    });
                }
            });
        }

        return { userRoles: roles, userPermissions: Array.from(permissions) };
    }, [session]);

    const handleChangePassword = async (e: React.FormEvent) => {
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

            await update(); // Refresh session
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
        return <p>Access Denied.</p>;
    }

    // Use the specific type here
    const user = session.user as SessionUserWithRoles;

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
                        <p className="text-sm text-muted-foreground">{(user as any).username || 'Not provided'}</p>
                    </div>
                    <div>
                        <Label>First Name</Label>
                        <p className="text-sm text-muted-foreground">{(user as any).firstName || 'Not provided'}</p>
                    </div>
                    <div>
                        <Label>Last Name</Label>
                        <p className="text-sm text-muted-foreground">{(user as any).lastName || 'Not provided'}</p>
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
                        <Label>Permissions</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {userPermissions.length > 0 ? (
                                userPermissions.map((permission) => (
                                    <Badge key={permission} variant="outline">{permission}</Badge>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No permissions derived.</p>
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