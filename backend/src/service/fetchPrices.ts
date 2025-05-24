const PRICE_CACHE = new Map<string, number>();

export async function getCurrentPrice(mint: string): Promise<number> {
  if (PRICE_CACHE.has(mint)) return PRICE_CACHE.get(mint)!;

  const res = await fetch(
    `https://public-api.birdeye.so/defi/price?address=${mint}`,
    {
      headers: {
        "X-API-KEY": process.env.BIRD_EYE_API_KEY!,
        "x-chain": "solana",
        accept: "application/json",
      },
    }
  );
  const data = await res.json();
  const price = data.data?.value || 0;
  PRICE_CACHE.set(mint, price);
  return price;
}
