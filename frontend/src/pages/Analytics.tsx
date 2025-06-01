import { Footer } from "@/components/Footer";
import { Loader } from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { DollarSign, PieChart, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";


export interface Token {
    symbol: string;
    logoUrl: string;
    price: number;
    amount: number;
}

export interface TokenInfo {
    [mintAddress: string]: Token;
}

export function Analytics() {
    const [searchParams] = useSearchParams();
    const [walletAddress, setWalletAddress] = useState(searchParams.get('wallet') || '')
    const { data: tokenInfo, isLoading, error } = useTokenInfo(walletAddress);

    const { totalBalance, tokenList } = useMemo(() => {
        let balance = 0;
        const tokens: Token[] = [];

        if (tokenInfo) {
            console.log(tokenInfo)
            balance += tokenInfo.nativeBalance || 0;

            const tokenInfoObject: TokenInfo = tokenInfo.tokenInfo;
            for (const token of Object.values(tokenInfoObject)) {
                balance += token.price || 0;
                tokens.push(token);
            }
        }

        return { totalBalance: balance, tokenList: tokens };
    }, [tokenInfo]);



    if (isLoading) return (
        <div className="flex items-center justify-center w-full h-full">
            <Loader />
        </div>
    );
    return (


        <div className="relative w-full">
            <div className=" w-full px-6 space-y-5">
                <header className="relative flex items-center backdrop-blur-md p-7.5 border-b">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="text-foreground hover:bg-accent" />
                        <h1 className="text-2xl font-bold">Portfolio Analysis</h1>
                    </div>

                </header>
                <div className="p-6 space-y-8">
                    <Card className="backdrop-blur-md">
                        <CardContent>
                            <div className="flex  items-center justify-center gap-2 mb-3">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-muted-foreground">Current Balance</h2>
                            </div>
                            <div className="flex items-center justify-center">

                                <p className="text-4xl font-bold"> ${totalBalance.toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <PieChart className="w-6 h-6" />
                                <h3 className="font-bold">Portfolio Breakdown</h3>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {tokenList.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <Wallet className="w-20 h-20 text-muted-foreground mb-6" />
                                    <h3 className="text-2xl font-semibold mb-3">No Portfolio Data</h3>
                                    <p className="text-muted-foreground text-lg">This wallet doesn't hold any tokens yet.</p>
                                </div>
                            ) : (
                                // <div className="space-y-4">
                                <ScrollArea className="w-full h-96 sm:h-[600px] md:h-[500px]">
                                    {tokenList.map((token, i) => (
                                        <div key={i} className="flex items-center justify-between py-6 px-3 rounded-xl bg-accent/20 border border-border hover:bg-accent/30 transition-colors my-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                                    {/* TODO: Replace with image later */}
                                                    <span className="font-bold">{token.symbol}</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-lg text-left">{token.symbol}</p>
                                                    <p className="text-muted-foreground text-left ">{token.amount.toLocaleString()} Tokens</p>
                                                </div>

                                            </div>
                                            <div>
                                                <p className="font-semibold text-lg">
                                                    ${token.price.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                                // </div> 
                            )}
                        </CardContent>
                    </Card>

                </div>

            </div>
            <Footer />
        </div>

    )
}