import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Radio, Zap, AlertCircle, TrendingUp, Shield, ChevronDown, ChevronUp, Activity, Radar } from 'lucide-react'
import { IntelligenceFeed } from '../components/IntelligenceFeed'

const dailyBriefs = [
  {
    id: 'db-20260815',
    day: 'DAY 219 · 15 AUG 2026',
    items: [
      'Indicator volume: 21,876 new observations · 14.2% above rolling 30-day baseline',
      'APT beaconing cluster trending UP across 4 monitored ASNs — spike at 03:41 UTC (87.3% anomaly score)',
      'C2 family Cinder-9 observed at STADE-3 in two N. Europe sectors',
      '58 entities cross-referenced against MISP feeds · 14 incident-level correlations generated',
      'Threat-actor correlation: Null Veil actor cluster confidence increased 3.1 points → 91.2%',
    ],
  },
  {
    id: 'db-20260814',
    day: 'DAY 218 · 14 AUG 2026',
    items: [
      'Indicator volume: 18,204 new observations · 2.7% below baseline',
      'Dark-web chatter: ransomware affiliates advertising double-encryption access for targeted legal sector',
      'C2 family Cinder-9 observed at STADE-2 in monitoring · 11 tracked entities updated',
      'Threat feed ingestion: 3 partner feeds processed on schedule · 4,112 new IOCs deduplicated',
      'Malware signature: 12 new patterns added to watchlist · pattern drift from 4 tracked providers',
    ],
  },
  {
    id: 'db-20260813',
    day: 'DAY 217 · 13 AUG 2026',
    items: [
      'Indicator volume: 19,411 new observations · 3.8% above baseline',
      'Blockchain analytics: 2 new wallet-cluster correlations produced for Black Meridian funding chain',
      'New APT staging server identified · correlation score 82.4% to existing actor profile',
      'Reporting cycle: 3 case files updated with new corroborated evidence (CONF ≥ 75%)',
      'SOC handoff: 2 escalations passed to downstream partner SOC · incident ticket refs NF-2401, NF-2404',
    ],
  },
]

const cycleStages = [
  { name: 'COLLECTION', status: 'COMPLETE', value: 98, color: 'bg-nightfall-green/30 border-nightfall-green/60 text-nightfall-green' },
  { name: 'PROCESSING', status: 'COMPLETE', value: 95, color: 'bg-nightfall-blue/30 border-nightfall-blue/60 text-nightfall-blue' },
  { name: 'ANALYSIS', status: 'ACTIVE', value: 76, color: 'bg-nightfall-amber/30 border-nightfall-amber/60 text-nightfall-amber' },
  { name: 'DISSEMINATION', status: 'PENDING', value: 34, color: 'bg-nightfall-red/20 border-nightfall-red/50 text-nightfall-red' },
]

