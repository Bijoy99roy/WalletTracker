import { CheckCheck, Copy, ExternalLink } from "lucide-react"
import { TableCell, TableRow } from "./ui/table"
import { copyToClipboard, formatUnixTimestamp, openSolscan } from "@/utils/common"
import { transactionColor, transactionIcons, type TxType } from "@/constants/transactionsIcons"
import { FormatAsset } from "./FormatAsset"
import { Button } from "./ui/button"
import { toast } from "sonner"

export function TableContent({ transactions, handleTransactionClick, setClickCopy, clickCopy }: { transactions: any, handleTransactionClick: any, setClickCopy: any, clickCopy: any }) {

    return (

        transactions.data.map((tx: any) => (
            <TableRow key={tx.id}
                className="hover:bg-accent/20 cursor-pointer text-left"
                onClick={() => handleTransactionClick(tx)}>
                <TableCell >
                    {formatUnixTimestamp(tx.timestamp)}
                </TableCell>
                <TableCell className="flex items-center">
                    <div className="flex items-center gap-2 mt-2">
                        <div className={`rounded-full ${transactionColor[tx.type.toLowerCase() as TxType]} w-6 h-6 flex items-center justify-center`}>
                            {transactionIcons[tx.type.toLowerCase() as TxType]}
                        </div>
                        <span>{tx.type}</span>
                    </div>
                </TableCell>
                <TableCell className="truncate md:text-nowrap">

                    {FormatAsset(tx)}
                </TableCell>
                <TableCell>
                    {tx.fees / 1e9} SOL
                </TableCell>
                <TableCell>
                    <span className="text-muted-foreground font-mono text-sm">
                        {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                    </span>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Button className="text-muted-foreground hover:text-foreground bg-secondary hover:bg-accent"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation()
                                copyToClipboard(tx.signature)
                                setClickCopy(tx.signature)
                                toast.success('Transaction Signature copied to clipboard')

                            }}>
                            {clickCopy === tx.signature ? <CheckCheck /> : <Copy />}

                        </Button>
                        <Button className="text-muted-foreground hover:text-foreground bg-secondary hover:bg-accent"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation()
                                openSolscan(tx.signature)
                            }}>
                            <ExternalLink className="w-4 h-4" />
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        ))
        // }
        // </TableBody>
        // </Table>
    )

}