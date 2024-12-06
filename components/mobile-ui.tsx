import React, { useState } from 'react'
import { createPortal } from 'react-dom'

import { LogoSvg } from '@/components/svg/logo-svg'
import { UploadSvg } from '@/components/svg/upload-svg'
import { TriangleDownSvg } from '@/components/svg/triangle-down-svg'
import { font } from '@/pages/_app'

const ActionButton = ({ text }: { text: string }) => {
  return (
    <div className="flex w-full relative h-11 bg-gray-400 rounded-[20px] border-1 border-white text-center items-center justify-center">
      <div className="flex h-full w-full items-center justify-center">
        {text}
      </div>
    </div>
  )
}

export const MobileUi = () => {
  const [close, setClose] = useState(false)

  return (
    <div className="flex w-full h-full flex-col text-white tracking-wide relative">
      {!close ? (
        <>
          {createPortal(
            <div
              className={`flex items-center justify-center  fixed inset-0 bg-black bg-opacity-50 z-[1000] backdrop-blur-sm px-4 sm:px-0 ${font.className} tracking-wide`}
            >
              <div
                className="w-[326px] text-sm px-6 py-6 bg-gray-600 rounded-3xl shadow backdrop-blur-[20px] flex-col justify-start items-start gap-8 flex"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col gap-3 text-white font-semibold">
                  <div className="flex text-white font-bold flex-row gap-4">
                    <img src="/ax-left.png" alt="logo" width={50} height={42} />
                    Mine your soul-bound memecoin at solbound.fun.
                    <br />
                    Go to PC or web.
                  </div>
                  <div className="text-gray-300 gap-1 flex flex-col">
                    Launch your own soul-bound memecoin with a customized token
                    address using our service.
                    <div className="text-cyan-500 font-bold">
                      Note: Our service is not available on mobile.
                    </div>
                  </div>

                  <button onClick={() => setClose(true)}>
                    <ActionButton text="OK, I want to explore first." />
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
