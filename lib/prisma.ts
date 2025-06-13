import { PrismaClient } from '../prisma/generated/client';

const globalForPrisma = (typeof global !== 'undefined' ? global : {}) as unknown as { prisma?: PrismaClient };
const isDev = process.env.NODE_ENV === 'development';

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: isDev ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
  });
}

export const prisma = globalForPrisma.prisma;
