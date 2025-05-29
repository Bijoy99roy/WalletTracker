import { useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from './provider/theme-provider';
import { Transactions } from './pages/Transactions';
import { AppSidebar } from './components/AppSidebar';
import { Analytics } from './pages/Analytics';


const queryClient = new QueryClient()

function AppContent() {
  const location = useLocation()
  const showSidebar = location.pathname !== '/';
  return (
    <div className="max-h-screen flex w-full bg-background" >
      {
        showSidebar && <AppSidebar />
      }
      <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path='/analysis' element={<Analytics />} />
        </Routes>
      </main>

    </div >
  )
}


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <SidebarProvider>
            <AppContent />
          </SidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
