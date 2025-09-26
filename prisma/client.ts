import { PrismaClient } from '../app/generated/prisma';

const PrismaClientSingleton = () => {
    return new PrismaClient();
}

type PrismaClientSingleton = ReturnType<typeof PrismaClientSingleton>;

const globalForPrisma = global as unknown as { 
    prisma: PrismaClientSingleton | undefined 
};

const prisma = globalForPrisma.prisma ?? PrismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;