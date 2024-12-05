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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#000" />

        <title>solbound.fun</title>
        <meta name="description" content="Mine your own Soul-bound Memecoin!" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://solbound.fun/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="solbound.fun" />
        <meta
          property="og:description"
          content="Mine your own Soul-bound Memecoin!"
        />
        <meta
          property="og:image"
          content="https://solbound.fun/twitter-card.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@SolBoundFun" />
        <meta property="twitter:title" content="SolBoundFun" />
        <meta
          property="twitter:description"
          content="Mine your own Soul-bound Memecoin!"
        />
        <meta
          name="twitter:image"
          content="https://solbound.fun/twitter-card.png"
        />
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
