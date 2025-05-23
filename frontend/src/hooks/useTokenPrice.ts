import { useQuery } from "@tanstack/react-query";
import { fetchTokenPriceData } from "../services/handleTokenPrice";

export const useTokenPrices = (tokenAddress: string) => {
  return useQuery({
    queryKey: ["useTokenPrices", tokenAddress],
    queryFn: () => fetchTokenPriceData(tokenAddress),

    enabled: !!tokenAddress,
    staleTime: 30_000,
  });
};
