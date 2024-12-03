import React, { FC, useMemo } from 'react'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import dynamic from 'next/dynamic'
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import '@solana/wallet-adapter-react-ui/styles.css'
import Head from 'next/head'
import localFont from 'next/font/local'

const WalletWrapper: FC = ({ children }: { children: React.ReactNode }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network],
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export const font = localFont({
  src: '../public/pixelkart-regular-webfont.woff2',
  variable: '--font-pixel',
})

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>solbound.fun</title>
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className={`${font.className} font-pixel`}>
        <div className="bg-[url('../public/background.jpg')] bg-fixed bg-center bg-no-repeat min-h-[100vh] h-full">
          <WalletWrapper>
            <Component {...pageProps} />
          </WalletWrapper>
        </div>
      </div>
    </>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})
