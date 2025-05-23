import { getTokenSymbol } from "./resolveTokenInfo";
import { getCurrentPrice } from "./fetchPrices";

export async function parseTx(tx: any, wallet: string) {
  let solSent = 0,
    solReceived = 0;
  const transfers = [];

  for (const acc of tx.accountData || []) {
    if (acc.account === wallet) {
      const lamports = acc.nativeBalanceChange || 0;
      if (lamports > 0) {
        solReceived += lamports;
      } else {
        solSent += -lamports;
      }
    }
  }

  const tokens = new Map<string, { sent: number; received: number }>();

  for (const t of tx.tokenTransfers || []) {
    if (t.fromUserAccount !== wallet && t.toUserAccount !== wallet) continue;

    const entry = tokens.get(t.mint) || { sent: 0, received: 0 };
    if (t.fromUserAccount === wallet) entry.sent += t.tokenAmount;
    if (t.toUserAccount === wallet) entry.received += t.tokenAmount;
    tokens.set(t.mint, entry);
  }

  const hasTokenSend = [...tokens.values()].some((t) => t.sent > 0);
  const hasTokenReceive = [...tokens.values()].some((t) => t.received > 0);
  let type = "N/A";
  if ((solSent || hasTokenSend) && (solReceived || hasTokenReceive)) {
    type = "SWAP";
  } else if (solSent || hasTokenSend) {
    type = "SEND";
  } else if (solReceived || hasTokenReceive) {
    type = "RECEIVE";
  }

  for (const [mint, { sent, received }] of tokens) {
    const price = await getCurrentPrice(mint);
    const symbol = await getTokenSymbol(mint);
    transfers.push({
      mint,
      symbol: symbol,
      sent,
      received,
      priceAtTx: price,
      currentPrice: price,
    });
  }

  return {
    signature: tx.signature,
    timestamp: tx.timestamp,
    type,
    solSent: solSent / 1e9,
    solReceived: solReceived / 1e9,
    tokenTransfers: transfers,
  };
}
