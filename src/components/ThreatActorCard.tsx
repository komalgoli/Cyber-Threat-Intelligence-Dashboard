import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, Calendar, Target, Flag, MapPin, UserX, Skull, Zap } from 'lucide-react'
import type { ThreatActor } from '../data/threatActors'
import { StatusIndicator } from './StatusIndicator'
import { ConfidenceBar } from './ConfidenceBar'

const activityColors: Record<string, string> = {
  Active: 'text-nightfall-red border-nightfall-red/40',
  Dormant: 'text-nightfall-textDim border-nightfall-borderLight',
  Defunct: 'text-nightfall-green border-nightfall-green/40',
  'Re-emerged': 'text-nightfall-amber border-nightfall-amber/40',
}

export function ThreatActorCard({ actor, idx = 0 }: { actor: ThreatActor; idx?: number }) {
  const mapStatus = (a: string) => {
    if (a === 'Active') return 'ACTIVE'
    if (a === 'Defunct') return 'CLOSED'
    if (a === 'Dormant') return 'ARCHIVED'
    return 'ACTIVE'
  }
  const status = mapStatus(actor.activity)

  const rots = [-1, 0.8, -0.6, 1.2, -0.4]
  const rot = rots[idx % 5]
  const borderVariants = ['border-uneven', 'border-uneven-2', 'border-uneven-3']
  const bv = borderVariants[idx % 3]

  const SeverityIcon = [Zap, Skull, UserX][idx % 3]

  return (
    <motion.div
      className={`card overflow-hidden group ${bv} relative`}
      whileHover={{ y: -3 + (idx % 2 === 0 ? -1 : 0), rotate: rot * 0.18 }}
      transition={{ duration: 0.15 }}
      style={{
        transform: `rotate(${rot}deg) translateY(${(idx % 3 - 1) * 2}px)`,
        boxShadow: idx % 2 === 0
          ? '2px 6px 14px -5px rgba(0,0,0,0.55)'
          : '-2px 5px 13px -5px rgba(0,0,0,0.6)',
      }}
    >
      <div className={`tape ${idx % 3 === 0 ? 'tape-corner-tl' : idx % 3 === 1 ? 'tape-corner-tr' : 'tape-side-l'}`} />
      {idx % 2 === 0 && <div className="dogear" />}
      <div className="absolute top-3 right-14 z-[2] hidden md:block">
        <span className={`stamp ${idx === 0 ? 'stamp-red' : idx === 1 ? 'stamp-amber' : 'stamp-blue'} ${idx % 2 ? 'rot-n2' : 'rot-p2'}`} style={{ fontSize: 8, padding: '1.5px 7px 2px' }}>
          {idx === 0 ? 'HIGH PRIORITY' : idx === 1 ? 'WATCHLIST' : 'MONITORED'}
        </span>
      </div>

      <Link to={'/threat-actors#' + actor.id}>
        <div className="relative border-b border-nightfall-border p-4 bg-gradient-to-br from-nightfall-panel to-transparent">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.22]"
            style={{
              background: `radial-gradient(ellipse at ${idx % 2 === 0 ? '10% 20%' : '90% 80%'}, ${
                idx % 3 === 0 ? 'rgba(180,52,58,0.08)' : idx % 3 === 1 ? 'rgba(201,138,42,0.07)' : 'rgba(43,108,176,0.07)'
              }, transparent 60%)`,
            }}
          />
          <div className="flex items-start justify-between mb-3 relative">
            <div className="inline-flex items-center gap-2">
              <Target className={`w-3.5 h-3.5 ${idx % 3 === 0 ? 'text-nightfall-red' : idx % 3 === 1 ? 'text-nightfall-amber' : 'text-nightfall-blue'}`} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-nightfall-red font-semibold">THREAT ACTOR</span>
              <span className="font-hand text-nightfall-amber/70 text-[11px] -rotate-4 hidden sm:inline">
                #{(idx + 1).toString().padStart(3, '0')}
              </span>
            </div>
            <StatusIndicator status={status} />
          </div>
          <h3 className="text-[17px] font-bold tracking-[0.08em] text-white group-hover:text-nightfall-red transition-colors relative">
            {actor.alias}
            <span className="ml-2 font-hand text-nightfall-red/60 text-[13px] -rotate-2 inline-block translate-y-[-1px]">
              aka "{actor.alias.toLowerCase().slice(0, 4)}-{actor.firstObserved.slice(-2)}"
            </span>
          </h3>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[9px] font-mono text-nightfall-textDim">
            <span className="inline-flex items-center gap-1 rot-n1">
              <Calendar className="w-2.5 h-2.5" /> FIRST: {actor.firstObserved}
            </span>
            <span className="inline-flex items-center gap-1 rot-p1">
              <MapPin className="w-2.5 h-2.5" /> {actor.origin}
            </span>
            <span className="inline-flex items-center gap-1 text-nightfall-red/70 rot-n1">
              <SeverityIcon className="w-2.5 h-2.5" />
              SEVERITY: {['CRITICAL', 'HIGH', 'ELEVATED'][idx % 3]}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4 relative">
          <p className="text-[12px] leading-[1.7] text-nightfall-textMuted line-clamp-3 relative">
            {actor.description}
            {idx === 0 && (
              <span className="font-hand text-nightfall-amber/70 text-[11px] -rotate-2 block mt-1 translate-x-1">
                ⚠ cross-reference Null Veil
              </span>
            )}
          </p>

          <div className="relative">
            <ConfidenceBar value={actor.confidence + (idx % 2 === 0 ? -1.3 : 0.7)} label="ATTRIBUTION CONFIDENCE" />
            <span className="absolute right-0 -top-1 font-hand text-nightfall-textDim/80 text-[10px] rotate-1">
              ± {[2.4, 3.1, 1.8][idx % 3]}% margin
            </span>
          </div>

          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-2 flex items-center justify-between">
              <span>KNOWN TACTICS</span>
              <span className="font-hand text-nightfall-amber/70 text-[10px] -rotate-3 normal-case tracking-normal">
                mapped to {actor.knownTactics.length} vectors
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {actor.knownTactics.slice(0, 4).map(function (tactic, i) {
                return (
                  <span
                    key={i}
                    className={`px-2 py-0.5 text-[9px] font-mono border border-nightfall-border text-nightfall-textMuted ${
                      i % 2 ? 'rot-n1' : 'rot-p1'
                    } ${i === 0 ? 'border-nightfall-red/30 text-nightfall-red/80 bg-nightfall-redFaded' : ''}`}
                    style={{
                      borderRadius: i % 3 === 0 ? '1px 3px 2px 4px' : i % 3 === 1 ? '3px 1px 4px 2px' : '2px 4px 1px 3px',
                    }}
                  >
                    {tactic.split(' ').slice(0, 3).join(' ')}
                  </span>
                )
              })}
              {actor.knownTactics.length > 4 && (
                <span className="px-2 py-0.5 text-[9px] font-mono text-nightfall-textDim rot-p1 border border-nightfall-border/60">
                  +{actor.knownTactics.length - 4} more
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-nightfall-border/70 text-[10px] font-mono relative">
            <div className="absolute -top-[8px] left-4 text-[8px] font-mono text-nightfall-textDim/70 bg-nightfall-card px-1 rot-p1">
              ASSOCIATED
            </div>
            <span className="text-nightfall-textDim inline-flex items-center gap-1">
              <Flag className="w-3 h-3" />
              {actor.associatedCampaigns.length} CAMPAIGNS
            </span>
            <span className={activityColors[actor.activity]}>
              {actor.activity.toUpperCase()}
              <span className="ml-1.5 w-1 h-1 inline-block rounded-full bg-current animate-blink-lazy" />
            </span>
            <span className="font-hand text-nightfall-textDim/80 text-[11px] -rotate-2 hidden sm:inline">
              last sig: {['4h ago', '1d 7h', '12h ago'][idx % 3]}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
