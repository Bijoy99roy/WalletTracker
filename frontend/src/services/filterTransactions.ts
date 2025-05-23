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

export function parseSolanaActivity(
  data: any[],
  userAddress: string
): ParsedActivity {
  const result: ParsedActivity = {
    transfers: [],
    swaps: [],
    nftTransfers: [],
  };

  for (const tx of data) {
    const {
      type,
      nativeTransfers,
      tokenTransfers,
      source,
      signature,
      timestamp,
    } = tx;

    result.transfers.push(
      ...parseSOLTransfers(nativeTransfers, userAddress, signature, timestamp)
    );

    if (type === "SWAP" && Array.isArray(tokenTransfers)) {
      const swap = parseSwap(tokenTransfers, source, signature, timestamp);
      if (swap) result.swaps.push(swap);
    }

    if (Array.isArray(tokenTransfers)) {
      result.nftTransfers.push(
        ...parseNFTTransfers(
          tokenTransfers,
          userAddress,
          signature,
          timestamp,
          source
        )
      );
    }
  }

  return result;
}

function parseSOLTransfers(
  nativeTransfers: any[],
  userAddress: string,
  signature: string,
  timestamp: number
): Transfer[] {
  if (!Array.isArray(nativeTransfers)) return [];

  return nativeTransfers
    .filter(
      (t) =>
        t.fromUserAccount === userAddress || t.toUserAccount === userAddress
    )
    .map((t) => ({
      type: t.fromUserAccount === userAddress ? "SOL_SENT" : "SOL_RECEIVED",
      amount: t.amount / 1e9,
      from: t.fromUserAccount,
      to: t.toUserAccount,
      signature,
      timestamp,
    }));
}

function parseSwap(
  tokenTransfers: any[],
  source: string,
  signature: string,
  timestamp: number
): Swap | null {
  if (tokenTransfers.length !== 2) return null;

  const [tokenIn, tokenOut] = tokenTransfers;

  return {
    type: "SWAP",
    tokenIn: tokenIn.mint,
    tokenOut: tokenOut.mint,
    amountIn: tokenIn.tokenAmount,
    amountOut: tokenOut.tokenAmount,
    user: tokenIn.fromUserAccount,
    platform: source,
    signature,
    timestamp,
  };
}

function parseNFTTransfers(
  tokenTransfers: any[],
  userAddress: string,
  signature: string,
  timestamp: number,
  source: string
): NFTTransfer[] {
  return tokenTransfers
    .filter(
      (tok) =>
        tok.tokenStandard === "NonFungible" ||
        (tok.tokenAmount === 1 && tok.tokenAmount !== undefined)
    )
    .map((tok) => ({
      type: tok.toUserAccount === userAddress ? "NFT_RECEIVED" : "NFT_SENT",
      mint: tok.mint,
      from: tok.fromUserAccount,
      to: tok.toUserAccount,
      signature,
      timestamp,
      compressed: source?.toUpperCase() === "BUBBLEGUM",
    }));
}
