import React, { useMemo } from 'react'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import dynamic from 'next/dynamic'
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import '@solana/wallet-adapter-react-ui/styles.css'
import Head from 'next/head'
import localFont from 'next/font/local'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RPC_URL } from '@/constants/rpc'

const queryClient = new QueryClient()
export const font = localFont({
  src: '../public/pixelkart-regular-webfont.woff2',
  variable: '--font-pixel',
})

function App({ Component, pageProps }: AppProps) {
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [])

  return (
    <>
      <Head>
        <title>solbound.fun</title>
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <div className={`${font.className} font-pixel`}>
          <div className="bg-[url('../public/background.jpg')] bg-fixed bg-center bg-no-repeat min-h-[100vh] h-full">
            <ConnectionProvider endpoint={RPC_URL}>
              <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                  <Component {...pageProps} />
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          </div>
        </div>
      </QueryClientProvider>
    </>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
