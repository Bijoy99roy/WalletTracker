const BIRD_EYE_API_KEY = import.meta.env.VITE_BIRD_EYE_API_KEY;
export const fetchTokenPriceData = async (tokenAddress: string) => {
  const url = `https://public-api.birdeye.so/defi/price?address=${tokenAddress}`;

  const headers = {
    accept: "application/json",
    "x-chain": "solana",
    "X-API-KEY": BIRD_EYE_API_KEY,
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch SOL price:", err);
  }
};
