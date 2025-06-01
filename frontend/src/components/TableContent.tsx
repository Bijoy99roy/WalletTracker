import { CheckCheck, Copy, ExternalLink } from "lucide-react"
import { TableCell, TableRow } from "./ui/table"
import { copyToClipboard, formatUnixTimestamp, openSolscan } from "@/utils/common"
import { transactionColor, transactionIcons, type TxType } from "@/constants/transactionsIcons"
import { FormatAsset } from "./FormatAsset"
import { Button } from "./ui/button"

export function TableContent({ transactions, handleTransactionClick, setClickCopy, clickCopy }: { transactions: any, handleTransactionClick: any, setClickCopy: any, clickCopy: any }) {
    // console.log(transactions)
    return (
        // transactions.data.length === 0 ? (
        //     <div className="flex flex-col justify-center items-center">
        //         <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        //         <h3 className="text-xl font-semibold mb-2">No Transactions Found</h3>
        //         <p className="text-muted-foreground">This wallet doesn't have any transaction history yet.</p>
        //     </div>
        // ) : (
        //     <Table>
        //         <TableHeader>
        //             <TableRow className="hover:bg-transparent">
        //                 <TableHead className="text-muted-foreground">Datetime</TableHead>
        //                 <TableHead className="text-muted-foreground">Type</TableHead>
        //                 <TableHead className="text-muted-foreground">Asset (s)</TableHead>
        //                 <TableHead className="text-muted-foreground">Fees</TableHead>
        //                 <TableHead className="text-muted-foreground">Signature</TableHead>
        //                 <TableHead className="text-muted-foreground">Actions</TableHead>
        //             </TableRow>
        //         </TableHeader>
        // <TableBody>

        transactions.data.map((tx: any) => (
            <TableRow key={tx.id}
                className="hover:bg-accent/20 cursor-pointer  text-left"
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
                <TableCell>
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
                                setClickCopy(true)

                            }}>
                            {clickCopy ? <CheckCheck /> : <Copy />}

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