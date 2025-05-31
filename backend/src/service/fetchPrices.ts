export async function getCurrentPrice(mint: string): Promise<number> {
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

  return price;
}

export async function getCurrentPriceInfo(mint: string) {
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
  const priceInfo = data.data;

  return priceInfo;
}
