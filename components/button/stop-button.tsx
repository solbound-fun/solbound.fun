import React from 'react'

export type StopButtonProps = {
  disabled: boolean
  onClick: () => void
  text: string
}

export const StopButton = ({
  disabled,
  onClick,
  text,
  ...props
}: StopButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="group mt-4 flex h-16 w-[545px] items-center justify-center relative bg-[#e50000] disabled:bg-gray-400 disabled:text-gray-950 rounded-[20px] border-2 border-[#3a3a3a] disabled:border-gray-400"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="540"
        height="26"
        viewBox="0 0 540 26"
        fill="none"
        className="absolute top-0 flex fill-red-400 group-disabled:fill-gray-300"
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
        className="absolute bottom-0 flex fill-red-400 group-disabled:fill-gray-300"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-2.77419e-09 0.0162029L-1.0273e-06 6C-2.9185e-06 17.0457 8.95429 26 20 26L520 26C531.046 26 540 17.0457 540 6L540 0C540 11.0457 531.046 20 520 20L20 20C8.95969 20 0.00875087 11.0544 -2.77419e-09 0.0162029Z"
        />
      </svg>
      <div className="text-white text-xl font-bold tracking-wide">{text}</div>
    </button>
  )
}
