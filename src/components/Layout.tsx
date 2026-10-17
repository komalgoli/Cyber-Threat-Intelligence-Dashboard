import { ReactNode, useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { SimulationNotice } from './SimulationNotice'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [syncTime, setSyncTime] = useState(417)
  const [frameTick, setFrameTick] = useState(0)

  useEffect(() => {
    const iv1 = setInterval(() => {
      setSyncTime(t => t + 1)
    }, 1000)
    const iv2 = setInterval(() => {
      setFrameTick(f => (f + 1) % 10000)
    }, 37)
    return () => {
      clearInterval(iv1)
      clearInterval(iv2)
    }
  }, [])

  const minutes = Math.floor(syncTime / 60)
  const seconds = syncTime % 60

  const verticalShift = (frameTick % 5) === 0 ? 0.4 : 0
  const jitterX = (frameTick % 11) === 0 ? 0.2 : 0

  return (
    <div
      className="min-h-screen flex flex-col bg-nightfall-bg grain-overlay scanlines pagewarp"
      style={{
        transform: `perspective(900px) translate(${jitterX}px, ${verticalShift}px) rotateX(0.15deg)`,
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-[9997] opacity-[0.06]"
           style={{
             backgroundImage:
               'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 3px), repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 4px)',
             mixBlendMode: 'overlay',
           }}
      />
      <SimulationNotice syncTime={`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`} />
      <Header />
      <main className="flex-1 relative">
        <div className="pointer-events-none absolute top-[118px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-nightfall-border/40 to-transparent z-[1]" />
        {children}
        <div className="pointer-events-none fixed bottom-0 right-0 w-[280px] h-[280px] z-[5] opacity-[0.08]"
             style={{
               background: 'radial-gradient(circle at 85% 90%, rgba(180,52,58,0.9), transparent 60%)',
               mixBlendMode: 'screen',
             }}
        />
      </main>
      <Footer />
    </div>
  )
}
