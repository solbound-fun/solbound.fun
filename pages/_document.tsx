import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
