import { getTransactions } from "@/services/transactionService";
import { useQuery } from "@tanstack/react-query";

export const useTransactions = (wallet: string, page: number, limit = 10) => {
  return useQuery({
    queryKey: ["useTransactions", wallet],
    queryFn: () => getTransactions(wallet, page, limit),

    enabled: !!wallet,
    staleTime: 30_000,
  });
};
