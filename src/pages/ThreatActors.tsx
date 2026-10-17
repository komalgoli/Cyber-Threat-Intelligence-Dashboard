import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, AlertTriangle, Calendar, Flag, MapPin, Hash, ChevronDown, ChevronUp, Fingerprint } from 'lucide-react'
import { threatActors } from '../data/threatActors'
import { ThreatActorCard } from '../components/ThreatActorCard'
import { StatusIndicator } from '../components/StatusIndicator'
import { ConfidenceBar } from '../components/ConfidenceBar'

export default function ThreatActors() {
  const [expanded, setExpanded] = useState<string | null>('null-veil')

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 md:py-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-6 h-6 text-nightfall-amber" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-nightfall-amber font-bold">
            Threat Actor Database · CTI Profiles
          </span>
        </div>
        <h1 className="text-[28px] md:text-[38px] font-bold tracking-tight text-white mb-3 leading-tight">
          Tracked Threat Actor Profiles
        </h1>
        <p className="text-[14px] text-nightfall-textMuted max-w-3xl">
          Attribution assessments, known tactics, associated campaigns, and observed indicators for tracked
          entities under active monitoring. Names, aliases, and operations documented per intelligence-sharing
          partnership standards.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'TRACKED ENTITIES', value: threatActors.length.toString(), color: 'text-nightfall-red' },
          { label: 'ACTIVE CAMPAIGNS', value: '11', color: 'text-nightfall-amber' },
          { label: 'INDICATORS (IOC)', value: '98,172', color: 'text-nightfall-blue' },
          { label: 'CONFIDENCE (AVG)', value: `${Math.round(threatActors.reduce((a, b) => a + b.confidence, 0) / threatActors.length)}%`, color: 'text-nightfall-green' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border border-nightfall-border bg-nightfall-card/40 p-4"
          >
            <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1.5">{s.label}</div>
            <div className={`text-[20px] font-bold font-mono ${s.color}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-14">
        {threatActors.map(actor => (
          <ThreatActorCard key={actor.id} actor={actor} />
        ))}
      </div>

      <div className="mb-4 pb-3 border-b border-nightfall-border flex items-end justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Fingerprint className="w-4 h-4 text-nightfall-red" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-nightfall-red font-bold">
              Dossier Drill-Down · Full Actor Profiles
            </span>
          </div>
          <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-white">Complete Actor Profiles</h2>
        </div>
        <span className="text-[10px] font-mono text-nightfall-textDim">
          CLICK TO EXPAND · {threatActors.length} PROFILES
        </span>
      </div>

      <div className="space-y-4">
        {threatActors.map(actor => (
          <div key={actor.id} id={actor.id} className="panel p-0 overflow-hidden scroll-mt-28">
            <button
              onClick={() => setExpanded(e => e === actor.id ? null : actor.id)}
              className="w-full flex items-stretch text-left hover:bg-nightfall-card/50 transition-colors"
            >
              <div className="p-5 md:p-6 flex-1 grid md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-3">
                  <div className="inline-flex items-center gap-2 mb-2">
                    <Target className="w-3.5 h-3.5 text-nightfall-red" />
                    <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-red font-semibold">THREAT ACTOR</span>
                  </div>
                  <h3 className="text-[20px] font-bold tracking-[0.08em] text-white">{actor.alias}</h3>
                  <div className="text-[10px] font-mono text-nightfall-textDim mt-1 flex flex-wrap gap-2">
                    {actor.nameVariants.slice(0, 2).map(v => <span key={v} className="label-chip border-nightfall-border">{v}</span>)}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <StatusIndicator status={actor.activity === 'Active' ? 'ACTIVE' : actor.activity === 'Defunct' ? 'CLOSED' : 'ARCHIVED'} />
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-nightfall-textDim">
                    <Calendar className="w-3 h-3" /> FIRST: {actor.firstObserved}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-mono text-nightfall-textDim">
                    <MapPin className="w-3 h-3" /> {actor.origin}
                  </div>
                </div>
                <div className="md:col-span-3">
                  <ConfidenceBar value={actor.confidence} label="ATTRIBUTION CONFIDENCE" />
                  <div className="flex items-center gap-1.5 mt-3 text-[10px] font-mono text-nightfall-textDim">
                    <Flag className="w-3 h-3" /> {actor.associatedCampaigns.length} ASSOCIATED CAMPAIGNS
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="flex flex-wrap gap-1.5">
                    {actor.knownTactics.slice(0, 5).map((t, i) => (
                      <span key={i} className="px-2 py-0.5 text-[9px] font-mono border border-nightfall-border text-nightfall-textMuted">
                        {t.split(' ').slice(0, 3).join(' ')}
                      </span>
                    ))}
                    {actor.knownTactics.length > 5 && (
                      <span className="px-2 py-0.5 text-[9px] font-mono text-nightfall-textDim">+{actor.knownTactics.length - 5}</span>
                    )}
                  </div>
                </div>
                <div className="md:col-span-1 flex items-center justify-center md:justify-end">
                  {expanded === actor.id ? <ChevronUp className="w-5 h-5 text-nightfall-textDim" /> : <ChevronDown className="w-5 h-5 text-nightfall-textDim" />}
                </div>
              </div>
            </button>

            <AnimatePresence>
              {expanded === actor.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-nightfall-border"
                >
                  <div className="p-5 md:p-8 grid lg:grid-cols-2 gap-6 md:gap-8 bg-black/20">
                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-nightfall-red font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Actor Profile · Description
                      </h4>
                      <p className="text-[13px] leading-relaxed text-nightfall-textMuted mb-5">{actor.description}</p>
                      <div className="card p-4 mb-5">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-nightfall-amber mb-2">ATTRIBUTED MOTIVATION</div>
                        <p className="text-[12px] text-nightfall-text">{actor.motivation}</p>
                      </div>
                      <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-nightfall-amber font-semibold mb-3 flex items-center gap-2">
                        <Hash className="w-3.5 h-3.5" /> Timeline of Observed Activity
                      </h4>
                      <ol className="relative border-l border-nightfall-border/80 pl-4 space-y-3">
                        {actor.timeline.map((t, i) => (
                          <li key={i} className="relative">
                            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-nightfall-borderLight border border-nightfall-bg" />
                            <div className="text-[10px] font-mono text-nightfall-red">{t.date}</div>
                            <div className="text-[12px] text-nightfall-text leading-snug mt-0.5">{t.event}</div>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-nightfall-blue font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-3.5 h-3.5" /> Associated Campaigns
                      </h4>
                      <div className="space-y-2 mb-6">
                        {actor.associatedCampaigns.map(c => (
                          <div key={c.id} className="card p-3 flex items-start justify-between gap-3">
                            <div>
                              <div className="text-[10px] font-mono text-nightfall-textDim">{c.id} · {c.date}</div>
                              <div className="text-[12.5px] font-semibold text-nightfall-text mt-0.5">{c.name}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-nightfall-green font-semibold mb-3 flex items-center gap-2">
                        <Fingerprint className="w-3.5 h-3.5" /> Indicators (Observed IOCs)
                      </h4>
                      <div className="card p-0 overflow-hidden">
                        <table className="w-full text-[10.5px]">
                          <thead>
                            <tr className="bg-black/50 text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim">
                              <th className="text-left px-3 py-2">TYPE</th>
                              <th className="text-left px-3 py-2">VALUE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {actor.indicators.map((ind, i) => (
                              <tr key={i} className="border-t border-nightfall-border/60">
                                <td className="px-3 py-2 align-top">
                                  <span className="label-chip border-nightfall-border text-nightfall-amber">{ind.type}</span>
                                </td>
                                <td className="px-3 py-2 align-top font-mono text-[9.5px] text-nightfall-text break-all">
                                  {ind.value}
                                  <div className="text-[8.5px] text-nightfall-textDim mt-0.5">{ind.note}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
