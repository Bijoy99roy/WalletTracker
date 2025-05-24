import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function Home() {
    const [walletAddress, setWalletAddress] = useState("");
    const navigate = useNavigate()

    function handleSearch() {
        if (walletAddress.trim()) {
            navigate(`/transactions?wallet=${encodeURIComponent(walletAddress.trim())}`)
        }
    }

    return <div className="min-h-screen w-full bg-background relative">
        <AnimatedGridPattern
            numSquares={100}
            maxOpacity={0.2}
            duration={5}
            repeatDelay={5}
            className={cn(
                "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
            )}
        />
        <div className="absolute w-full">

            <header className="relative flex items-center justify-between p-6 backdrop-blur-md border-b">
                <SidebarTrigger className="text-foreground hover:bg-accent" />
                <div className="text-sm text-muted-foreground">
                    Track any Solana wallet address
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6">
                <div className="text-center mx-auto mb-12">
                    <h1 className="text-foreground font-bold text-5xl md:text-7xl mb-6">
                        Track Solana
                        <br />
                        <span className="text-primary">Wallets</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        Discover comprehensive analutics for any Solana wallet.
                        <br />
                        Portfolio insights, transactions and more.
                    </p>
                </div>

                {/* Search Section */}
                <div className="w-full max-w-2xl">
                    <Card className="backdrop-blur-xl">
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        type="text"
                                        placeholder="Enter Solana wallet address..."
                                        value={walletAddress}
                                        onChange={(e) => setWalletAddress(e.target.value)}
                                        className="pl-12 h-14 text-lg focus-visible:border-primary focus-visible:ring-primary selection:bg-gray-50"
                                    />
                                </div>
                                <Button className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg transition-all duration-200 disabled:opacity-50 cursor-pointer"
                                    disabled={!walletAddress.trim()}
                                    onClick={handleSearch}>
                                    Track Wallet
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    </div>
}