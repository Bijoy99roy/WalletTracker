import express from "express";
import { fetchTransactionRouter } from "./fetchTransactions";

export const router = express.Router();
router.use("/transactions", fetchTransactionRouter);
