import { getCurrentTimeUnix, getPriorTimeStampHour } from "../utils";

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

export async function getHistoricPrice(mint: string) {
  const currentTimeStampUnix = getCurrentTimeUnix();
  const tenHourAgoTimeStampUnix = getPriorTimeStampHour(10);
  const res = await fetch(
    `https://public-api.birdeye.so/defi/history_price?address=${mint}&address_type=token&type=1H&time_from=${tenHourAgoTimeStampUnix}&time_to=${currentTimeStampUnix}`,
    {
      headers: {
        "X-API-KEY": process.env.BIRD_EYE_API_KEY!,
        "x-chain": "solana",
        accept: "application/json",
      },
    }
  );
  const data = await res.json();

  const historicalPrice = data.data;
  console.log(historicalPrice);
  return historicalPrice;
}
