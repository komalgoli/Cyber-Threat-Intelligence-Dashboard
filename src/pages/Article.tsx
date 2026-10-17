import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AlertTriangle, FileText, MapPin, Calendar, Clock, Eye,
  BookOpen, User, Hash, Shield, Share2, ChevronLeft, ArrowLeft,
  Network, Fingerprint, Database, Radio, BookMarked, AlertCircle,
  FileCode, RadioTower
} from 'lucide-react'
import { articles, getArticleById, getFeaturedArticle } from '../data/articles'
import { authors } from '../data/authors'
import { evidence, getEvidenceById } from '../data/evidence'
import { threatActors, getThreatActorById } from '../data/threatActors'
import { ClassificationBadge } from '../components/ClassificationBadge'
import { StatusIndicator } from '../components/StatusIndicator'
import { ConfidenceBar } from '../components/ConfidenceBar'
import { EvidenceCard } from '../components/EvidenceCard'
import { CaseTimeline } from '../components/CaseTimeline'
import { RedactedDocument } from '../components/RedactedDocument'
import { WalletFlowVisualization } from '../components/WalletFlowVisualization'
import { ReadingProgress } from '../components/ReadingProgress'
import { NewsCard } from '../components/NewsCard'

export default function Article() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const article = getArticleById(id || '') || getFeaturedArticle()
  const author = authors.find(a => a.id === article.authorId)
  const relatedArticles = (article.relatedArticleIds || [])
    .map(rid => articles.find(a => a.id === rid))
    .filter(Boolean) as typeof articles
  const articleEvidence = (article.evidenceIds || [])
    .map(eid => getEvidenceById(eid))
    .filter(Boolean) as typeof evidence
  const articleActors = (article.threatActorIds || [])
    .map(tid => getThreatActorById(tid))
    .filter(Boolean) as typeof threatActors

  const fallback = !id || article.id === getFeaturedArticle().id

  return (
    <>
      <ReadingProgress />

      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 md:py-10">
        <div className="flex flex-wrap items-center gap-2 mb-6 text-[11px] font-mono text-nightfall-textDim">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 hover:text-nightfall-text">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <span>·</span>
          <Link to="/" className="hover:text-nightfall-text">Home</Link>
          <span>/</span>
          <Link to="/investigations" className="hover:text-nightfall-text">Investigations</Link>
          <span>/</span>
          <span className="text-nightfall-text truncate">{article.slug}</span>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <ClassificationBadge classification={article.classification} />
          <StatusIndicator status={article.status} />
          {fallback && (
            <span className="label-chip border-nightfall-amber/50 bg-nightfall-amber/10 text-nightfall-amber animate-pulse-slow">
              FEATURED · CENTERPIECE STORY
            </span>
          )}
        </div>

        <div className="mb-6 md:mb-8 relative">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-nightfall-red flex-shrink-0 mt-1" />
              <div>
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-nightfall-red font-bold">
                  BREAKING INVESTIGATION · {article.category.toUpperCase()}
                </div>
                <div className="text-[10px] font-mono text-nightfall-amber mt-0.5">
                  RESTRICTED CASE FILE — NIGHTFALL INTELLIGENCE NETWORK
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn text-[10px] font-mono uppercase tracking-wider">
                <BookMarked className="w-3.5 h-3.5" /> Case File
              </button>
              <button className="btn text-[10px] font-mono uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </div>

          <h1 className="text-[26px] md:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-tight mb-4 text-white">
            <span className="text-gradient-red">THE RED ROOM FILES:</span> {article.headline.replace('THE RED ROOM FILES: ', '')}
          </h1>

          <p className="text-[15px] md:text-[19px] leading-relaxed text-nightfall-textMuted max-w-4xl font-serif">
            {article.subheadline}
          </p>
        </div>

        <div className="relative mb-8 md:mb-12 overflow-hidden border border-nightfall-border">
          <div className="relative h-[280px] md:h-[460px] lg:h-[560px]">
            <img
              src={article.heroImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 scanlines pointer-events-none" />

            <div className="absolute top-5 left-5 flex flex-wrap gap-2">
              {article.tags.slice(0, 4).map(tag => (
                <span key={tag} className="label-chip border-black/40 bg-black/40 backdrop-blur-sm text-nightfall-text">
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>

            <div className="absolute top-5 right-5 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-nightfall-amber/40 backdrop-blur-sm">
              <AlertCircle className="w-3.5 h-3.5 text-nightfall-amber animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-amber">
                SCENE RECONSTRUCTION · POST-OP
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
              <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm border border-nightfall-border/60 text-[10px] font-mono uppercase tracking-widest text-nightfall-textDim max-w-full">
                {article.heroCaption}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <MetaChip Icon={Hash} label="CASE" value={article.caseId || 'NF-CASE'} mono />
                <MetaChip Icon={Shield} label="FILE" value={article.id.toUpperCase()} mono />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10 p-4 md:p-5 panel">
          <MetaBlock Icon={FileText} label="CASE ID" value={article.caseId || 'NF-CASE'} mono highlight />
          <MetaBlock Icon={Radio} label="STATUS" value={article.status.split(' ')[0]} mono />
          <MetaBlock Icon={MapPin} label="LOCATION" value="LOCATION WITHHELD · N. EUROPE" />
          <MetaBlock Icon={Network} label="INVESTIGATION" value="BLACK MERIDIAN TF" />
          <MetaBlock Icon={RadioTower} label="SOURCE" value="NIGHTFALL INTEL" />
          <MetaBlock Icon={Calendar} label="DATE" value="12 AUG 2026" mono />
          <MetaBlock Icon={Eye} label="CONFIDENCE" value={`HIGH · ${article.confidence}%`} mono highlight />
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-10">
          <article className="min-w-0">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-nightfall-border flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nightfall-red/20 via-nightfall-border to-transparent border border-nightfall-borderLight flex items-center justify-center">
                  <span className="font-bold text-nightfall-text">
                    {author?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white flex items-center gap-1.5">
                    {author?.name}
                    <Link to={`/authors/${author?.id}`} className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim border-b border-nightfall-borderLight pb-px">
                      PROFILE
                    </Link>
                  </div>
                  <div className="text-[11px] text-nightfall-textMuted">{author?.title}</div>
                  <div className="text-[10px] font-mono text-nightfall-textDim mt-0.5">
                    Published {article.date} · Updated {article.updated} · {article.readTime} min read
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-nightfall-textDim">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 24,817 VIEWS</span>
                <span className="flex items-center gap-1"><Fingerprint className="w-3 h-3" /> NF-SIG-8842</span>
              </div>
            </div>

            <div className="prose-custom font-serif text-[15.5px] md:text-[17px] leading-[1.85] text-nightfall-text space-y-8">
              {article.content && article.content.map((section, sidx) => (
                <Section key={section.id} section={section} sidx={sidx} articleId={article.id} />
              ))}

              {(!article.content || article.content.length === 0) && (
                <div className="space-y-8 text-nightfall-textMuted">
                  <p>
                    Nightfall Intelligence is reconstructing this investigation. The material currently available below
                    includes public-releasable summaries and the classification-appropriate metadata cleared under the
                    editorial review protocol. A full narrative reconstruction will be compiled in a future update
                    to this case file.
                  </p>
                  <p className="text-[13px] leading-relaxed border-l-2 border-nightfall-amber/40 pl-4 italic text-nightfall-amber/90">
                    This article stub is part of the Nightfall Intelligence active reporting cycle. Related evidence,
                    linked threat actors, and associated cases are available in the sidebar and cross-reference sections.
                  </p>
                </div>
              )}
            </div>

            {article.id === getFeaturedArticle().id && (
              <div className="mt-14 space-y-14">
                <div id="wallet-flow">
                  <SectionHeader title="FOLLOWING THE MONEY" eyebrow="SECTION 3 · BLOCKCHAIN" Icon={<Database className="w-4 h-4 text-nightfall-blue" />} />
                  <WalletFlowVisualization />
                </div>

                <div id="digital-trail">
                  <SectionHeader title="THE DIGITAL TRAIL" eyebrow="SECTION 4 · TECHNICAL INDICATORS" Icon={<FileCode className="w-4 h-4 text-nightfall-green" />} />
                  <DigitalTrailTable />
                </div>

                <div id="fictional-location">
                  <SectionHeader title="THE LOCATION" eyebrow="SECTION 5 · TARGET GEOGRAPHY" Icon={<MapPin className="w-4 h-4 text-nightfall-amber" />} />
                  <FictionalLocationView />
                </div>

                <div id="timeline">
                  <SectionHeader title="CASE TIMELINE" eyebrow="OPERATIONAL SEQUENCE · RECONSTRUCTED" Icon={<Clock className="w-4 h-4 text-nightfall-red" />} />
                  {article.timeline && <CaseTimeline timeline={article.timeline} />}
                </div>

                <div id="operational-summary">
                  <SectionHeader title="REDACTED OPERATIONAL SUMMARY" eyebrow="SECTION 8 · DOCUMENTARY EVIDENCE" Icon={<FileText className="w-4 h-4 text-nightfall-amber" />} />
                  <RedactedDocument />
                </div>
              </div>
            )}

            <div className="mt-12 p-5 md:p-6 panel space-y-3 border-l-4 border-l-nightfall-amber/50">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-amber font-semibold">
                <AlertTriangle className="w-4 h-4" />
                Source Notes & Methodology
              </div>
              <p className="text-[12.5px] leading-relaxed text-nightfall-textMuted">
                This investigation was compiled through multi-channel corroboration per Nightfall Intelligence editorial
                standards. Source M-17 was handled under source-protection protocol, with signal verification conducted
                across three independent confirmatory channels before any attribution was published. All wallet
                addresses, IP fragments, hashes, domain names, timestamps, CCTV identifiers, and vehicle references
                have been cross-vetted against false-positive ranges and released defensively per responsible disclosure
                framework.
              </p>
              <p className="text-[12.5px] leading-relaxed text-nightfall-textMuted">
                Investigative entities referenced in this case include cross-agency task force participation: Federal
                Cyber Investigations Bureau (FCIB) liaison desk, Black Meridian Task Force operational units, Sentinel
                Cyber Division forensics team, Nightfall Intelligence Network research desk, and Orion Intelligence
                Group shared-intelligence partnership. Cooperation protocols governed by MOU-2026-CYBER-014.
              </p>
              <div className="text-[10px] font-mono text-nightfall-textDim pt-2 border-t border-nightfall-border/70">
                ANALYST: N. CROSS · REVIEWER: E. WARD · EDITORIAL: M. VOSS · CLEARED: 2026-08-13 · DOC-SIG: NF-RED-0812-017
              </div>
            </div>

            {relatedArticles.length > 0 && (
              <div className="mt-14">
                <SectionHeader title="RELATED INVESTIGATIONS" eyebrow="CROSS-REFERENCED FILES" Icon={<BookOpen className="w-4 h-4 text-nightfall-green" />} />
                <div className="grid md:grid-cols-2 gap-5">
                  {relatedArticles.map((a, i) => (
                    <NewsCard key={a.id} article={a} priority={i} />
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 self-start">
            <div className="panel p-0 overflow-hidden">
              <div className="px-4 py-3 border-b border-nightfall-border bg-black/30 flex items-center gap-2">
                <Database className="w-4 h-4 text-nightfall-blue" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-text font-semibold">
                  Case Metadata
                </span>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <ConfidenceBar value={article.confidence} label="INVESTIGATIVE CONFIDENCE" />
                </div>
                <div className="space-y-2 text-[10.5px]">
                  <MetaRow k="CASE ID" v={article.caseId || 'NF-CASE'} />
                  <MetaRow k="FILE REF" v={article.id.toUpperCase()} />
                  <MetaRow k="ARCHIVE #" v="NF-ARCH-2026-0812-001" />
                  <MetaRow k="CATEGORY" v={article.category.toUpperCase()} />
                  <MetaRow k="ANALYST ASSIGN" v="ANALYST N. CROSS" />
                  <MetaRow k="REVIEW CYCLE" v="3 PASSES · 0 FINDINGS" />
                  <MetaRow k="CUSTODY LOCK" v="ENABLED · CHAIN-3" />
                  <MetaRow k="RELEASABILITY" v="TIER-2 PARTNERS" />
                </div>
              </div>
            </div>

            <div className="panel p-0 overflow-hidden">
              <div className="px-4 py-3 border-b border-nightfall-border bg-black/30 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-nightfall-red" />
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-text font-semibold">
                  Digital Evidence
                </span>
                <span className="ml-auto text-[9px] font-mono text-nightfall-textDim">{articleEvidence.length} ITEMS</span>
              </div>
              <div className="p-4 space-y-4">
                {articleEvidence.length > 0 ? (
                  articleEvidence.map(ev => <EvidenceCard key={ev.id} evidence={ev} compact />)
                ) : (
                  <div className="text-[11px] text-nightfall-textDim text-center py-4">
                    Evidence links not present for this stub article.
                  </div>
                )}
                <Link
                  to="/evidence"
                  className="block text-center py-2 border border-nightfall-border hover:border-nightfall-borderLight text-[10px] font-mono uppercase tracking-wider text-nightfall-textMuted hover:text-nightfall-text"
                >
                  Browse Evidence Index
                </Link>
              </div>
            </div>

            {articleActors.length > 0 && (
              <div className="panel p-0 overflow-hidden">
                <div className="px-4 py-3 border-b border-nightfall-border bg-black/30 flex items-center gap-2">
                  <Network className="w-4 h-4 text-nightfall-amber" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-text font-semibold">
                    Linked Threat Actors
                  </span>
                </div>
                <div className="divide-y divide-nightfall-border/70">
                  {articleActors.map(actor => (
                    <Link key={actor.id} to={`/threat-actors#${actor.id}`} className="block p-4 hover:bg-nightfall-card/50 transition-colors">
                      <div className="flex items-start justify-between mb-1.5">
                        <span className="text-[12px] font-bold tracking-wider text-nightfall-text">{actor.alias}</span>
                        <StatusIndicator
                          status={actor.activity === 'Active' ? 'ACTIVE' : actor.activity === 'Defunct' ? 'CLOSED' : 'ARCHIVED'}
                          size="sm"
                        />
                      </div>
                      <div className="text-[10px] font-mono text-nightfall-textDim mb-2">
                        FIRST: {actor.firstObserved} · CONF {actor.confidence}%
                      </div>
                      <p className="text-[11px] leading-snug text-nightfall-textMuted line-clamp-2">{actor.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="panel p-5 space-y-4 text-[11px]">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-amber font-semibold">
                <AlertCircle className="w-4 h-4" />
                Reporting Disclaimer
              </div>
              <p className="leading-relaxed text-nightfall-textMuted">
                For editorial and research use. Attribution confidence assessed at 85.7% per Nightfall scoring rubric.
                Source handling conducted per internal methodology v3.2. All coordinates partially obfuscated and
                identifiers cross-vetted against false-positive pools before publication. Contact desk for additional
                clarification or access to expanded documentation package.
              </p>
              <div className="pt-3 border-t border-nightfall-border/70 space-y-1.5 text-[10px] font-mono text-nightfall-textDim">
                <div className="flex justify-between"><span>RENDER NODE</span><span>NF-PUB-03 / SEC</span></div>
                <div className="flex justify-between"><span>DOC HASH</span><span className="text-nightfall-amber/80">8F3A77C1…</span></div>
                <div className="flex justify-between"><span>PAGE SIGNED</span><span>ANALYST RVW-7</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

function MetaBlock({ Icon, label, value, mono, highlight }: { Icon: any; label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div className={`p-3 border ${highlight ? 'border-nightfall-red/30 bg-nightfall-red/5' : 'border-nightfall-border bg-nightfall-card/40'}`}>
      <div className="flex items-center gap-1.5 mb-1.5 text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim">
        <Icon className="w-3 h-3" /> {label}
      </div>
      <div className={`${mono ? 'font-mono' : ''} text-[12px] font-semibold ${highlight ? 'text-nightfall-red' : 'text-nightfall-text'} leading-tight break-all`}>
        {value}
      </div>
    </div>
  )
}

function MetaChip({ Icon, label, value, mono }: { Icon: any; label: string; value: string; mono?: boolean }) {
  return (
    <div className="px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-nightfall-border/60 flex items-center gap-1.5">
      <Icon className="w-3 h-3 text-nightfall-textDim" />
      <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim">{label}:</span>
      <span className={`text-[10px] ${mono ? 'font-mono' : ''} text-nightfall-text font-semibold`}>{value}</span>
    </div>
  )
}

function MetaRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-2 py-1 px-2 border-l-2 border-nightfall-border/80 pl-3">
      <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim flex-shrink-0 pt-0.5">{k}</span>
      <span className="text-right text-nightfall-text font-mono text-[11px] break-all leading-tight">{v}</span>
    </div>
  )
}

function SectionHeader({ title, eyebrow, Icon }: { title: string; eyebrow: string; Icon: React.ReactNode }) {
  return (
    <div className="mb-5 pb-3 border-b border-nightfall-border flex items-end justify-between flex-wrap gap-2">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          {Icon}
          <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-nightfall-red font-semibold">{eyebrow}</span>
        </div>
        <h3 className="text-[20px] md:text-[24px] font-bold tracking-tight text-white">{title}</h3>
      </div>
    </div>
  )
}

function Section({ section, sidx, articleId }: { section: any; sidx: number; articleId: string }) {
  return (
    <section id={`section-${section.id}`} className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-mono text-nightfall-red font-bold">§ {sidx + 1}</span>
        <h2 className="text-[22px] md:text-[28px] font-bold tracking-tight text-white font-sans">
          {section.title}
        </h2>
      </div>
      <div className="space-y-5">
        {(section.body || '').split(/\n\n+/).map((p: string, i: number) => (
          <p key={i} className="text-[15.5px] md:text-[17px] leading-[1.9]">
            {p.trim()}
          </p>
        ))}
      </div>
    </section>
  )
}

function DigitalTrailTable() {
  const indicators = [
    { type: 'IP FRAGMENT', value: '192.0.2.88 / 2001:db8:beef:deaf:f00d:cafe:baad:f00d', note: 'Primary C2 channel · 6 hop chain observed', first: '2026-08-10 18:42' },
    { type: 'DOMAIN (ONION)', value: 'operator-ctrl-7f3a[.]onion', note: 'Access concentrator · rotating backend', first: '2026-08-11 00:17' },
    { type: 'SHA-256 (PAYLOAD)', value: '7F3A2D119C5B8E4F2A6D1B9C3E8F0A2D4C6B8E1F0A3D5C7B9E2F1A4D6C8E0B3F5', note: 'Second-stage staging payload signature', first: '2026-08-11 04:38' },
    { type: 'WALLET (XMR)', value: '4xMeridianClusterWalletAddress8a2f1b9c3d7e6a8b0c2d4f6e8a0b2c4d6f8e0', note: 'Collection node · Wallet C outbound', first: '2026-08-10 14:09' },
    { type: 'FILENAME', value: 'schedule_broadcast_0811.ps1', note: 'Task persistence · 6 scheduled triggers', first: '2026-08-11 19:22' },
    { type: 'TIMESTAMP CORR.', value: '2026-08-12 01:00:00 ± 12s (planned start)', note: 'Transmission window · beacon sync', first: 'Cross-correlated' },
    { type: 'JABBER ID', value: 'op_sched_ops@xmpp-services[.]net', note: 'Ops channel · 2 message fragments recovered', first: '2026-08-11 20:51' },
    { type: 'USER AGENT', value: 'BroadcastController/1.3 (compatible; Nightfall-INT)', note: 'Controller beacon · 14 observed nodes', first: '2026-08-11 23:11' },
  ]

  return (
    <div className="panel p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[11.5px]">
          <thead>
            <tr className="bg-black/40 text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim">
              <th className="text-left px-4 py-3 font-semibold">TYPE</th>
              <th className="text-left px-4 py-3 font-semibold">INDICATOR VALUE</th>
              <th className="text-left px-4 py-3 font-semibold">FIRST SEEN</th>
              <th className="text-left px-4 py-3 font-semibold">NOTE</th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="border-t border-nightfall-border/60 hover:bg-nightfall-card/40 transition-colors"
              >
                <td className="px-4 py-3 align-top">
                  <span className="inline-flex px-1.5 py-0.5 text-[9px] font-mono border border-nightfall-borderLight bg-nightfall-bg text-nightfall-amber font-semibold">
                    {row.type}
                  </span>
                </td>
                <td className="px-4 py-3 align-top font-mono text-[10.5px] text-nightfall-text break-all leading-snug max-w-[360px]">{row.value}</td>
                <td className="px-4 py-3 align-top font-mono text-[10.5px] text-nightfall-textDim whitespace-nowrap">{row.first}</td>
                <td className="px-4 py-3 align-top text-[10.5px] text-nightfall-textMuted leading-snug">{row.note}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-nightfall-amber/5 border-t border-nightfall-border/60 text-[10px] font-mono text-nightfall-amber flex items-start gap-2">
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        Indicators cross-vetted against MISP false-positive databases before release. IOCs published per Responsible
        Disclosure framework v2.4 — validate against your environment baseline before production blocking. Any
        resemblance to unrelated live indicators should be reported to the Nightfall desk for immediate review.
      </div>
    </div>
  )
}

function FictionalLocationView() {
  return (
    <div className="panel p-0 overflow-hidden relative">
      <div className="relative h-[360px] md:h-[440px] bg-gradient-to-br from-nightfall-card via-nightfall-bg to-nightfall-panel">
        <img
          src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=satellite%20top%20down%20map%20view%20of%20industrial%20zone%20at%20night%2C%20warehouse%20buildings%20railway%20lines%20roads%2C%20infrared%20heatmap%20style%2C%20grid%20lines%20overlaid%2C%20digital%20hud%20markers%20reconnaissance%20imagery&image_size=landscape_16_9"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-nightfall-bg/10 to-nightfall-bg" />

        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2b6cb0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="absolute top-24 left-1/3 w-4 h-4 rounded-full bg-nightfall-red border-2 border-white shadow-[0_0_20px_#b4343a] animate-pulse-slow" />
        <div className="absolute top-24 left-[calc(33%+20px)] text-[10px] font-mono text-nightfall-red bg-black/70 px-2 py-0.5 border border-nightfall-red/50">
          PRIME · 0.47 KM²
        </div>

        <div className="absolute top-40 left-[42%] w-2.5 h-2.5 rounded-full bg-nightfall-amber border border-nightfall-text animate-pulse" />
        <div className="absolute top-52 right-[28%] w-2.5 h-2.5 rounded-full bg-nightfall-amber border border-nightfall-text animate-pulse" />
        <div className="absolute bottom-32 left-[24%] w-2.5 h-2.5 rounded-full bg-nightfall-amber border border-nightfall-text animate-pulse" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="33%" y1="26%" x2="42%" y2="45%" stroke="#c98a2a" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <line x1="33%" y1="26%" x2="72%" y2="60%" stroke="#c98a2a" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
          <line x1="33%" y1="26%" x2="24%" y2="78%" stroke="#c98a2a" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        </svg>

        <div className="absolute top-5 left-5 px-3 py-2 bg-black/70 backdrop-blur-sm border border-nightfall-amber/50">
          <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-amber font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3" />
            Protected Location · Identity of Site Withheld
          </div>
          <div className="text-[10px] font-mono text-nightfall-textDim mt-1">
            COORDS OBFUSCATED · GRID NF-7813-A / ZONE 4
          </div>
        </div>

        <div className="absolute top-5 right-5 space-y-1 text-[9px] font-mono text-nightfall-textDim text-right">
          <div>SATELLITE: NF-SAR-07</div>
          <div>IMAGERY: 2026-08-11 23:47 LOCAL</div>
          <div>RESOLUTION: 0.8 M / RECON</div>
          <div>CONFIDENCE: <span className="text-nightfall-green">79%</span></div>
        </div>

        <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
          <div className="px-3 py-2 bg-black/70 backdrop-blur-sm border border-nightfall-border">
            <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-amber mb-0.5">Reconstructed Site Layout</div>
            <div className="text-[10.5px] font-mono text-nightfall-text">
              3 BAYS · 2-STORY ANNEX · 4,200 M² · DECOMM. 2019
            </div>
          </div>
          <div className="flex items-center gap-3 text-[9px] font-mono">
            <LegendSwatch color="#b4343a" label="PRIME TARGET" />
            <LegendSwatch color="#c98a2a" label="CCTV CORROBORATION" />
            <LegendSwatch color="#2b6cb0" label="VEHICLE APPROACH" />
          </div>
        </div>
      </div>
    </div>
  )
}

function LegendSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-nightfall-textDim">
      <span className="w-2.5 h-2.5" style={{ backgroundColor: color }} />
      {label}
    </div>
  )
}
