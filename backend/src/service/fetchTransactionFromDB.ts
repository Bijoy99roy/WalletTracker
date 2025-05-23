import { prisma } from "../db/connection";

export async function fetchTransactionFromDB(
  wallet: string,
  page: number,
  limit: number
) {
  const offset = (page - 1) * limit;
  return prisma.transaction.findMany({
    where: { wallet },
    orderBy: { timestamp: "desc" },
    skip: offset,
    take: limit,
    include: { tokenTransfers: true },
  });
}
