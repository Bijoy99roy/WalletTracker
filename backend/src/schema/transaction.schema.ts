import { z } from "zod";

const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;

export const solanaAddressSchema = z.object({
  walletAddress: z
    .string()
    .min(32, "Solana address is too short")
    .max(44, "Solana address is too long")
    .regex(base58Regex, "Invalid base58 characters in Solana address"),
  page: z.number().min(1),
  limit: z.number().min(1),
});
