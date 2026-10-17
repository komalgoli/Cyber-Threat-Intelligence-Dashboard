import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, Shield, Database, Target, FileSearch, Eye, Radio, Paperclip, Flag, Coffee } from 'lucide-react'
import { articles, getFeaturedArticle } from '../data/articles'
import { threatActors } from '../data/threatActors'
import { evidence } from '../data/evidence'
import { NewsCard } from '../components/NewsCard'
import { IntelligenceFeed } from '../components/IntelligenceFeed'
import { ThreatActorCard } from '../components/ThreatActorCard'
import { EvidenceCard } from '../components/EvidenceCard'
import { StatusIndicator } from '../components/StatusIndicator'
import { ConfidenceBar } from '../components/ConfidenceBar'

export default function Home() {
  const featured = getFeaturedArticle()
  const secondaryNews = articles.slice(1, 5)
  const moreNews = articles.slice(5, 11)
  const featuredActors = threatActors.slice(0, 3)
  const featuredEvidence = evidence.slice(0, 3)

  return (
    <div className="relative">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 md:py-10 space-y-10 md:space-y-14 relative">
        <div className="absolute top-40 right-8 z-[0] opacity-[0.07] pointer-events-none font-hand text-[140px] text-nightfall-red leading-none rotate-12 select-none hidden lg:block">
          CONFIDENTIAL
        </div>
        <div className="absolute top-[720px] left-[-60px] z-[0] opacity-[0.05] pointer-events-none font-hand text-[180px] text-nightfall-amber leading-none -rotate-6 select-none hidden xl:block">
          FILE COPY
        </div>

        <section aria-label="Featured investigation" className="space-y-4 relative">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3 relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative rot-n1"
              >
                <AlertTriangle className="w-5 h-5 text-nightfall-red" />
                <motion.div
                  className="absolute inset-0 border border-nightfall-red/45 rounded-sm"
                  animate={{ scale: [1, 1.55, 1], opacity: [0.65, 0, 0.65] }}
                  transition={{ duration: 2.7, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-nightfall-red font-bold flex items-center gap-1.5">
                  BREAKING INVESTIGATION · <span className="scribble-underline">TOP STORY</span>
                </div>
                <div className="text-[9px] font-mono text-nightfall-textDim mt-0.5 flex items-center gap-1.5">
                  PRIORITY 01 · <span className="stamp stamp-black" style={{ fontSize: 7.5, padding: '1.5px 6px 2px' }}>VERIFIED SOURCE</span>
                </div>
              </div>
              <span className="font-hand text-nightfall-red/70 text-[15px] -rotate-6 translate-y-[2px] ml-2 hidden sm:inline">
                ⚑ LEAD ARTICLE
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-nightfall-textDim">
              <StatusIndicator status="ACTIVE" />
              <span className="text-nightfall-border">·</span>
              <span className="inline-flex items-center gap-1">
                CASE ID <span className="text-nightfall-text font-semibold rot-p1 inline-block px-1.5 py-0.5 border border-nightfall-border/70">{featured.caseId}</span>
              </span>
              <span className="font-hand text-nightfall-amber/70 text-[12px] rotate-1">
                logged 04:17 Z
              </span>
            </div>
          </div>

          <NewsCard article={featured} featured />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 relative">
            <QuickStat label="CASE ID" value={featured.caseId || 'NF-2026'} color="text-nightfall-red" idx={0} />
            <QuickStat label="INVESTIGATION" value="BLACK MERIDIAN TF" color="text-nightfall-amber" idx={1} />
            <QuickStat label="SOURCE" value="M-17 / VERIFIED" color="text-nightfall-green" idx={2} />
            <QuickStat label="STATUS" value={featured.status} color="text-nightfall-blue" idx={3} />
            <span className="font-hand text-nightfall-amber/70 text-[13px] absolute -top-4 right-28 md:right-[220px] rotate-2 hidden md:inline">
              ↓ quick stats
            </span>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6 relative">
          <div className="lg:col-span-2 space-y-6 relative -rotate-[0.15deg] origin-top-left">
            <SectionHeader
              eyebrow="LATEST REPORTS"
              title="Current Investigations & Coverage"
              subtitle="Reports from the Nightfall Intelligence newsroom and research desk — reconstructed from case materials and source-corroborated documentation."
              actionLabel="View All Investigations"
              actionHref="/investigations"
              icon={<FileSearch className="w-4 h-4 text-nightfall-red" />}
              stamp="IN PROGRESS"
              stampColor="stamp-amber"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              {secondaryNews.map((a, i) => (
                <NewsCard key={a.id} article={a} priority={i} />
              ))}
            </div>

            <div className="panel p-4 md:p-5 relative border-uneven-2 foldline">
              <div className="tape tape-corner-br" />
              <div className="flex flex-wrap items-center justify-between gap-3 text-[10.5px] font-mono">
                <div className="flex items-center gap-4 text-nightfall-textDim">
                  <span className="inline-flex items-center gap-1.5">
                    <Paperclip className="w-3 h-3 text-nightfall-amber/80 -rotate-45" />
                    42 FILES · 2.4GB · ENCRYPTED
                  </span>
                  <span className="hidden sm:inline opacity-60">|</span>
                  <span className="hidden sm:inline">REV 07 · LAST EDIT: 2h 14m AGO</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="stamp stamp-green rot-p1" style={{ fontSize: 8.5, padding: '2px 8px 3px' }}>
                    CROSS-CHECKED
                  </span>
                  <span className="font-hand text-nightfall-red/70 text-[13px] -rotate-3">
                    <Coffee className="w-3 h-3 inline translate-y-[1px]" /> review needed p.14
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 relative rotate-[0.2deg] origin-top-right">
            <div>
              <SectionHeader
                eyebrow="SIGNAL STREAM"
                title="Live Intelligence Feed"
                subtitle="Signals aggregated from 482 monitored underground nodes across partner intelligence sharing coalitions."
                icon={<Radio className="w-4 h-4 text-nightfall-red" />}
                compact
              />
              <IntelligenceFeed maxHeight="h-[520px]" />
            </div>

            <div className="panel p-5 relative border-uneven-3 smudge">
              <div className="tape tape-corner-tl" />
              <div className="dogear" />
              <div className="absolute top-4 right-10 z-[2]">
                <span className="stamp stamp-blue rot-n2" style={{ fontSize: 9, padding: '2px 9px 3px' }}>
                  OPS CONSOLE
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-nightfall-green" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-text font-semibold">
                  Network Status Console
                </span>
                <span className="ml-auto font-hand text-nightfall-amber/70 text-[12px] rotate-1">
                  shift Δ 0.03
                </span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-nightfall-textDim">
                      INTELLIGENCE FEED
                    </span>
                    <span className="text-[10px] font-mono text-nightfall-green flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-nightfall-green animate-pulse" />
                      ACTIVE
                    </span>
                  </div>
                  <ConfidenceBar value={96.4} label="" size="sm" />
                  <div className="mt-1 flex justify-between text-[9px] font-mono text-nightfall-textDim/80">
                    <span>nodes: 482/482 online</span>
                    <span>lat: 137ms avg</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-nightfall-textDim">
                      THREAT DETECTION
                    </span>
                    <span className="text-[10px] font-mono text-nightfall-amber flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-nightfall-amber animate-pulse-slower" />
                      ELEVATED
                    </span>
                  </div>
                  <ConfidenceBar value={72.8} label="" size="sm" />
                  <div className="mt-1 flex justify-between text-[9px] font-mono text-nightfall-textDim/80">
                    <span>active campaigns: 7</span>
                    <span className="text-nightfall-red/80">+2 new last 24h</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-nightfall-textDim">
                      EVIDENCE PROCESSING
                    </span>
                    <span className="text-[10px] font-mono text-nightfall-green flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-nightfall-green" />
                      NOMINAL
                    </span>
                  </div>
                  <ConfidenceBar value={87.3} label="" size="sm" />
                  <div className="mt-1 flex justify-between text-[9px] font-mono text-nightfall-textDim/80">
                    <span>queue: 18 items</span>
                    <span>backlog: 3h</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-nightfall-textDim">
                      SOURCE RELIABILITY
                    </span>
                    <span className="text-[10px] font-mono text-nightfall-green flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-nightfall-green animate-pulse-slower" />
                      HIGH
                    </span>
                  </div>
                  <ConfidenceBar value={91.7} label="" size="sm" />
                  <div className="mt-1 flex justify-between text-[9px] font-mono text-nightfall-textDim/80">
                    <span>vetted sources: 11</span>
                    <span>m-17: 96% hist.</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-nightfall-border/70 grid grid-cols-2 gap-y-2 gap-x-2 text-[10px] font-mono text-nightfall-textDim relative">
                <span className="rot-n1 inline-block pl-1">NODES MONITORED</span><span className="text-right text-nightfall-text rot-p1 inline-block pr-1">482</span>
                <span className="rot-p1 inline-block pl-1">INDICATORS TODAY</span><span className="text-right text-nightfall-text rot-n1 inline-block pr-1">1,847</span>
                <span className="rot-n1 inline-block pl-1">ACTIVE CASES</span><span className="text-right text-nightfall-text rot-p1 inline-block pr-1">23</span>
                <span className="rot-p1 inline-block pl-1">SOURCES ONLINE</span><span className="text-right text-nightfall-text rot-n1 inline-block pr-1">11 / VETTED</span>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-hand text-nightfall-textDim/70 text-[11px] rotate-[0.5deg]">
                ↻ refreshes every 47s
              </div>
            </div>
          </div>
        </section>

        <section className="relative">
          <SectionHeader
            eyebrow="THREAT ACTOR DATABASE"
            title="Profiles of Active Tracked Entities"
            subtitle="Attribution assessments, confidence metrics, and associated campaigns for entities under active monitoring with corroborated TTP fingerprinting."
            actionLabel="View Threat Actors"
            actionHref="/threat-actors"
            icon={<Target className="w-4 h-4 text-nightfall-amber" />}
            stamp="SENSITIVE"
            stampColor="stamp-red"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 -skew-y-[0.15deg]">
            {featuredActors.map((actor, i) => (
              <ThreatActorCard key={actor.id} actor={actor} idx={i} />
            ))}
          </div>
        </section>

        <section className="relative">
          <SectionHeader
            eyebrow="DIGITAL EVIDENCE VAULT"
            title="Recent Processed Evidence Items"
            subtitle="Chain-of-custody tracked, analyst-reviewed, and correlation-linked artifacts from active investigations currently in processing queues."
            actionLabel="Evidence Index"
            actionHref="/evidence"
            icon={<Database className="w-4 h-4 text-nightfall-blue" />}
          />
          <div className="grid md:grid-cols-3 gap-5 skew-y-[0.15deg]">
            {featuredEvidence.map((ev, i) => (
              <EvidenceCard key={ev.id} evidence={ev} idx={i} />
            ))}
          </div>
        </section>

        <section className="relative">
          <SectionHeader
            eyebrow="ADDITIONAL COVERAGE"
            title="Recent Reports & Analyses"
            subtitle="Additional dispatches from the Nightfall desk — editorial reconstructions, research memos, and staff analyses from the current reporting cycle."
            icon={<Eye className="w-4 h-4 text-nightfall-green" />}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {moreNews.map((a, i) => (
              <NewsCard key={a.id} article={a} priority={i + 3} />
            ))}
          </div>
        </section>

        <section className="panel p-6 md:p-8 relative overflow-hidden border-uneven">
          <div className="tape tape-corner-tl" />
          <div className="tape tape-corner-br" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-nightfall-amber/5 to-transparent" />
          <div className="absolute top-5 right-24 z-[2]">
            <span className="stamp stamp-black rot-p3" style={{ fontSize: 9, padding: '2px 10px 3px' }}>
              EDITORIAL STANDARDS
            </span>
          </div>
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-nightfall-amber" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-amber font-semibold inline-flex items-center gap-1.5">
                  METHODOLOGY NOTE · <span className="scribble-underline">READ BEFORE CITING</span>
                </span>
              </div>
              <h2 className="text-[20px] md:text-[25px] font-bold tracking-tight leading-[1.17] mb-4 relative">
                Nightfall Intelligence follows multi-source corroboration and chain-of-custody verification protocols across all reporting.
              </h2>
              <p className="text-[13.5px] leading-[1.78] text-nightfall-textMuted mb-6">
                All case reconstructions are built from at minimum two independent corroboration channels. Source identities are protected under multi-layered dead-drop protocols. Technical indicators — hashes, wallet addresses, IP fragments, and domain names referenced in case files — are released for defensive and research purposes only, under the Nightfall Responsible Disclosure framework.
                <span className="font-hand text-nightfall-amber/70 text-[13px] -rotate-2 block mt-2 translate-x-2">
                  — attribution confidence noted per article
                </span>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link to="/policies/methodology" className="btn text-[11px] font-mono uppercase tracking-wider border-uneven relative">
                  <Flag className="w-3 h-3" />
                  Read Methodology
                </Link>
                <Link to="/policies/terms" className="btn btn-primary text-[11px] font-mono uppercase tracking-wider border-uneven-2 relative">
                  Responsible Use
                </Link>
                <span className="font-hand text-nightfall-textDim text-[12px] rotate-1 translate-y-1">
                  ↑ both worth reading
                </span>
              </div>
            </div>
            <div className="space-y-3 relative">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-px h-[85%] bg-gradient-to-b from-transparent via-nightfall-border to-transparent hidden md:block" />
              <NoticeCard
                label="CORROBORATION"
                body="Minimum 2 independent signal channels required before case publication. Single-source reports held pending secondary confirmation under embargo."
                color="border-nightfall-red/30"
                idx={0}
              />
              <NoticeCard
                label="SOURCE PROTECTION"
                body="All confidential sources handled via dead-drop routing and handler-buffered pass-through. No identifying metadata retained at any node in the drop chain."
                color="border-nightfall-amber/30"
                idx={1}
              />
              <NoticeCard
                label="INDICATOR RELEASE"
                body="IOCs published after cross-vetting against defensive partner lists. False-positive scrubbing pass applied against Alexa top-1M and monitored benign ranges."
                color="border-nightfall-blue/30"
                idx={2}
              />
              <NoticeCard
                label="IMAGERY PROTOCOL"
                body="Scene reconstructions generated post-incident from forensic scene notes, architectural floor plans, and CCTV metadata. No identifiable individuals depicted."
                color="border-nightfall-green/30"
                idx={3}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function QuickStat({ label, value, color, idx }: { label: string; value: string; color: string; idx: number }) {
  const rots = [-1.3, 0.7, -0.6, 1.1]
  const borderVariants = ['border-uneven', 'border-uneven-2', 'border-uneven-3']
  return (
    <motion.div
      whileHover={{ y: -3 + (idx % 2 === 0 ? -1 : 0), rotate: rots[idx] * 0.2 }}
      className={`border border-nightfall-border bg-nightfall-panel/50 p-3 md:p-4 relative ${borderVariants[idx % 3]} overflow-hidden`}
      style={{
        transform: `rotate(${rots[idx]}deg)`,
        boxShadow: idx % 2 === 0
          ? '2px 4px 12px -4px rgba(0,0,0,0.55)'
          : '-1px 5px 13px -5px rgba(0,0,0,0.6)',
      }}
    >
      {idx % 2 === 0 && <div className="tape tape-side-l" />}
      {idx === 2 && <div className="dogear" />}
      <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1 flex items-center justify-between">
        <span>{label}</span>
        {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-nightfall-red animate-blink" />}
        {idx === 2 && <span className="w-1.5 h-1.5 rounded-full bg-nightfall-green animate-pulse-slower" />}
      </div>
      <div className={`text-[12px] md:text-[13px] font-mono font-bold ${color} break-all leading-tight relative`}>
        {value}
      </div>
      {idx === 1 && (
        <span className="font-hand text-nightfall-amber/70 text-[12px] absolute bottom-1 right-3 -rotate-2">
          19-month op
        </span>
      )}
      {idx === 3 && (
        <span className="absolute top-1 right-2 text-[8px] font-mono text-nightfall-textDim/60 dotmatrix">
          Δ -00:04:17
        </span>
      )}
    </motion.div>
  )
}

function SectionHeader({
  eyebrow, title, subtitle, actionLabel, actionHref, icon, compact, stamp, stampColor = 'stamp-red',
}: {
  eyebrow: string
  title: string
  subtitle?: string
  actionLabel?: string
  actionHref?: string
  icon?: React.ReactNode
  compact?: boolean
  stamp?: string
  stampColor?: string
}) {
  return (
    <div className={`flex items-end justify-between flex-wrap gap-3 mb-5 ${!compact ? 'pb-3 border-b border-nightfall-border relative' : 'pb-2'}`}>
      <div className="relative">
        <div className="flex items-center gap-2 mb-1.5">
          {icon}
          <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-nightfall-red font-semibold inline-flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-nightfall-red/70 animate-blink-lazy" />
            {eyebrow}
          </span>
          {stamp && (
            <span className={`stamp ${stampColor} rot-p2 ml-1`} style={{ fontSize: 7.5, padding: '1.5px 7px 2px' }}>
              {stamp}
            </span>
          )}
        </div>
        <h2 className="text-[17.5px] md:text-[21.5px] font-bold tracking-tight text-white leading-tight relative">
          {title}
        </h2>
        {subtitle && <p className="text-[12px] md:text-[13px] text-nightfall-textMuted mt-1.5 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
      {actionLabel && actionHref && (
        <Link
          to={actionHref}
          className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-nightfall-textMuted hover:text-nightfall-red transition-colors border-b border-transparent hover:border-nightfall-red pb-0.5 relative rot-n1"
        >
          {actionLabel}
          <ArrowRight className="w-3.5 h-3.5" />
          <span className="font-hand text-nightfall-amber/70 text-[11px] ml-2 rotate-3 hidden sm:inline">
            →
          </span>
        </Link>
      )}
    </div>
  )
}

function NoticeCard({ label, body, color, idx }: { label: string; body: string; color: string; idx: number }) {
  const rots = [-1, 0.8, -0.4, 1.2]
  return (
    <div
      className={`border-l-2 ${color} pl-4 py-2.5 relative bg-gradient-to-r from-black/15 to-transparent ${idx % 2 === 0 ? 'border-uneven' : 'border-uneven-2'}`}
      style={{ transform: `rotate(${rots[idx]}deg) translateX(${idx % 2 === 0 ? 3 : -2}px)` }}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-red mb-0.5">{label}</div>
        <span className="font-hand text-nightfall-amber/70 text-[11px] -rotate-3">
          {idx === 0 ? '↯ 2-channel minimum' : idx === 1 ? '✎ identities masked' : idx === 2 ? '⌘ IOC scrubbed' : '⚙ post-incident'}
        </span>
      </div>
      <div className="text-[12px] leading-[1.7] text-nightfall-textMuted">{body}</div>
    </div>
  )
}
