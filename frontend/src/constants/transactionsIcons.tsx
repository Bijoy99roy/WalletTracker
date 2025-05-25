import { ArrowLeftRight, MoveDownLeft, MoveUpRight } from "lucide-react";

export type TxType = "transfer" | "receive" | "swap";
export const transactionIcons = {
    transfer: <MoveUpRight className="w-4 h-4" />,
    receive: <MoveDownLeft className="w-4 h-4" />,
    swap: <ArrowLeftRight className="w-4 h-4" />,
};
