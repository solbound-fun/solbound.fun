import React from 'react'

import { LogoSvg } from '@/components/svg/logo-svg'
import { UploadSvg } from '@/components/svg/upload-svg'
import { TriangleDownSvg } from '@/components/svg/triangle-down-svg'
import { font } from '@/pages/_app'

const ActionButton = ({ text }: { text: string }) => {
  return (
    <div className="w-full relative h-12 bg-[#00c4e5] rounded-[20px] border-2 border-[#3a3a3a] text-center items-center justify-center">
      <svg
        width="285"
        height="26"
        viewBox="0 0 285 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M290 25.9838L290 20C290 8.95431 281.046 1.2946e-06 270 5.3873e-07L20 -1.6569e-05C8.95432 -1.73249e-05 1.90376e-06 8.95429 6.70113e-07 20L0 26C1.23364e-06 14.9543 8.95432 5.99998 20 5.99998L270 6C281.04 6 289.991 14.9456 290 25.9838Z"
          fill="#5BE7FF"
        />
      </svg>

      <svg
        width="285"
        height="26"
        viewBox="0 0 285 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-2.77419e-09 0.0162029L-1.0273e-06 6C-2.9185e-06 17.0457 8.95429 26 20 26L270 26C281.046 26 290 17.0457 290 6L290 0C290 11.0457 281.046 20 270 20L20 20C8.95969 20 0.00875087 11.0544 -2.77419e-09 0.0162029Z"
          fill="#0898B0"
        />
      </svg>

      <div className="flex h-full w-full items-center justify-center">
        {text}
      </div>
    </div>
  )
}

export const MobileUi = () => {
  return (
    <div className="flex w-full h-full flex-col text-white tracking-wide relative">
      createPortal(
      <div
        className={`flex items-center justify-center  fixed inset-0 bg-black bg-opacity-50 z-[1000] backdrop-blur-sm px-4 sm:px-0 ${font.className} tracking-wide`}
      >
        <div
          className="w-[326px] text-sm px-6 py-6 bg-gray-600 rounded-3xl shadow backdrop-blur-[20px] flex-col justify-start items-start gap-8 flex"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-4">
              <img src="/ax-left.png" alt="logo" width={50} height={42} />
              Mine your own token address through solbound.fun!
              <br />
              Go to PC or web.
            </div>
            <div className="text-gray-300">
              You can customize your solana token address through our service.
              We provide service through PC or web.
            </div>
          </div>
        </div>
      </div>
      , document.body, )
      <div className="flex h-12 px-4 py-2 backdrop-blur-lg justify-start items-center gap-2.5 w-full">
        <div className="flex items-center gap-[10px] mr-auto">
          <img src="/logo.png" alt="logo" width={24} height={34} />
          <LogoSvg />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-[30px] text-2xl text-center text-white gap-1 mb-8">
        <img src="/ax-left.png" alt="ax-left" className="w-14 h-14" />
        Mine your own Soul-bound Memecoin!
      </div>
      <div className="flex w-full h-full px-4">
        <div className="mb-6 w-full flex h-full px-5 py-6 bg-[#dfecff]/20 rounded-2xl backdrop-blur-[20px] flex-col justify-center items-center gap-4">
          <div className="h-full text-sm w-full flex-col justify-start items-start text-right gap-3 flex">
            <div className="flex flex-row gap-2 justify-center">
              Mine your own address
              <div className="text-cyan-500 items-end font-semibold">
                Advance(optional)
              </div>
            </div>
            <textarea
              placeholder="Enter the last digits or letters for the address (up to 7 characters)."
              className="placeholder:text-sm placeholder:tracking-wide placeholder:font-semibold placeholder:text-white text-white text-sm self-stretch px-4 py-3.5 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex"
            />
          </div>

          <div className="h-full text-sm w-full flex-col justify-start items-start text-right gap-1.5 flex">
            <div className="flex flex-row gap-2 justify-center">Token name</div>
            <div className="placeholder:text-sm placeholder:tracking-wide placeholder:font-semibold placeholder:text-white text-white text-sm self-stretch h-8 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex" />
          </div>

          <div className="h-full text-sm w-full flex-col justify-start items-start text-right gap-1.5 flex">
            <div className="flex flex-row gap-2 justify-center">Ticker</div>
            <div className="placeholder:text-sm placeholder:tracking-wide placeholder:font-semibold placeholder:text-white text-white text-sm self-stretch h-8 bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex" />
          </div>

          <div className="h-full text-sm w-full flex-col justify-start items-start text-right gap-1.5 flex">
            <div className="flex flex-row gap-2 justify-center">
              Description
            </div>
            <textarea className="h-20 placeholder:text-sm placeholder:tracking-wide placeholder:font-semibold placeholder:text-white text-white text-sm self-stretch bg-[#dfecff]/30 rounded-xl flex-col justify-start items-start gap-2.5 flex" />
          </div>

          <div className="h-full text-sm w-full flex-col justify-start items-start text-right gap-1.5 flex">
            <div className="flex flex-row gap-2 justify-center">
              Image or Video
            </div>
            <div className="bg-[#dfecff]/30 p-4 pt-3.5 rounded-xl flex-col items-center justify-center gap-2.5 self-stretch inline-flex">
              <UploadSvg />
              <div className="text-center text-gray-200 font-semibold tracking-wide">
                Drag and drop an image or video
              </div>
            </div>
          </div>

          <div className="flex mr-auto text-sm gap-1 w-full h-full items-center text-cyan-500 font-semibold text-right">
            Show more options
            <TriangleDownSvg className="w-3 h-3" />
          </div>

          <div className="flex mt-2 w-full">
            <ActionButton text="Mine Your Coin" />
          </div>
        </div>
      </div>
    </div>
  )
}
