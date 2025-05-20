import { useState } from 'react'
import './App.css'
import TxList from './components/TxList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const [wallet, setWallet] = useState("");
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className='bg-slate-600'>
        <input type="text" onChange={(e) => setWallet(e.target.value)} className='border m-5 border-white bg-white' />
        {wallet ? <TxList wallet={wallet} /> : ""}
      </div>
    </QueryClientProvider>
  )
}

export default App
