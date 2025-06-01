import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { prisma } from "../db/connection";
import express from "express";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getTokenSymbol } from "../service/resolveTokenInfo";
import {
  getCurrentPrice,
  getCurrentPriceInfo,
  getHistoricPrice,
} from "../service/fetchPrices";
import Bottleneck from "bottleneck";
import { walletAddressSchema } from "../schema/wallet.schema";
import { SOLANA_TOKEN_ADDRESS } from "../constants";
export const walletRouter = express.Router();
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1500,
});
const limitedFetchPrice = limiter.wrap(getCurrentPriceInfo);
const limitedFetchHistoricalPrice = limiter.wrap(getHistoricPrice);
interface Token {
  symbol?: string;
  logoUrl?: string;
  price?: number;
  amount?: number;
}
interface Tokens {
  [key: string]: Token;
}
walletRouter.post("/getTokens", async (req, res) => {
  try {
    const payload = req.body;
    const { success, error } = walletAddressSchema.safeParse(payload);
    if (!success) {
      res.status(404).json({
        message: "Invalid wallet address",
      });
      return;
    }
    const { walletAddress } = req.body;
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const wallet = new PublicKey(walletAddress);
    const lamports = await connection.getBalance(wallet);
    let balance = 0;
    if (lamports) {
      balance =
        (lamports / LAMPORTS_PER_SOL) *
        (await getCurrentPrice(SOLANA_TOKEN_ADDRESS));
    }

    const tokens: Tokens = {};

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      wallet,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );
    for (const { account } of tokenAccounts.value) {
      const data = account.data.parsed.info;
      const mint = data.mint;
      const rawAmount = data.tokenAmount.amount;
      const decimals = data.tokenAmount.decimals;
      const uiAmount = parseFloat(rawAmount) / Math.pow(10, decimals);
      if (uiAmount > 0) {
        let token: Token = {};
        // const historicalPrice = await limitedFetchHistoricalPrice(mint);
        const currentTokenPrice = await limitedFetchPrice(mint);
        console.log(currentTokenPrice);
        if (
          currentTokenPrice?.priceChange24h &&
          currentTokenPrice.value > 0.0001
        ) {
          const tokenInfo = await getTokenSymbol(mint);
          token = { ...tokenInfo };
          token["price"] = currentTokenPrice?.value * uiAmount;
          token["amount"] = uiAmount;
          tokens[mint] = token;
        } else {
          continue;
        }
      }
    }
    res.status(200).json({
      tokenInfo: tokens,
      nativeBalance: balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch transactions info",
    });
  }
});
