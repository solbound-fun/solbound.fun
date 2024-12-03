import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey } from '@solana/web3.js'

import { shortAddress } from '@/utils/address'

export const WalletButton = ({
  connected,
  publicKey,
}: {
  connected: boolean
  publicKey: PublicKey | null
}) => {
  return (
    <WalletMultiButton
      style={{
        background: 'transparent',
        padding: '0',
        font: 'inherit',
      }}
    >
      {!connected ? (
        <div className="flex items-center justify-center tracking-wide text-white relative w-[185px] h-10 shrink-0 bg-[#00c4e5] rounded-xl border-2 border-[#3a3a3a]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="180"
            height="16"
            viewBox="0 0 180 16"
            fill="none"
            className="absolute top-0"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M180 16L180 12C180 5.37257 174.627 -1.38211e-05 168 -1.44005e-05L12 -2.80385e-05C5.37259 -2.86179e-05 9.29079e-07 5.37255 3.49692e-07 12L0 16C5.79388e-07 9.37256 5.37259 3.99999 12 3.99999L168 4C174.627 4 180 9.37258 180 16Z"
              fill="#5BE7FF"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="180"
            height="16"
            viewBox="0 0 180 16"
            fill="none"
            className="absolute bottom-0"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0V4C0 10.6274 5.37258 16 12 16H168C174.627 16 180 10.6274 180 4V0C180 6.62742 174.627 12 168 12H12C5.37258 12 0 6.62742 0 0Z"
              fill="#0898B0"
            />
          </svg>
          Connect Wallet
        </div>
      ) : (
        <>{shortAddress(publicKey?.toString() ?? '')}</>
      )}
    </WalletMultiButton>
  )
}
