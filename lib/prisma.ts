import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (globalForPrisma.prisma) {
    prisma = globalForPrisma.prisma;
} else {
    prisma = new PrismaClient({
        log: ['query'],
    });

    prisma.$connect().catch((error) => {
        if (error) {
            console.error('Failed to connect to the database:', error instanceof Error ? error.message : error);
        } else {
            console.error('Failed to connect to the database: Unknown error');
        }
    });

    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = prisma;
    }
}

export { prisma };
