import React, { useCallback, useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { createPortal } from 'react-dom'
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { AnchorProvider, Wallet } from '@coral-xyz/anchor'
import { FileUploader } from 'react-drag-drop-files'
import Image from 'next/image'

import { LogoSvg } from '@/components/svg/logo-svg'
import { WalletButton } from '@/components/button/wallet-button'
import { UploadSvg } from '@/components/svg/upload-svg'
import { TriangleDownSvg } from '@/components/svg/triangle-down-svg'
import { font } from '@/pages/_app'
import { SolanaLogoSvg } from '@/components/svg/solana-logo-svg'
import { DEFAULT_TOKEN_INFO, type TokenInfo } from '@/model/token-info'
import { COMMITMENT_LEVEL } from '@/constants/commitment-level'
import { PumpFunSDK } from '@/model/pumpfun'

export default function Home() {
  const [mount, setMount] = React.useState(false)
  const [token, setToken] = React.useState<TokenInfo>(DEFAULT_TOKEN_INFO)
  const [showMoreOptions, setShowMoreOptions] = React.useState(false)
  const [showBuyModal, setShowBuyModal] = React.useState(false)
  const [file, setFile] = useState<Blob | null>(null)
  const [fileUploadError, setFileUploadError] = useState<string | null>(null)
  const [blobUri, setBlobUri] = useState(null)
  const [showPrivateKeyInput, setShowPrivateKeyInput] = useState(false)

  const { connection } = useConnection()
  const { publicKey, wallet, connected, sendTransaction } = useWallet()

  // do once
  useEffect(
    () => {
      const token = localStorage.getItem('token')
      if (token) {
        setToken(JSON.parse(token))
      }
      setMount(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    if (mount) {
      localStorage.setItem('token', JSON.stringify(token))
    }
  }, [mount, token])

  const mint = useCallback(async () => {
    if (token && wallet && publicKey && file) {
      try {
        // todo: remove it
        const mint = Keypair.generate()
        setToken((prev) => ({
          ...prev,
          privateKey: mint.secretKey.toString(),
        }))
        // ---

        const provider = new AnchorProvider(
          connection as Connection,
          wallet as unknown as Wallet,
          {
            commitment: COMMITMENT_LEVEL,
            preflightCommitment: COMMITMENT_LEVEL,
            skipPreflight: false,
          },
        )
        const sdk = new PumpFunSDK(provider)
        const transaction = await sdk.createAndBuy(
          publicKey,
          mint,
          {
            name: token.name,
            symbol: token.ticker,
            description: token.description,
            file,
            twitter: token.twitter,
            telegram: token.telegram,
            website: token.website,
          },
          BigInt(Number(token.buyAmount) * LAMPORTS_PER_SOL),
        )

        const signature = await sendTransaction(transaction, connection, {
          signers: [mint],
        })
        console.log('signature', signature)
        window.open(
          `https://pump.fun/coin/${mint.publicKey.toBase58()}`,
          '_blank',
          'noopener,noreferrer',
        )
      } catch (e) {
        console.error(e)
      }
    }
  }, [token, wallet, publicKey, file, connection, sendTransaction])

  const convert = useCallback((privateKey: string) => {
    try {
      return Keypair.fromSecretKey(
        new Uint8Array(privateKey.split(',').map(Number)),
      ).publicKey.toBase58()
    } catch (e) {
      return null
    }
  }, [])

  return (
    <>
      <div className="flex md:hidden text-3xl text-white items-center justify-center h-[600px] text-center">
        Mobile is not supported yet
      </div>
      <div className="hidden flex-col w-full items-center md:flex">
        {showBuyModal ? (
          <>
            {createPortal(
              <div
                onClick={() => setShowBuyModal(false)}
                className={`flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-[1000] backdrop-blur-sm px-4 sm:px-0 ${font.className} tracking-wide`}
              >
                <div
                  className="w-[604px] h-full max-h-[360px] px-8 py-9 bg-gray-600 rounded-3xl shadow backdrop-blur-[20px] flex-col justify-start items-start gap-12 flex"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col items-start gap-8 self-stretch">
                      <div className="flex flex-col items-start gap-6 self-stretch text-white text-xl font-bold">
                        Choose how many [{token.name}] you want to buy
                        (optional)
                      </div>
                      <div className="text-gray-300 text-sm font-normal">
                        Tip: It’s optional but buying a small amount of coins
                        helps protect your coin from snipers!
                      </div>
                      <div className="w-full flex relative">
                        <input
                          value={token.buyAmount}
                          onChange={(e) => {
                            const newValue = (e.target as any).value.replace(
                              /[,a-zA-Z]/g,
                              '',
                            )
                            const regex = /^\d*\.?\d*$/
                            if (regex.test(newValue)) {
                              setToken((prev) => ({
                                ...prev,
                                buyAmount: newValue,
                              }))
                            }
                          }}
                          placeholder="0.0"
                          className="h-12 placeholder:text-white text-white w-full px-6 py-[18px] bg-[#dfecff]/30 rounded-2xl justify-start items-start gap-2.5 inline-flex"
                        />
                        <div className="flex mr-auto absolute top-2.5 right-4 items-center text-white justify-center gap-2">
                          <SolanaLogoSvg />
                          SOL
                        </div>
                      </div>
                    </div>
                    {wallet ? (
                      <button
                        onClick={mint}
                        className="relative text-white text-xl w-[545px] h-16 items-center justify-center bg-[#00c4e5] rounded-[20px] border-2 border-[#3a3a3a]"
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
                        Mine Your Coin
                      </button>
                    ) : (
                      <WalletButton connected={connected} publicKey={publicKey}>
                        <div className="flex relative text-white text-xl w-[545px] h-16 items-center justify-center bg-[#00c4e5] rounded-[20px] border-2 border-[#3a3a3a]">
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
                          Connect Wallet
                        </div>
                      </WalletButton>
                    )}
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
          <div className="flex ml-auto">
            <WalletButton connected={connected} publicKey={publicKey} />
          </div>
        </div>

        <div className="mb-14 flex flex-col gap-4 px-5 py-6 h-fit w-[600px] bg-[#dfecff]/20 rounded-2xl backdrop-blur-[20px] justify-start items-start">
          {showPrivateKeyInput ? (
            // set privatekey
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="flex flex-row gap-2">
                <div className="self-stretch text-white text-base font-bold tracking-wide">
                  Set your token private key
                </div>
                <button
                  onClick={() => {
                    setShowPrivateKeyInput(!showPrivateKeyInput)
                  }}
                  className="text-cyan-500 text-sm justify-end items-end font-semibold"
                >
                  Advance(optional)
                </button>
              </div>
              <textarea
                value={token.privateKey}
                onChange={(e) => {
                  setToken((prev) => ({
                    ...prev,
                    privateKey: (e.target as any).value,
                  }))
                }}
                placeholder="51,162,65,146,103,15,58,97,17,226,211,211,61,234,184,1,169,68,13,249,153,94,87,51,154,223,113,44,18,1,191,219,19,161,188,209,85,39,142,192,117,51,122,2,124,141,131,151,35,250,195,206,174,239,229,25,161,251,76,209,155,223,206,247"
                className="h-20 placeholder:tracking-wide placeholder:font-semibold placeholder:text-gray-200 text-white text-sm self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
              />
              <div className="flex flex-col gap-0.5">
                <div className="text-gray-400 text-sm font-normal tracking-wide">
                  If you set a token&apos;s private key, you don&apos;t need to
                  mine an address.
                </div>
                {convert(token.privateKey) ? (
                  <div className="text-cyan-500 font-bold text-sm tracking-wide">
                    You&apos;ll get token address: {convert(token.privateKey)}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            // postfix
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="flex flex-row gap-2">
                <div className="self-stretch text-white text-base font-bold tracking-wide">
                  Mine your own address
                </div>
                <button
                  onClick={() => {
                    setShowPrivateKeyInput(!showPrivateKeyInput)
                  }}
                  className="text-cyan-500 text-sm justify-end items-end font-semibold"
                >
                  Advance(optional)
                </button>
              </div>
              <input
                value={token.postfix}
                onChange={(e) => {
                  setToken((prev) => ({
                    ...prev,
                    postfix: (e.target as any).value,
                  }))
                }}
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
          )}

          {/*name*/}
          <div className="self-stretch flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch text-white text-base font-bold tracking-wide">
              Token name
            </div>
            <input
              value={token.name}
              onChange={(e) => {
                setToken((prev) => ({
                  ...prev,
                  name: (e.target as any).value,
                }))
              }}
              className="text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
            />
          </div>

          {/*ticker*/}
          <div className="self-stretch flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch text-white text-base font-bold tracking-wide">
              Ticker
            </div>
            <input
              value={token.ticker}
              onChange={(e) => {
                setToken((prev) => ({
                  ...prev,
                  ticker: (e.target as any).value,
                }))
              }}
              className="text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
            />
          </div>

          {/*description*/}
          <div className="self-stretch flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch text-white text-base font-bold tracking-wide">
              Description
            </div>
            <textarea
              value={token.description}
              onChange={(e) => {
                setToken((prev) => ({
                  ...prev,
                  description: (e.target as any).value,
                }))
              }}
              className="h-32 text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
            />
          </div>

          {/*video or image*/}
          <div className="self-stretch flex-col justify-center items-center gap-2 flex">
            <div className="self-stretch text-white text-base font-bold tracking-wide">
              Image or Video
            </div>
            <FileUploader
              types={['jpg', 'jpeg', 'png', 'gif', 'bmp', 'mp4', 'avi']}
              handleChange={(file: any) => {
                if (file) {
                  setFile(file)
                  // @ts-ignore
                  setBlobUri(window.URL.createObjectURL(file))
                }
              }}
              name="file"
              maxSize={10}
            >
              <div className="max-h-[300px] text-gray-200 text-sm font-semibold self-stretch p-6 bg-[#dfecff]/30 rounded-xl flex-col justify-center items-center gap-6 flex">
                {blobUri ? (
                  <div className="flex h-[300px] w-[300px]">
                    <Image
                      alt="image"
                      src={blobUri}
                      fill
                      className="h-32 w-32"
                    />
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </FileUploader>
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
                  value={token.twitter}
                  onChange={(e) => {
                    setToken((prev) => ({
                      ...prev,
                      twitter: (e.target as any).value,
                    }))
                  }}
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
                  value={token.telegram}
                  onChange={(e) => {
                    setToken((prev) => ({
                      ...prev,
                      telegram: (e.target as any).value,
                    }))
                  }}
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
                  value={token.website}
                  onChange={(e) => {
                    setToken((prev) => ({
                      ...prev,
                      website: (e.target as any).value,
                    }))
                  }}
                  placeholder="(optional)"
                  className="placeholder:font-bold placeholder:text-white text-white text-sm font-semibold self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
                />
              </div>
            </>
          )}

          <button
            disabled={
              token.postfix.length === 0 ||
              token.name.length === 0 ||
              token.ticker.length === 0 ||
              token.description.length === 0 ||
              file === null
            }
            onClick={() => {
              setShowBuyModal(true)
            }}
            className="group mt-4 flex h-16 w-[545px] items-center justify-center relative bg-[#00c4e5] disabled:bg-gray-400 disabled:text-gray-950 rounded-[20px] border-2 border-[#3a3a3a] disabled:border-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="540"
              height="26"
              viewBox="0 0 540 26"
              fill="none"
              className="absolute top-0 flex fill-[#5BE7FF] group-disabled:fill-gray-300"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M540 25.9838L540 20C540 8.95431 531.046 1.57828e-06 520 1.17235e-06L20 -1.72026e-05C8.95429 -1.76086e-05 3.54493e-06 8.95429 1.2478e-06 20L0 26C2.29713e-06 14.9543 8.95429 5.99998 20 5.99998L520 6C531.04 6 539.991 14.9456 540 25.9838Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="540"
              height="26"
              viewBox="0 0 540 26"
              fill="none"
              className="absolute bottom-0 flex fill-[#5BE7FF] group-disabled:fill-gray-300"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M-2.77419e-09 0.0162029L-1.0273e-06 6C-2.9185e-06 17.0457 8.95429 26 20 26L520 26C531.046 26 540 17.0457 540 6L540 0C540 11.0457 531.046 20 520 20L20 20C8.95969 20 0.00875087 11.0544 -2.77419e-09 0.0162029Z"
              />
            </svg>
            <div className="text-white text-xl font-bold tracking-wide">
              {token.postfix.length === 0
                ? 'Please input the address'
                : token.name.length === 0
                  ? 'Please input the token name'
                  : token.ticker.length === 0
                    ? 'Please input the ticker'
                    : token.description.length === 0
                      ? 'Please input the description'
                      : file === null
                        ? 'Please upload the image or video'
                        : 'Mine Your Coin'}
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
