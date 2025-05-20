import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY;
const HELIUS_URL = "https://api.helius.xyz/v0";

export const getHeliusTransactions = async (wallet: string, limit = 10) => {
  const url = `${HELIUS_URL}/addresses/${wallet}/transactions?api-key=${HELIUS_API_KEY}&limit=${limit}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Helius API request failed");
  const txs = await res.json();

  return txs.map((tx: any) => ({
    signature: tx.signature,
    timestamp: tx.timestamp,
    type: tx.type,
    description: tx.description,
    feeSOL: tx.fee / LAMPORTS_PER_SOL,
    events: tx.events,
  }));
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
