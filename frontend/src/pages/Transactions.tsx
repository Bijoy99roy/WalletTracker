import { FormatAsset } from "@/components/FormatAsset";
import { Loader } from "@/components/Loader";
import { TableContent } from "@/components/TableContent";
import { TransactionDetailsDialogBox } from "@/components/TransactionDetailsDialogBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transactionColor, transactionIcons, type TxType } from "@/constants/transactionsIcons";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInfiniteTransactions, useTransactions } from "@/hooks/useTransactions";
import { getCurrentPrice } from "@/services/fetchPrices";
import { copyToClipboard, formatUnixTimestamp, openSolscan } from "@/utils/common";
import { CheckCheck, ChevronRight, Copy, ExternalLink, Search, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { useInView } from "react-intersection-observer";

export function Transactions() {
    const [searchParams] = useSearchParams();
    const [walletAddress, setWalletAddress] = useState(searchParams.get('wallet') || '')
    const [selectedTransaction, setSelectedTransaction] = useState(null)
    const [dialogueOpen, setDialogueOpen] = useState(false)
    const [clickCopy, setClickCopy] = useState(false)

    const { ref, inView } = useInView()
    const isMobile = useIsMobile()


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


    // const { data: transactions, isLoading, error } = useTransactions(walletAddress, 1, 10);
    const {
        data: transactions,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteTransactions(walletAddress, 20);
    useEffect(() => {
        if (inView) {
            console.log("Fetching")
            fetchNextPage();
            console.log("Fetched")
        }
    }, [fetchNextPage, inView])

    const allTransactions = transactions?.pages.flatMap(page => page) || [];
    const hasTransactions = allTransactions.length > 0;

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
                    {status === 'pending' ? <Loader />
                        :
                        (
                            !hasTransactions ? (
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
                                            <TableHead className="text-muted-foreground">Asset (s)</TableHead>
                                            <TableHead className="text-muted-foreground">Fees</TableHead>
                                            <TableHead className="text-muted-foreground">Signature</TableHead>
                                            <TableHead className="text-muted-foreground">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions?.pages.map((transaction, i) => (


                                            <TableContent key={i} transactions={transaction} handleTransactionClick={handleTransactionClick} setClickCopy={setClickCopy} clickCopy={clickCopy} />


                                        ))
                                        }

                                        {hasNextPage && (
                                            <TableRow ref={ref}>
                                                <TableCell colSpan={5} className="text-center">
                                                    {isFetchingNextPage ? "Loading more..." : "Scroll to load more"}
                                                </TableCell>
                                            </TableRow>
                                        )}

                                    </TableBody>
                                </Table>


                            )
                        )

                    }
                </CardContent>

            </Card>
        </div>
        {/* Only opens dialg if in mobile view */}
        {
            (selectedTransaction && isMobile) && <TransactionDetailsDialogBox
                transaction={selectedTransaction}
                open={dialogueOpen}
                onOpenChange={setDialogueOpen}
            />
        }
    </div >
}