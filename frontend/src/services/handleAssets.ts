type Transfer = {
  type: "SOL_SENT" | "SOL_RECEIVED";
  amount: number;
  from: string;
  to: string;
  signature: string;
  timestamp: number;
};

type Swap = {
  type: "SWAP";
  tokenIn: string;
  tokenOut: string;
  amountIn: number;
  amountOut: number;
  user: string;
  platform: string;
  signature: string;
  timestamp: number;
};

type NFTTransfer = {
  type: "NFT_RECEIVED" | "NFT_SENT";
  mint: string;
  from: string;
  to: string;
  signature: string;
  timestamp: number;
  compressed?: boolean;
};

type ParsedActivity = {
  transfers: Transfer[];
  swaps: Swap[];
  nftTransfers: NFTTransfer[];
};

///////////////

type TokenBalance = {
  mint: string;
  netAmount: number;
};

type TokenPriceMap = {
  [mint: string]: number; // in USD
};

type ValuedAsset = TokenBalance & {
  usdValue: number;
};

export function calculateTokenHoldings(
  activities: ParsedActivity
): TokenBalance[] {
  const balances: Record<string, number> = {};

  for (const swap of activities.swaps) {
    balances[swap.tokenIn] = (balances[swap.tokenIn] || 0) - swap.amountIn;
    balances[swap.tokenOut] = (balances[swap.tokenOut] || 0) + swap.amountOut;
  }

  let solBalance = 0;
  for (const tx of activities.transfers) {
    solBalance += tx.type === "SOL_RECEIVED" ? tx.amount : -tx.amount;
  }
  balances["SOL"] = solBalance;

  return Object.entries(balances).map(([mint, netAmount]) => ({
    mint,
    netAmount,
  }));
}

export function calculateValuedAssets(
  balances: TokenBalance[],
  prices: TokenPriceMap
): ValuedAsset[] {
  return balances.map((b) => ({
    ...b,
    usdValue: (prices[b.mint] || 0) * b.netAmount,
  }));
}
