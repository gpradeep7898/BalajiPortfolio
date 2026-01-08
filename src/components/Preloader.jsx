import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Preloader = ({ onFinish }) => {
  const preloaderRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      preloaderRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        delay: 0.1,
        duration: 0.2,
        ease: 'power2.inOut',
        onComplete: onFinish
      }
    )
  }, [onFinish])

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-off-white">
      <div className="glass-loader" />
      <div className="mt-12 w-full flex justify-center">
        <span className="text-accent text-lg font-mono tracking-widest animate-pulse">Loading Information...</span>
      </div>
    </div>
  )
}

export default Preloader 