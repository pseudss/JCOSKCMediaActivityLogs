import { JWT } from "@auth/core/jwt";

export interface Role {
    id: string;
    name: string;
    description: string | null;
    permissions?: Permission[];
}

export interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    roles: Role[];
    active: boolean;
}

export interface NewUserData {
    [x: string]: any;
    firstName: string;
    lastName: string;
    username: string;
    roleIds: string[];
    active: boolean;
    password?: string;
}

export interface EditUserData {
    id?: string;
    username: string;
    firstName: string;
    lastName: string;
    roleIds: string[];
    active: boolean;
    password?: string;
}

export interface Permission {
    id: string;
    name: string;
    description: string | null;
    roles?: Role[];
}

export interface EditRoleData {
    id?: string;
    name: string;
    description: string;
    permissionIds: string[]; 
}

export interface NewRoleData {
    name: string;
    description: string;
    permissionIds: string[];
}

export interface AuthUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isTemporaryPassword: boolean;
    userRoles: any;
}

export interface ExtendedJWT extends JWT {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isTemporaryPassword: boolean;
    userRoles?: any;
}

export interface ExtendedSessionUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isTemporaryPassword: boolean;
    userRoles: any;
}