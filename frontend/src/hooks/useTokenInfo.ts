import { getWalletTokensInfo } from "@/services/walletService";
import { useQuery } from "@tanstack/react-query";

export const useTokenInfo = (wallet: string) => {
  return useQuery({
    queryKey: ["useTokenInfo", wallet],
    queryFn: () => getWalletTokensInfo(wallet),

    enabled: !!wallet,
    staleTime: 30_000,
  });
};
