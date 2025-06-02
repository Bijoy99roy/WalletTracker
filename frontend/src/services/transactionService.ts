import { getEnvironmentBaseApi } from "@/utils/common";

export async function getTransactions(
  walletAddress: string,
  page: number,
  limit: number = 20
) {
  try {
    const payload = {
      walletAddress: walletAddress,
      page: page,
      limit: limit,
    };
    const BASE = getEnvironmentBaseApi();
    const response = await fetch(`${BASE}/transactions/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const transactions = await response.json();

    return transactions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
