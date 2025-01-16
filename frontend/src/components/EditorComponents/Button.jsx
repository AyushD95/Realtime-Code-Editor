import React from 'react'

const Button = ({ onCopy, onLeave}) => {
  return (
    <div className="flex items-center justify-center lg:gap-16 gap-16 mb-5 md:gap-10 sm:gap-8"> 
  <button
    className="text-xl font-mono text-homeText border-1.5 border-websiteBg 
             bg-shareBtn lg:h-10 lg:w-28 w-28 h-12 mt-8 lg:mt-9 rounded-3xl 
             cursor-pointer md:h-8 md:w-20 sm:h-6 sm:w-16"
    onClick={onCopy}
  >
    Share
  </button>
  <button
    className="text-xl font-mono text-homeText border-1.5 border-websiteBg 
             bg-joinBtn lg:h-10 lg:w-28 w-28 h-12 mt-8 lg:mt-9 rounded-3xl 
             cursor-pointer md:h-8 md:w-20 sm:h-6 sm:w-16"
    onClick={onLeave}
  >
    Leave
  </button>
</div>
  )
}

export default Button
