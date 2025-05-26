import { prisma } from "../db/connection";
import { parseTx } from "./parseTransactions";

export async function syncNewTransactionsNow(wallet: string) {
  const latest = await prisma.transaction.findFirst({
    where: { wallet },
    orderBy: { timestamp: "desc" },
    select: { signature: true },
  });

  const url = `https://api.helius.xyz/v0/addresses/${wallet}/transactions?limit=100&api-key=${process.env.HELIUS_API_KEY}`;
  const res = await fetch(url);
  const txs = await res.json();

  for (const tx of txs) {
    console.log(tx);
    if (tx.signature === latest?.signature) break;

    const parsed = await parseTx(tx, wallet);
    await prisma.transaction.upsert({
      where: { signature: parsed.signature },
      update: {},
      create: {
        id: parsed.signature,
        signature: parsed.signature,
        wallet,
        fees: tx.fee,
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
  }
}
