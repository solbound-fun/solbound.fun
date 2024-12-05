import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
          content="width=device-width,initial-scale=1,maximum-scale=1,https://solbound.fun/twitter-card.png"
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
          content="width=device-width,initial-scale=1,maximum-scale=1,https://solbound.fun/twitter-card.png"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-93643B0CS0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-93643B0CS0');
        `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
