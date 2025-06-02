import express from "express";
import { solanaAddressSchema } from "../schema/transaction.schema";
import { fetchTransactionFromDB } from "../service/fetchTransactionFromDB";
import { fetchOlderFromHelius } from "../service/fetchOlderFromHelius";
import { syncNewTransactionsNow } from "../service/syncNewTransactions";
import { prisma } from "../db/connection";

export const fetchTransactionRouter = express.Router();

fetchTransactionRouter.post("/get", async (req, res) => {
  try {
    const payload = req.body;
    const { success, error } = solanaAddressSchema.safeParse(payload);
    if (!success) {
      res.status(404).json({
        message: "Invalid wallet address",
      });
      return;
    }
    const {
      walletAddress,

      page = 1,
      limit = 10,
    } = req.body;

    if (page === 1) {
      await syncNewTransactionsNow(walletAddress);
    }

    const localTxs = await fetchTransactionFromDB(walletAddress, page, limit);

    if (localTxs.length === limit) {
      res.status(200).json({ source: "db", data: localTxs });
      return;
    }

    const hasAllTransactions = await prisma.wallet.findFirst({
      where: {
        wallet: walletAddress,
      },
      select: {
        hasAllTransactions: true,
      },
    });

    if (hasAllTransactions) {
      res.status(200).json({ source: "helius", data: [] });
      return;
    }
    const inserted = await fetchOlderFromHelius(walletAddress);
    const updatedTxs = await fetchTransactionFromDB(walletAddress, page, limit);

    res.status(200).json({
      source: "helius",
      data: updatedTxs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: `Failed to fetch transactions: ${error}`,
    });
  }
});
