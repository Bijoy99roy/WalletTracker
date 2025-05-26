import { FormatAsset } from "@/components/FormatAsset";
import { Loader } from "@/components/Loader";
import { TransactionDetailsDialogBox } from "@/components/TransactionDetailsDialogBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transactionColor, transactionIcons, type TxType } from "@/constants/transactionsIcons";
import { useTransactions } from "@/hooks/useTransactions";
import { getCurrentPrice } from "@/services/fetchPrices";
import { copyToClipboard, formatUnixTimestamp, openSolscan } from "@/utils/common";
import { CheckCheck, ChevronRight, Copy, ExternalLink, Search, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

export function Transactions() {
    const [searchParams] = useSearchParams();
    const [walletAddress, setWalletAddress] = useState(searchParams.get('wallet') || '')
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [dialogueOpen, setDialogueOpen] = useState(false)
    const [clickCopy, setClickCopy] = useState(false)
    const [prices, setPrices] = useState<{ [mint: string]: number }>({});



    function handleTransactionClick(transaction: any) {
        console.log(transaction)
        setSelectedTransaction(transaction)
        setDialogueOpen(true)
    }



    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (clickCopy) {
            timer = setTimeout(() => {
                setClickCopy(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [clickCopy]);


    const { data: transactions, isLoading, error } = useTransactions(walletAddress, 1, 10);


    return <div className="min-h-screen relative w-full">
        <div className="absolute w-full space-y-5 px-6">
            <header className="flex items-center gap-4 backdrop-blur-md border-b p-7.5">
                <SidebarTrigger className="hover:bg-accent" />
                <h1 className="text-2xl font-bold">Transaction History</h1>
            </header>

            <div className="gap-y-6">
                {/* Search Section */}
                <Card className="backdrop-blur-xl border-border">
                    <CardHeader>
                        <CardTitle>Wallet Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input type="text"
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                    placeholder="Enter Wallet Address..."
                                    className="pl-10 placeholder-muted-foreground focus-visible:border-primary focus-visible:ring-primary" />
                            </div>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                                disabled={!walletAddress.trim()}>Search</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction List */}
            <Card className="backdrop-blur-xl">
                <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? <Loader />
                        :
                        (
                            transactions.data.length === 0 ? (
                                <div className="flex flex-col justify-center items-center">
                                    <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">No Transactions Found</h3>
                                    <p className="text-muted-foreground">This wallet doesn't have any transaction history yet.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="text-muted-foreground">Datetime</TableHead>
                                            <TableHead className="text-muted-foreground">Type</TableHead>
                                            <TableHead className="text-muted-foreground text-center">Asset (s)</TableHead>
                                            <TableHead className="text-muted-foreground">Fees</TableHead>
                                            <TableHead className="text-muted-foreground">Signature</TableHead>
                                            <TableHead className="text-muted-foreground">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.data.map((tx: any) => (
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
                                        ))}
                                    </TableBody>
                                </Table>
                            )
                        )
                    }
                </CardContent>
            </Card>
        </div>

        {/* {
            selectedTransaction && <TransactionDetailsDialogBox
                transaction={selectedTransaction}
                open={dialogueOpen}
                onOpenChange={setDialogueOpen}
            />
        } */}
    </div >
}