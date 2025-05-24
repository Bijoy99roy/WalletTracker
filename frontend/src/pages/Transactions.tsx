import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeftRight, MoveDownLeft, MoveUpRight, Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"

export function Transactions() {
    const [searchParams] = useSearchParams();
    const [walletAddress, setWalletAddress] = useState(searchParams.get('wallet') || '')

    const transactionIcons = {
        "transfer": <MoveUpRight />,
        "receive": <MoveDownLeft />,
        "swap": <ArrowLeftRight />
    }

    return <div className="min-h-screen relative w-full">
        <div className="absolute w-full space-y-5 px-6">
            <header className="flex items-center gap-4">
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

                </CardContent>
            </Card>
        </div>
    </div>
}