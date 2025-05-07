import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (globalForPrisma.prisma) {
    prisma = globalForPrisma.prisma;
} else {
    prisma = new PrismaClient({
        log: ['query'],
    });

    prisma.$connect().catch((error: unknown) => {
        if (error instanceof Error) {
          console.error('Failed to connect to the database:', error.message);
        } else {
          console.error('Failed to connect to the database:', String(error));
        }
      });

    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = prisma;
    }
}

export { prisma };
