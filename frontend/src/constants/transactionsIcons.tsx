import { ArrowLeftRight, MoveDownLeft, MoveUpRight } from "lucide-react";

export type TxType = "send" | "receive" | "swap";
export const transactionIcons = {
    send: <MoveUpRight className="w-4 h-4" />,
    receive: <MoveDownLeft className="w-4 h-4" />,
    swap: <ArrowLeftRight className="w-4 h-4" />,
};
export const transactionColor = {
    send: 'bg-red-400',
    receive: 'bg-green-400',
    swap: 'bg-blue-400'
}