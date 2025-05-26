import { ChevronRight } from "lucide-react";

export function FormatAsset(transaction: any) {
    const logo = (url: string) => (
        <img src={url} className="rounded-full w-10 h-10 mr-2" />
    );

    const tokenDisplay = (logoUrl: string, symbol: string, amount: number) => (
        <div className="flex items-center">
            {logo(logoUrl)}
            <span>{symbol} {amount.toFixed(6)}</span>
        </div>
    );

    if (!transaction.tokenTransfers.length) {
        return (
            <div className="font-medium flex items-center">
                {logo("https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png")}
                SOL {transaction.solSent ? transaction.solSent.toFixed(9) : transaction.solReceived.toFixed(9)}
            </div>
        );
    }

    if (transaction.tokenTransfers.length === 1) {
        const t = transaction.tokenTransfers[0];
        return (
            <div className="font-medium flex items-center">
                {logo(t.logoUrl)}
                {t.symbol} {t.sent ? t.sent.toFixed(6) : t.received.toFixed(6)}
            </div>
        );
    }
    const [a, b] = transaction.tokenTransfers;
    const isReceiveType = (x: any) => x.sent > 0 && x.received > 0;
    const receive = isReceiveType(a) ? a : b;
    const send = receive === a ? b : a;

    return (
        <div className="grid grid-cols-3 items-center w-full max-w-[700px]">
            <div className="flex items-center">{tokenDisplay(send.logoUrl, send.symbol, send.sent)}</div>
            <div className="flex justify-center"><ChevronRight /></div>
            <div className="flex items-center justify-start">{tokenDisplay(receive.logoUrl, receive.symbol, receive.received)}</div>
        </div>
    );
}
