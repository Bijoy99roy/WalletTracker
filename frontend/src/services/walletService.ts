import { getEnvironmentBaseApi } from "@/utils/common";

export async function getWalletTokensInfo(walletAddress: string) {
  try {
    const payload = {
      walletAddress: walletAddress,
    };
    const BASE = getEnvironmentBaseApi();
    const response = await fetch(`${BASE}/wallets/getTokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tokenInfo = await response.json();

    return tokenInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
