import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Preloader = ({ onFinish }) => {
  const preloaderRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      preloaderRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        delay: 2.2,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
          onFinish();
        }
      }
    );
  }, [onFinish]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-off-white"
    >
      <div className="loader"></div>
      <div className="mt-6">
        <span className="text-charcoal text-sm font-sans tracking-wide">
          Loading assets...
        </span>
      </div>
    </div>
  );
};

export default Preloader; 