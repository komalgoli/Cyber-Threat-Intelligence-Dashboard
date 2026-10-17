import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import type { TimelineEntry } from '../data/articles'

export function CaseTimeline({ timeline }: { timeline: TimelineEntry[] }) {
  return (
    <div className="panel p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-nightfall-border bg-black/30 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-nightfall-amber" />
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-text">Case Timeline</span>
        </div>
        <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-amber">
          RECONSTRUCTED TIMELINE
        </span>
      </div>

      <div className="p-6 md:p-8">
        <div className="relative">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-nightfall-red/20 via-nightfall-borderLight to-nightfall-red/20" />

          <div className="space-y-6">
            {timeline.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05 }}
                className="relative flex gap-4 md:gap-8"
              >
                {i % 2 === 0 ? (
                  <div className="hidden md:block flex-1" />
                ) : null}
                <div className="relative flex-shrink-0 z-10">
                  <div className="absolute inset-0 -m-1 bg-nightfall-red/20 blur-sm rounded-full animate-pulse-slow" />
                  <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-nightfall-red bg-nightfall-bg flex items-center justify-center">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-nightfall-red" />
                  </div>
                </div>
                <div className="flex-1 pb-4 md:pb-6">
                  <div className={i % 2 === 0 ? 'card p-4 hover:border-nightfall-red/30 transition-colors md:mr-4' : 'card p-4 hover:border-nightfall-red/30 transition-colors md:ml-4'}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-mono text-[14px] font-semibold text-nightfall-red">{entry.time}</span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim">T+{String(i * 33).padStart(3, '0')}M</span>
                    </div>
                    <h4 className="text-[13px] font-semibold text-nightfall-text mb-1.5">{entry.title}</h4>
                    <p className="text-[12px] leading-relaxed text-nightfall-textMuted">{entry.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
