import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', v => setProgress(Math.round(v * 100)))
  }, [scrollYProgress])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-gradient-to-r from-nightfall-red via-nightfall-amber to-nightfall-green"
        style={{ scaleX }}
      />
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2">
        <div className="relative w-10 h-10">
          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-nightfall-border"
              strokeWidth="3"
              stroke="currentColor"
              fill="transparent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              stroke="#b4343a"
              strokeWidth="3"
              strokeLinecap="round"
              fill="transparent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeDasharray={`${progress}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-nightfall-text">
            {progress}%
          </div>
        </div>
      </div>
    </>
  )
}
