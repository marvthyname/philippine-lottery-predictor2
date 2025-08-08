import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

try {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    if (!global.prisma) global.prisma = new PrismaClient()
    prisma = global.prisma
  }
} catch (error) {
  console.warn('Prisma client not available, using mock client for development')
  prisma = {
    lotteryResult: { findMany: async () => [], upsert: async () => ({ id: 'mock' } as any), $disconnect: async () => undefined },
    prediction: { findMany: async () => [], create: async () => ({ id: 'mock' } as any), $disconnect: async () => undefined },
    gcashPayment: { findUnique: async () => null, create: async () => ({ id: 'mock' } as any), update: async () => ({ id: 'mock' } as any), $disconnect: async () => undefined },
    premiumAccess: { findFirst: async () => null, create: async () => ({ id: 'mock' } as any), $disconnect: async () => undefined },
    $connect: async () => undefined,
    $disconnect: async () => undefined,
  } as any
}

export { prisma }
export default prisma
