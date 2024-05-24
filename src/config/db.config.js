import { PrismaClient, Prisma } from "@prisma/client";

// Connect to the database with specific logging and transaction options
export const prisma = new PrismaClient({
  log: ["query"],
  // datasources: {
  //   db: {
  //     url: process.env.POSTGRES_PRISMA_URL,
  //   },
  // },
  // transactionOptions: {
  //   maxWait: 5000, // default: 2000
  //   timeout: 10000, // default: 5000
  //   isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  // },
});