export default function IntelligencePage() {
  const [expandedBrief, setExpandedBrief] = useState<string>('db-20260815')

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 md:py-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Radio className="w-6 h-6 text-nightfall-blue animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-nightfall-blue font-bold">
            Intelligence · Threat Analysis & Live Feed
          </span>
        </div>
        <h1 className="text-[28px] md:text-[38px] font-bold tracking-tight text-white mb-3 leading-tight">
          Intelligence & Threat Analysis
        </h1>
        <p className="text-[14px] text-nightfall-textMuted max-w-3xl">
          Live intelligence feed, daily briefings, cycle-stage tracking, and volume metrics pulled from the
          Nightfall Intelligence monitoring grid. All feeds and indicators are cross-vetted before release.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'OBSERVATIONS TODAY', value: '21,876', icon: <Activity className="w-4 h-4" />, color: 'text-nightfall-blue', delta: '+14.2%', up: true },
          { label: 'ACTIVE BEACONS', value: '487', icon: <Radar className="w-4 h-4" />, color: 'text-nightfall-red', delta: '+8', up: true },
          { label: 'FEEDS INGESTED', value: '12 / 12', icon: <Zap className="w-4 h-4" />, color: 'text-nightfall-green', delta: 'on schedule', up: true },
          { label: 'CORRELATIONS (24H)', value: '14', icon: <TrendingUp className="w-4 h-4" />, color: 'text-nightfall-amber', delta: '+5', up: true },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="border border-nightfall-border bg-nightfall-card/40 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim">{s.label}</div>
              <div className={`${s.color} opacity-70`}>{s.icon}</div>
            </div>
            <div className={`text-[22px] font-bold font-mono ${s.color} leading-none`}>{s.value}</div>
            <div className={`text-[10px] font-mono mt-1 ${s.up ? 'text-nightfall-green' : 'text-nightfall-red'}`}>{s.delta}</div>
          </motion.div>
        ))}
      </div>

      <div className="panel p-4 md:p-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-nightfall-green" />
            <h2 className="text-[14px] font-semibold text-nightfall-text">Intelligence Reporting Cycle</h2>
            <span className="label-chip border-nightfall-border text-nightfall-textDim">ACTIVE CYCLE</span>
          </div>
          <span className="text-[10px] font-mono text-nightfall-textDim">REPORTING TZ · UTC</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cycleStages.map((s, i) => (
            <div key={s.name} className={`border ${s.color.split(' ')[2]} ${s.color.split(' ')[1]} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] font-mono font-semibold text-nightfall-text">{s.name}</div>
                <span className="label-chip border-transparent text-[9px] px-1.5 py-0.5" style={{ color: s.color.includes('green') ? '#4ade80' : s.color.includes('blue') ? '#60a5fa' : s.color.includes('amber') ? '#fbbf24' : '#f87171', background: 'rgba(255,255,255,0.04)' }}>
                  {s.status}
                </span>
              </div>
              <div className="h-1.5 bg-black/50 mb-2 border border-nightfall-border/50 overflow-hidden">
                <div className={`h-full ${s.color.split(' ')[0]}`} style={{ width: `${s.value}%` }} />
              </div>
              <div className="text-[13px] font-mono font-bold text-nightfall-text">{s.value}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 md:gap-8 mb-10">
        <div className="lg:col-span-3">
          <div className="mb-4 pb-3 border-b border-nightfall-border flex items-end justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <AlertCircle className="w-4 h-4 text-nightfall-amber" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-nightfall-amber font-bold">Daily Intelligence Briefs</span>
              </div>
              <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-white">Intelligence Daily Briefs</h2>
            </div>
          </div>
          <div className="space-y-3">
            {dailyBriefs.map(b => (
              <div key={b.id} className="panel p-0 overflow-hidden">
                <button
                  className="w-full p-4 md:p-5 flex items-center justify-between gap-3 text-left hover:bg-nightfall-card/40 transition-colors"
                  onClick={() => setExpandedBrief(e => e === b.id ? '' : b.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-nightfall-border flex items-center justify-center bg-black/30">
                      <Zap className="w-5 h-5 text-nightfall-amber" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono font-bold text-nightfall-red tracking-wide">{b.day}</div>
                      <div className="text-[12px] text-nightfall-textMuted mt-0.5">
                        {b.items.length} observations · analyst-reviewed
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="label-chip border-nightfall-border text-nightfall-green hidden sm:inline-flex">RELEASED</span>
                    {expandedBrief === b.id ? <ChevronUp className="w-5 h-5 text-nightfall-textDim" /> : <ChevronDown className="w-5 h-5 text-nightfall-textDim" />}
                  </div>
                </button>
                <AnimatePresence>
                  {expandedBrief === b.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-nightfall-border bg-black/20"
                    >
                      <ul className="p-5 space-y-2.5">
                        {b.items.map((it, i) => (
                          <li key={i} className="text-[12.5px] leading-relaxed text-nightfall-text flex gap-2.5">
                            <span className="w-5 h-5 flex-shrink-0 border border-nightfall-border flex items-center justify-center font-mono text-[10px] text-nightfall-amber mt-0.5">
                              {i + 1}
                            </span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-4 pb-3 border-b border-nightfall-border">
            <div className="flex items-center gap-2 mb-1.5">
              <Radio className="w-4 h-4 text-nightfall-green animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-nightfall-green font-bold">Live Intel Feed</span>
            </div>
            <h2 className="text-[20px] md:text-[24px] font-bold tracking-tight text-white">Live Threat Intel Feed</h2>
            <p className="text-[12px] text-nightfall-textMuted mt-2">
              Cross-vetted observations from partner feeds and in-house monitoring. Authenticated Nightfall Intelligence channels only.
            </p>
          </div>
          <IntelligenceFeed limit={12} compact />
        </div>
      </div>
    </div>
  )
}
