import { motion } from 'framer-motion'

interface SimulationNoticeProps {
  syncTime: string
}

export function SimulationNotice({ syncTime }: SimulationNoticeProps) {
  return (
    <div className="bg-black border-b border-nightfall-border py-1.5 px-4">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-nightfall-red animate-pulse"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-textMuted">
            Threat Intelligence Bulletin — Investigative Journalism Network
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-nightfall-textDim">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-nightfall-green animate-pulse-slow" />
            <span>NETWORK: ONLINE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-nightfall-amber animate-pulse-slow" />
            <span>FEED: ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-nightfall-blue">LAST SYNC:</span>
            <span>{syncTime} AGO</span>
          </div>
        </div>
      </div>
    </div>
  )
}
