import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY;
const HELIUS_URL = "https://api.helius.xyz/v0";

export const getHeliusTransactions = async (wallet: string, limit = 10) => {
  let allTxs: any = [];
  let before = undefined;
  let hasMore = true;
  while (hasMore && allTxs.length < limit) {
    let url = `${HELIUS_URL}/addresses/${wallet}/transactions?api-key=${HELIUS_API_KEY}&limit=100`;
    if (before) {
      url += `&before=${before}`;
    }
    const res = await fetch(url);

    if (!res.ok) throw new Error("Helius API request failed");
    const txs = await res.json();
    console.log(txs);
    console.log(before);
    if (txs.length === 0) {
      hasMore = false;
    } else {
      allTxs = allTxs.concat(txs);
      before = txs[txs.length - 1].signature;
    }
  }
  return allTxs;
};

export const getEnhancedTx = async (signature: string) => {
  const url = `${HELIUS_URL}/transactions?api-key=${HELIUS_API_KEY}&commitment=finalized`;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{"transactions":["${signature}"]}`,
  };
  console.log(options);
  const resp = await fetch(url, options);
  if (!resp.ok) throw new Error("Helius API request failed");
  const data = await resp.json();
  console.log("test");
  console.log(data);
  return data;
};
