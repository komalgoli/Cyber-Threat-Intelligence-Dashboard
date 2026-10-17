import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Signal, Activity, FileWarning, Shield, Globe, Eye, Clock, ArrowLeftRight, AlertOctagon, HardDrive, Network } from 'lucide-react'
import { getFeedEntriesDoubled } from '../data/intelligence'

const typeConfig = {
  INDICATOR: { Icon: Signal, color: 'text-nightfall-red' },
  CORRELATION: { Icon: ArrowLeftRight, color: 'text-nightfall-blue' },
  PROFILE: { Icon: Activity, color: 'text-nightfall-amber' },
  EVIDENCE: { Icon: Shield, color: 'text-nightfall-green' },
  DOMAIN: { Icon: Globe, color: 'text-nightfall-blue' },
  REVIEW: { Icon: Eye, color: 'text-nightfall-amber' },
  SOURCE: { Icon: FileWarning, color: 'text-nightfall-red' },
  WALLET: { Icon: Clock, color: 'text-nightfall-amber' },
  NODE: { Icon: Network, color: 'text-nightfall-green' },
  STORAGE: { Icon: HardDrive, color: 'text-nightfall-blue' },
  ALERT: { Icon: AlertOctagon, color: 'text-nightfall-red' },
}

function garbleText(s: string, intensity: number = 0.04): string {
  const garbleChars = '▓▒░█▀▄■□▪▫�¿'
  let out = ''
  for (let i = 0; i < s.length; i++) {
    if (Math.random() < intensity) {
      out += garbleChars[Math.floor(Math.random() * garbleChars.length)]
    } else {
      out += s[i]
    }
  }
  return out
}

function jitterTimestamp(ts: string): string {
  if (Math.random() < 0.12) {
    const parts = ts.split(':')
    const ss = parseInt(parts[2] || '00', 10) + (Math.random() < 0.5 ? -1 : 1)
    return `${parts[0]}:${parts[1]}:${String(Math.max(0, Math.min(59, ss))).padStart(2, '0')}`
  }
  return ts
}

