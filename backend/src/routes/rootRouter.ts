import express from "express";
import { fetchTransactionRouter } from "./fetchTransactions";
import { walletRouter } from "./wallet";

export const router = express.Router();
router.use("/transactions", fetchTransactionRouter);
router.use("/wallets", walletRouter);
