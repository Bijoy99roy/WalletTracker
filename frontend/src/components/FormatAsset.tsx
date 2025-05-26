import { ChevronRight } from "lucide-react"

export function FormatAsset(transaction: any) {

    if (!transaction.tokenTransfers.length) {
        return <div className="font-medium flex justify-center items-center"><img className="rounded-full w-10 h-10 mr-2" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" />SOL {transaction.solSent ? transaction.solSent : transaction.solReceived}</div>
    } else {
        if ((transaction.tokenTransfers[0].sent > 0 && transaction.tokenTransfers[0].received > 0) || (transaction.tokenTransfers[1].sent > 0 && transaction.tokenTransfers[1].received > 0)) {
            if (transaction.tokenTransfers[0].sent && transaction.tokenTransfers[0].received) {
                return <div className="font-medium flex justify-center items-center"><img src={transaction.tokenTransfers[1].logoUrl} className="rounded-full w-10 h-10 mr-2" />{transaction.tokenTransfers[1].symbol} {transaction.tokenTransfers[1].sent} <ChevronRight className="ml-2" />  <img src={transaction.tokenTransfers[0].logoUrl} className="rounded-full w-10 h-10 mx-2" />{transaction.tokenTransfers[0].symbol} {transaction.tokenTransfers[0].received}</div>
            }
        }
        return <div className="font-medium flex justify-center items-center"><img src={transaction.tokenTransfers[0].logoUrl} className="rounded-full w-10 h-10 mr-2" />{transaction.tokenTransfers[0].symbol} {transaction.tokenTransfers[0].sent} <ChevronRight className="ml-2" />  <img src={transaction.tokenTransfers[1].logoUrl} className="rounded-full w-10 h-10 mx-2" />{transaction.tokenTransfers[1].symbol} {transaction.tokenTransfers[1].received}</div>

    }

}