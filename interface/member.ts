export interface Member {
    id: string;
    name: string;
    description: string;
    active: boolean;
    createdAt: Date;
    officeId?: string;
    office?: {
        id: string;
        name: string;
        code: string;
        description?: string;
        head?: string;
        location?: string;
    };
    dojHmoId?: string;
    dojHmo?: {
        id: string;
        name: string;
        code: string;
        description?: string;
        type?: string;
        status?: string;
    };
}
