type TokenInfo = {
  symbol: string;
  logoUrl: string;
};
export async function getTokenSymbol(mint: string): Promise<TokenInfo> {
  const response = await fetch(
    `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "text",
        method: "getAsset",
        params: { id: mint },
      }),
    }
  );
  const data = await response.json();
  const tokenInfo = {
    symbol: data.result.content.metadata.symbol || mint.slice(0, 6),
    logoUrl: data.result.content.links.image || "",
  };
  return tokenInfo;
}
