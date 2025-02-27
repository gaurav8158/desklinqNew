import React, { HTMLAttributes, ReactNode } from 'react'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string
  desc?: ReactNode
  isCenter?: boolean
}

const Heading: React.FC<HeadingProps> = ({
  children,
  desc,
  className = 'mb-10 text-neutral-900 dark:text-neutral-50',
  isCenter = false,
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading  w-full flex justify-center relative ${className}`}
    >
      <div
        className={
          isCenter
            ? 'text-center w-full max-w-2xl mx-auto mb-4'
            : 'max-w-2xl text-center'
        }
      >
        <h2
          className={`md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold`}
          {...args}
        >
          {children || `Section Heading`}
        </h2>
        {desc && (
          <span className="block mt-2 md:mt-3 font-normal text-sm text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
    </div>
  )
}

export default Heading
