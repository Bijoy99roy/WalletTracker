
import { useHeliusTx } from '../hooks/useHeliusTx';


const TxList = ({ wallet }: { wallet: string }) => {
    const { data: txs, isLoading, error } = useHeliusTx(wallet, 1000);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to load transactions.</p>;
    console.log("test")
    if (!isLoading) {
        console.log(1)
        console.log(txs)
    }

    console.log("DONE")

    return (
        <div className="space-y-4 bg-white">
            {/* {txs?.map((tx: any) => (
                <div key={tx.signature} className="border p-3 rounded-md shadow">
                    <div className="font-mono text-xs text-gray-500 truncate">
                        {tx.signature}
                    </div>
                    <div className="text-sm font-semibold">{tx.type}</div>
                    <div className="text-gray-700">{tx.description}</div>
                    <div className="text-xs text-gray-400">Fee: {tx.feeSOL} SOL</div>
                </div>
            ))} */}
        </div>
    );
};

export default TxList;
