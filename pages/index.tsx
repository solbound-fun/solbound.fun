import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { createPortal } from 'react-dom'

import { LogoSvg } from '@/components/svg/logo-svg'
import { WalletButton } from '@/components/button/wallet-button'
import { UploadSvg } from '@/components/svg/upload-svg'
import { TriangleDownSvg } from '@/components/svg/triangle-down-svg'
import { font } from '@/pages/_app'
import { SolanaLogoSvg } from '@/components/svg/solana-logo-svg'

export default function Home() {
  const [showMoreOptions, setShowMoreOptions] = React.useState(false)
  const [showBuyModal, setShowBuyModal] = React.useState(false)

  const { publicKey, signTransaction, connected } = useWallet()

  return (
    <div className="flex flex-col w-full items-center">
      {showBuyModal ? (
        <>
          {createPortal(
            <div
              onClick={() => setShowBuyModal(false)}
              className={`flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-[1000] backdrop-blur-sm px-4 sm:px-0 ${font.className} tracking-wide`}
            >
              <div
                className="w-[604px] h-full max-h-[360px] px-8 py-9 bg-[#dfecff]/20 rounded-3xl shadow backdrop-blur-[20px] flex-col justify-start items-start gap-12 flex"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col items-start gap-8 self-stretch">
                    <div className="flex flex-col items-start gap-6 self-stretch text-white text-xl font-bold">
                      Choose how many [TOKEN] you want to buy (optional)
                    </div>
                    <div className="text-gray-300 text-sm font-normal">
                      Tip: It’s optional but buying a small amount of coins
                      helps protect your coin from snipers!
                    </div>
                    <div className="w-full flex relative">
                      <input
                        placeholder="0.0"
                        className="h-12 placeholder:text-white w-full px-6 py-[18px] bg-[#dfecff]/30 rounded-2xl justify-start items-start gap-2.5 inline-flex"
                      />
                      <div className="flex mr-auto absolute top-2.5 right-4 items-center text-white justify-center gap-2">
                        <SolanaLogoSvg />
                        SOL
                      </div>
                    </div>
                  </div>
                  <button className="relative w-[545px] h-16 items-center justify-center bg-[#00c4e5] rounded-[20px] border-2 border-[#3a3a3a]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="540"
                      height="26"
                      viewBox="0 0 540 26"
                      fill="none"
                      className="absolute top-0"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M540 25.9838L540 20C540 8.95431 531.046 1.57828e-06 520 1.17235e-06L20 -1.72026e-05C8.95429 -1.76086e-05 3.54493e-06 8.95429 1.2478e-06 20L0 26C2.29713e-06 14.9543 8.95429 5.99998 20 5.99998L520 6C531.04 6 539.991 14.9456 540 25.9838Z"
                        fill="#5BE7FF"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="540"
                      height="26"
                      viewBox="0 0 540 26"
                      fill="none"
                      className="absolute bottom-0"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M-2.77419e-09 0.0162029L-1.0273e-06 6C-2.9185e-06 17.0457 8.95429 26 20 26L520 26C531.046 26 540 17.0457 540 6L540 0C540 11.0457 531.046 20 520 20L20 20C8.95969 20 0.00875087 11.0544 -2.77419e-09 0.0162029Z"
                        fill="#0898B0"
                      />
                    </svg>
                    Mine Your Coin
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )}
        </>
      ) : (
        <></>
      )}

      <div className="flex flex-row w-full h-[60px] pl-8 pr-6 py-5 justify-between items-center">
        <div className="flex gap-[10px] mr-auto">
          <img src="/logo.png" alt="logo" width={24} height={34} />
          <LogoSvg />
        </div>
        <WalletButton
          connected={connected}
          publicKey={publicKey}
          className="flex ml-auto"
        />
      </div>

      <div className="mb-14 flex flex-col gap-4 px-5 py-6 h-fit w-[600px] bg-[#dfecff]/20 rounded-2xl backdrop-blur-[20px] justify-start items-start">
        {/*address*/}
        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-white text-base font-bold tracking-wide">
            Mine your own address
          </div>
          <input
            placeholder="Input the last digits or alphabets of the address (up to 7 digits)"
            className="placeholder:tracking-wide placeholder:font-semibold placeholder:text-white text-white text-sm self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
          />
          <div>
            <span className="text-gray-400 text-sm font-normal tracking-wide">
              If you input{' '}
            </span>
            <span className="text-white text-sm font-normal tracking-wide">
              ‘minefun’
            </span>
            <span className="text-gray-400 text-sm font-normal tracking-wide">
              , the token address will be{' '}
            </span>
            <span className="text-white text-sm font-normal tracking-wide">
              ‘e9az7...minefun’{' '}
            </span>
            <span className="text-gray-400 text-sm font-normal tracking-wide">
              to pump.fun
            </span>
          </div>
        </div>

        {/*name*/}
        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-white text-base font-bold tracking-wide">
            Token name
          </div>
          <input className="text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex" />
        </div>

        {/*ticker*/}
        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-white text-base font-bold tracking-wide">
            Ticker
          </div>
          <input className="text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex" />
        </div>

        {/*description*/}
        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-white text-base font-bold tracking-wide">
            Description
          </div>
          <textarea className="h-32 text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex" />
        </div>

        {/*video or image*/}
        <div className="self-stretch flex-col justify-center items-center gap-2 flex">
          <div className="self-stretch text-white text-base font-bold tracking-wide">
            Image or Video
          </div>
          <div className="h-32 text-gray-200 text-sm font-semibold self-stretch p-6 bg-[#dfecff]/30 rounded-xl flex-col justify-center items-center gap-6 flex">
            <div className="self-stretch justify-center items-center gap-2 inline-flex">
              <UploadSvg />
              <div className="text-center text-gray-200 text-xl font-semibold tracking-wide">
                Drag and drop an image or video
              </div>
            </div>

            <div className="w-40 h-8 px-3 py-2.5 rounded-[10px] border border-white items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 text-center text-white text-sm font-semibold tracking-wide">
                Select File
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowMoreOptions(!showMoreOptions)}
          className="group flex flex-row gap-3 items-center justify-center text-cyan-400 text-base font-bold tracking-wide"
        >
          Show more options
          <TriangleDownSvg
            className={`transform transition duration-300 ${showMoreOptions ? 'rotate-180' : ''}`}
          />
        </button>

        {showMoreOptions && (
          <>
            {/*twitter*/}
            <div className="mt-2 self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch text-white text-base placeholder:font-bold placeholder:tracking-wide">
                Twitter
              </div>
              <input
                placeholder="(optional)"
                className="placeholder:font-bold placeholder:text-white text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
              />
            </div>

            {/*Telegram*/}
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch text-white text-base placeholder:font-bold placeholder:tracking-wide">
                Telegram
              </div>
              <input
                placeholder="(optional)"
                className="placeholder:font-bold placeholder:text-white text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
              />
            </div>

            {/*Website*/}
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch text-white text-base placeholder:font-bold placeholder:tracking-wide">
                Website
              </div>
              <input
                placeholder="(optional)"
                className="placeholder:font-bold placeholder:text-white text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
              />
            </div>
          </>
        )}

        <button
          onClick={() => {
            setShowBuyModal(true)
          }}
          className="mt-4 flex h-16 w-[545px] items-center justify-center relative bg-[#00c4e5] rounded-[20px] border-2 border-[#3a3a3a]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="540"
            height="26"
            viewBox="0 0 540 26"
            fill="none"
            className="absolute top-0"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M540 25.9838L540 20C540 8.95431 531.046 1.57828e-06 520 1.17235e-06L20 -1.72026e-05C8.95429 -1.76086e-05 3.54493e-06 8.95429 1.2478e-06 20L0 26C2.29713e-06 14.9543 8.95429 5.99998 20 5.99998L520 6C531.04 6 539.991 14.9456 540 25.9838Z"
              fill="#5BE7FF"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="540"
            height="26"
            viewBox="0 0 540 26"
            fill="none"
            className="absolute bottom-0"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M-2.77419e-09 0.0162029L-1.0273e-06 6C-2.9185e-06 17.0457 8.95429 26 20 26L520 26C531.046 26 540 17.0457 540 6L540 0C540 11.0457 531.046 20 520 20L20 20C8.95969 20 0.00875087 11.0544 -2.77419e-09 0.0162029Z"
              fill="#0898B0"
            />
          </svg>
          <div className="text-white text-xl font-bold tracking-wide">
            Create Coin
          </div>
        </button>
      </div>
    </div>
  )
}
