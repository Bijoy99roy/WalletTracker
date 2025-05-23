const PRICE_CACHE = new Map<string, number>();

export async function getCurrentPrice(mint: string): Promise<number> {
  if (PRICE_CACHE.has(mint)) return PRICE_CACHE.get(mint)!;

  const res = await fetch(
    `https://public-api.birdeye.so/public/price?address=${mint}`,
    {
      headers: { "X-API-KEY": process.env.BIRDEYE_API_KEY! },
    }
  );
  const data = await res.json();
  const price = data.data?.value || 0;
  PRICE_CACHE.set(mint, price);
  return price;
}

const BASE_URL = "https://public-api.birdeye.so/public/price/historical";

export async function getPriceAtTimestamp(
  mint: string,
  timestamp: number
): Promise<number | null> {
  const from = timestamp - 60; // 1 min before
  const to = timestamp + 60; // 1 min after

  const url = `${BASE_URL}?address=${mint}&from=${from}&to=${to}&interval=1m`;

  const res = await fetch(url, {
    headers: {
      "X-API-KEY": process.env.BIRDEYE_API_KEY!,
    },
  });

  const data = await res.json();
  console.log(data);
  const items = data?.data?.items;
  if (!items || !items.length) return null;

  // Find closest to the timestamp
  let closest = items[0];
  for (const item of items) {
    if (
      Math.abs(item.timestamp - timestamp) <
      Math.abs(closest.timestamp - timestamp)
    ) {
      closest = item;
    }
  }

  return closest.value || null;
}