export function IntelligenceFeed({ maxHeight = 'h-[480px]', limit, compact = false }: { maxHeight?: string; limit?: number; compact?: boolean }) {
  const entries = getFeedEntriesDoubled().slice(0, limit ?? Number.POSITIVE_INFINITY)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setTick(t => (t + 1) % 1000), 260)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className={`panel overflow-hidden relative border-uneven ${compact ? 'text-[10px]' : ''}`}>
      <div className="tape tape-corner-tr" />
      <div className="absolute top-2 right-10 z-[2] font-hand text-nightfall-amber/70 text-[12px] -rotate-4">
        auto-scrolling ↓
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-b border-nightfall-border bg-black/35 relative">
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-nightfall-red/60 animate-blink" />
        <div className="flex items-center gap-2 pl-2">
          <div className="relative">
            <Signal className="w-4 h-4 text-nightfall-red animate-jitter" />
            <motion.span
              className="absolute inset-0 rounded-full border border-nightfall-red/40"
              animate={{ scale: [1, 2.4, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.1, repeat: Infinity }}
            />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-text font-type">
            LIVE · INT<span className="text-nightfall-red/80">_</span>SIG
          </span>
          <span className="inline-flex items-center gap-1 ml-2 text-[9px] font-mono text-nightfall-green/80">
            <span className="w-1.5 h-1.5 rounded-full bg-nightfall-green animate-pulse-slower" />
            LINK 0x04 · EST
          </span>
        </div>
        <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-nightfall-amber/70" />
          STREAM · {entries.length / 2} ENTR<span className="text-nightfall-red/70"></span>IES
          <span className="inline-block w-1 h-1 rounded-full bg-nightfall-green/70 ml-1" />
        </span>
      </div>

      <div className={`relative ${maxHeight} overflow-hidden`}>
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.0) 0 3px, rgba(0,0,0,0.12) 4px, rgba(0,0,0,0.0) 5px)',
            mixBlendMode: 'overlay',
            opacity: 0.7,
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-[3px] z-[2] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(180,52,58,0.45) 0%, rgba(180,52,58,0.1) 50%, rgba(43,108,176,0.35) 100%)',
          }}
        />
        <div
          ref={scrollRef}
          className="animate-scroll-feed"
          style={{ animationDuration: `${74}s` }}
          onMouseEnter={() => {
            if (scrollRef.current) scrollRef.current.style.animationPlayState = 'paused'
          }}
          onMouseLeave={() => {
            if (scrollRef.current) scrollRef.current.style.animationPlayState = 'running'
          }}
        >
          {entries.map((entry, idx) => {
            const { Icon, color } = typeConfig[entry.type] || { Icon: Signal, color: 'text-nightfall-textDim' }
            const isGarbled = idx % 13 === 5
            const isDropOut = idx % 17 === 8
            const isTimestampGlitch = idx % 11 === 4
            const extraLeftPad = (idx % 3) * 3
            const altBg = idx % 5 === 2
            const confJitter = (entry.confidence ?? 80) + ((idx % 7) - 3)

            return (
              <motion.div
                key={`${entry.id}-${idx}-${tick % 2}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: ((idx % (entries.length / 2)) * 0.02) }}
                className={`flex gap-3 px-4 py-2.5 border-b border-nightfall-border/40 hover:bg-nightfall-card/40 transition-colors relative ${isDropOut ? 'opacity-70' : ''
                  } ${altBg ? 'bg-black/[0.04]' : ''}`}
                style={{ paddingLeft: 16 + extraLeftPad }}
              >
                {idx % 9 === 3 && (
                  <div className="absolute right-2 top-1 font-hand text-nightfall-red/60 text-[11px] rotate-2 z-[1]">
                    ⚠ check
                  </div>
                )}
                <span className={`text-[10px] font-mono text-nightfall-textDim mt-0.5 whitespace-nowrap flex-shrink-0 ${isTimestampGlitch ? 'animate-flicker text-nightfall-red/70' : ''
                  }`}>
                  [{isTimestampGlitch ? jitterTimestamp(entry.timestamp) : entry.timestamp}
                  {isTimestampGlitch && '̸̵'}]
                </span>
                <Icon className={`w-3.5 h-3.5 mt-1 flex-shrink-0 ${color} ${idx % 8 === 1 ? 'animate-jitter' : ''}`} />
                <div className="flex-1 min-w-0">
                  <div className={`text-[11.5px] text-nightfall-text leading-snug ${isDropOut ? 'opacity-60' : ''}`}>
                    {isGarbled ? garbleText(entry.message, 0.09) : entry.message}
                    {idx % 19 === 6 && (
                      <span className="font-hand text-nightfall-amber/70 ml-1.5 text-[12px] -rotate-1 inline-block translate-y-[1px]">
                        ⇢ flagged
                      </span>
                    )}
                  </div>
                  {entry.confidence !== undefined && (
                    <div className="mt-1 flex items-center gap-1.5 relative">
                      <span className="w-16 h-[3px] bg-nightfall-border/60 rounded-sm overflow-hidden relative">
                        <span
                          className={`block h-full ${confJitter > 88
                              ? 'bg-nightfall-green'
                              : confJitter > 72
                                ? 'bg-nightfall-amber'
                                : 'bg-nightfall-red/80'
                            }`}
                          style={{ width: `${Math.max(40, Math.min(99, confJitter))}%` }}
                        />
                        {idx % 6 === 2 && (
                          <span
                            className="absolute inset-0 bg-white/20 animate-blink-lazy"
                            style={{ clipPath: 'polygon(60% 0, 66% 0, 66% 100%, 60% 100%)' }}
                          />
                        )}
                      </span>
                      <span className="text-[9px] font-mono text-nightfall-textDim">
                        {confJitter}
                        {idx % 4 === 0 ? '%' : idx % 4 === 1 ? '%c' : '%'}
                      </span>
                      {idx % 11 === 7 && (
                        <span className="text-[9px] font-mono text-nightfall-red/60 ml-1 dotmatrix">
                          [sig_driftΔ0.02]
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {idx % 7 === 4 && (
                  <span className="self-center text-[8px] font-mono text-nightfall-textDim/70 tracking-widest rot-p1">
                    #{(tick + idx).toString(16).toUpperCase().slice(-3)}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-nightfall-panel via-nightfall-panel/85 to-transparent pointer-events-none z-[3]" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-nightfall-panel via-nightfall-panel/85 to-transparent pointer-events-none z-[3]" />
        <div className="absolute left-0 right-0 top-1/3 h-px z-[3] pointer-events-none animate-flicker"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(180,52,58,0.15) 20%, rgba(180,52,58,0.25) 50%, rgba(180,52,58,0.15) 80%, transparent 100%)' }} />
      </div>

      <div className="flex items-center justify-between px-3 py-2 border-t border-nightfall-border/80 bg-black/40 text-[9px] font-mono text-nightfall-textDim/90">
        <span className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-nightfall-green animate-pulse" />
          BUF 4096 · OK
        </span>
        <span className="font-hand text-nightfall-amber/60 text-[11px] -rotate-2 tracking-normal">
          sat downlink · ~140ms
        </span>
        <span>PKT {(entries.length * 117 + tick).toLocaleString()}</span>
      </div>
    </div>
  )
}
