export interface Office {
    id: string;
    name: string;
    code: string;
    description?: string;
    head?: string;
    location?: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
} 