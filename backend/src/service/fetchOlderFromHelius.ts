import { prisma } from "../db/connection";
import { parseTx } from "./parseTransactions";

export async function fetchOlderFromHelius(wallet: string): Promise<number> {
  const stopAtSignature = await prisma.transaction.findFirst({
    where: { wallet },
    orderBy: { timestamp: "desc" },
    select: { signature: true },
  });

  const lastBlock = await prisma.transaction.findFirst({
    where: { wallet },
    orderBy: { timestamp: "asc" },
    select: { signature: true },
  });

  const before = lastBlock?.signature;
  const url = `https://api.helius.xyz/v0/addresses/${wallet}/transactions?limit=100${
    before ? `&before=${before}` : ""
  }&api-key=${process.env.HELIUS_API_KEY}`;

  const res = await fetch(url);
  const txs = await res.json();

  if (!txs.length) {
    await prisma.wallet.upsert({
      where: { wallet },
      update: { hasAllTransactions: true },
      create: { wallet, hasAllTransactions: true },
    });
    return 0;
  }

  let inserted = 0;
  for (const tx of txs) {
    if (tx.signature === stopAtSignature?.signature) break;

    const parsed = await parseTx(tx, wallet);
    await prisma.transaction.upsert({
      where: { signature: parsed.signature },
      update: {},
      create: {
        id: parsed.signature,
        signature: parsed.signature,
        wallet,
        timestamp: parsed.timestamp,
        type: parsed.type,
        solSent: parsed.solSent,
        solReceived: parsed.solReceived,
        tokenTransfers: {
          create: parsed.tokenTransfers.map((t) => ({
            wallet,
            mint: t.mint,
            symbol: t.symbol,
            logoUrl: t.logoUrl,
            sent: t.sent,
            received: t.received,
          })),
        },
      },
    });

    inserted++;
  }

  return inserted;
}
