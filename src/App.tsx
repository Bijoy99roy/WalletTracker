import { useState } from 'react'
import './App.css'
import TxList from './components/TxList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import data from './components/add.json'; // or parsed JSON from the file
import { parseSolanaActivity } from './services/filterTransactions';
import { calculateTokenHoldings } from './services/handleAssets';
import { TokenCost } from './components/TokenCost';

function App() {
  const [wallet, setWallet] = useState("");
  const queryClient = new QueryClient()

  const myAddress = 'Ejmh9QMRdEE87qw7a2JpmMBuqzX4yxMLt2qzhEZ4xXFu';

  const activity = parseSolanaActivity(data, myAddress);
  const balances = calculateTokenHoldings(activity);

  // const positiveAssets = balances.filter(asset => asset.netAmount > 0);
  const solana = "So11111111111111111111111111111111111111112";
  console.log('Transfers:', activity.transfers);
  console.log('Swaps:', activity.swaps);
  console.log('NFT Activity:', activity.nftTransfers);
  console.log("Balance:", balances)

  return (
    <QueryClientProvider client={queryClient}>
      <div className='bg-slate-600'>
        <input type="text" onChange={(e) => setWallet(e.target.value)} className='border m-5 border-white bg-white' />
        {wallet ? <TxList wallet={wallet} /> : ""}
        <TokenCost wallet={solana} />
      </div>
    </QueryClientProvider>
  )
}

export default App
