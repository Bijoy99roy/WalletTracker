import { useTokenPrices } from "../hooks/useTokenPrice";

export const TokenCost = ({ wallet }: { wallet: string }) => {
    const { data: txs, isLoading, error } = useTokenPrices(wallet);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load transactions.</p>;
    console.log("test")
    if (!isLoading) {
        console.log(1)
        console.log(txs)
        console.log("Solana balance: ", 0.213759303 * txs.data.value)
    }

    console.log("DONE")

    return (
        <div className="space-y-4 bg-white">

        </div>
    );
};