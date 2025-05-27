import { getTransactions } from "@/services/transactionService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useTransactions = (
  wallet: string,
  page: number,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["useTransactions", wallet],
    queryFn: () => getTransactions(wallet, page, limit),

    enabled: !!wallet,
    staleTime: 30_000,
  });
};

export const useInfiniteTransactions = (wallet: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ["transaction", wallet, limit],
    queryFn: ({ pageParam }) => getTransactions(wallet, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      console.log("lastPage:", lastPage);
      return allPages.length + 1;
    },
    enabled: !!wallet,
  });
};
