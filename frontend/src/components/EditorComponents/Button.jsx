import React from 'react'

const Button = ({ onCopy, onLeave}) => {
  return (
    <div className="flex items-center justify-center lg:gap-16 gap-16 mb-5">
        <button
          className="text-xl font-mono text-homeText border-1.5 border-websiteBg
              bg-shareBtn lg:h-10 lg:w-28 w-28 h-12 mt-8 lg:mt-9 rounded-3xl 
              cursor-pointer"
          onClick={onCopy}
        >
          Share
        </button>
        <button
          className="text-xl font-mono text-homeText border-1.5 border-websiteBg
              bg-joinBtn lg:h-10 lg:w-28 w-28 h-12 mt-8 lg:mt-9 rounded-3xl 
              cursor-pointer"
    
          onClick={onLeave}
        >
          Leave
        </button>
      </div>
  )
}

export default Button
