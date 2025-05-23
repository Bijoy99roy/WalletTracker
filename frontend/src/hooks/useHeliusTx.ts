// src/hooks/useHeliusTx.ts
import { useQuery } from "@tanstack/react-query";
import { getEnhancedTx, getHeliusTransactions } from "../services/heliusClient";
import { fetchTokenPriceData } from "../services/handleTokenPrice";

export const useHeliusTx = (wallet: string, limit = 10) => {
  return useQuery({
    queryKey: ["heliusTx", wallet],
    queryFn: () => getHeliusTransactions(wallet, limit),

    enabled: !!wallet,
    staleTime: 30_000,
  });
};

export const useHeliusDetailedTx = (signature: string) => {
  return useQuery({
    queryKey: ["heliusDetailedTx", signature],
    queryFn: () => getEnhancedTx(signature),

    enabled: !!signature,
    staleTime: 30_000,
  });
};
