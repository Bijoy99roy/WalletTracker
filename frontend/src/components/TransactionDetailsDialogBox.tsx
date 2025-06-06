
import { transactionIcons, type TxType } from "@/constants/transactionsIcons";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { CheckCheck, Copy, ExternalLink } from "lucide-react";
import { copyToClipboard, formatUnixTimestamp, openSolscan } from "@/utils/common";
// import { getCurrentPrice } from "@/services/fetchPrices";
// import { useEffect, useState } from "react";
import { FormatAsset } from "./FormatAsset";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface TransactionDetailsDialogProp {
    transaction: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TransactionDetailsDialogBox({ transaction, open, onOpenChange }: TransactionDetailsDialogProp) {
    const [clickCopy, setClickCopy] = useState(false)
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (clickCopy) {
            timer = setTimeout(() => {
                setClickCopy(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [clickCopy]);
    return (
        <Dialog open={open} onOpenChange={onOpenChange} >

            <DialogContent className="backdrop-blur-xl md:!max-w-[650px] sm:!max-w-[500px] w-96">

                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        {transactionIcons[transaction.type.toLowerCase() as TxType]}
                        <span>{transaction.type} Transaction</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-1">
                    {/* Asset information */}

                    <div className="rounded-lg p-4">
                        <h3 className=" font-medium text-muted-foreground mb-2">Asset</h3>
                        <div>
                            {FormatAsset(transaction)}
                        </div>
                        {/* <p className="text-muted-foreground mt-1">
                            Current Price: {currentPrice}
                        </p> */}
                    </div>
                    {/* Trnsaction details */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 space-y-2">


                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-muted-foreground mb-1">Date & Time</h3>
                                <p className="">{formatUnixTimestamp(transaction.timestamp)}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground mb-1 font-medium">Transaction Fee</h3>
                                <p className="font-medium">{transaction.fees / 1e9} SOL</p>

                            </div>
                        </div>
                    </div>

                    {/* Transaction signature */}
                    <div className="p-4">
                        <h3 className="font-medium text-muted-foreground mb-2">Transaction Signature</h3>

                        <span className="font-mono text-sm break-all">
                            {transaction.signature}
                        </span>

                    </div>
                    {/* Action */}
                    <div className="flex p-4 gap-3 flex-col md:flex-row">
                        <Button onClick={() => openSolscan(transaction.signature)}
                            className="text-primary-foreground flex-1 cursor-pointer w-60 md:w-full">
                            <ExternalLink className="mr-2" />
                            View on Solscan
                        </Button>
                        <Button
                            onClick={() => {
                                copyToClipboard(transaction.signature)
                                setClickCopy(true)
                                toast.success('Transaction Signature copied to clipboard')
                            }}

                            className="bg-secondary text-white hover:text-foreground hover:bg-accent cursor-pointer w-60  md:w-fit">
                            {clickCopy ? <CheckCheck className="mr-2" /> : <Copy className="mr-2" />}
                            Copy Signature
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}