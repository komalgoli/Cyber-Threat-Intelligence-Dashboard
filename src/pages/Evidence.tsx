import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fingerprint, FileCog, Search, Calendar, Shield, AlertTriangle, ChevronDown, ChevronUp, Hash } from 'lucide-react'
import { evidence } from '../data/evidence'
import { ClassificationBadge } from '../components/ClassificationBadge'
import { StatusIndicator } from '../components/StatusIndicator'

export default function Evidence() {
  const [activeId, setActiveId] = useState<string | null>(evidence[0]?.id ?? null)
  const active = evidence.find(e => e.id === activeId)

  const typeIcons: Record<string, React.ReactNode> = {
    CCTV: <Search className="w-4 h-4" />,
    'BLOCKCHAIN ANALYSIS': <FileCog className="w-4 h-4" />,
    'ENCRYPTED COMMUNICATION': <Shield className="w-4 h-4" />,
    'FORENSIC IMAGE': <Fingerprint className="w-4 h-4" />,
    'LOG FILE': <FileCog className="w-4 h-4" />,
    DOCUMENT: <Search className="w-4 h-4" />,
    'NETWORK CAPTURE': <Search className="w-4 h-4" />,
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 md:py-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Fingerprint className="w-6 h-6 text-nightfall-green" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-nightfall-green font-bold">
            Evidence Database · Chain-of-Custody Dataset
          </span>
        </div>
        <h1 className="text-[28px] md:text-[38px] font-bold tracking-tight text-white mb-3 leading-tight">
          Evidence & Artifact Vault
        </h1>
        <p className="text-[14px] text-nightfall-textMuted max-w-3xl">
          Captured artifacts, forensic images, capture files, and case exhibits with chain-of-custody records
          and file provenance. All items are cross-referenced against MISP false-positive databases and
          environment baselines before release — validate locally before taking operational action.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'ARTIFACTS IN VAULT', value: evidence.length.toString(), color: 'text-nightfall-green' },
          { label: 'IMAGES / CAPTURES', value: evidence.filter(e => ['CCTV', 'FORENSIC IMAGE', 'NETWORK CAPTURE'].includes(e.type)).length.toString(), color: 'text-nightfall-blue' },
          { label: 'FORENSIC RECORDS', value: evidence.filter(e => e.type === 'FORENSIC IMAGE' || e.type === 'LOG FILE').length.toString(), color: 'text-nightfall-amber' },
          { label: 'TOTAL HASH LINKS', value: evidence.filter(e => e.hash).length.toString(), color: 'text-nightfall-red' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="border border-nightfall-border bg-nightfall-card/40 p-4"
          >
            <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1.5">{s.label}</div>
            <div className={`text-[20px] font-bold font-mono ${s.color}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-5 md:gap-6">
        <div className="lg:col-span-2 panel p-0 overflow-hidden max-h-[820px] overflow-y-auto">
          <div className="px-4 py-3 border-b border-nightfall-border/60 bg-black/30 flex items-center justify-between flex-wrap gap-2 sticky top-0 z-10">
            <div className="text-[10px] font-mono uppercase tracking-widest text-nightfall-textDim font-bold">
              Evidence Items List
            </div>
            <span className="text-[9px] font-mono text-nightfall-red">{evidence.length} ENTRIES</span>
          </div>
          <div className="divide-y divide-nightfall-border/60">
            {evidence.map((e, i) => (
              <button
                key={e.id}
                onClick={() => setActiveId(e.id)}
                className={`w-full p-4 text-left flex gap-3 hover:bg-nightfall-card/50 transition-colors ${activeId === e.id ? 'bg-nightfall-card/60 border-l-2 border-nightfall-red' : 'border-l-2 border-transparent'}`}
              >
                <div className="w-10 h-10 flex-shrink-0 border border-nightfall-border bg-black/30 flex items-center justify-center text-nightfall-amber opacity-80">
                  {typeIcons[e.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-[11.5px] font-semibold text-nightfall-text truncate">{e.file}</span>
                    <span className="text-[9px] font-mono text-nightfall-textDim flex-shrink-0">#{i + 1}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="label-chip border-nightfall-border text-[9px]">{e.type}</span>
                    <span className="label-chip border-nightfall-border text-[9px] text-nightfall-textDim">{e.status}</span>
                  </div>
                  <div className="text-[10px] font-mono text-nightfall-textDim truncate">{e.caseId} · {e.source}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="panel p-0 overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-nightfall-border bg-black/40 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 border border-nightfall-border flex items-center justify-center bg-black/30 text-nightfall-amber">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[16px] md:text-[18px] font-bold text-nightfall-text tracking-tight">{active.file}</div>
                      <div className="text-[10.5px] font-mono text-nightfall-textDim mt-0.5">
                        {active.caseId} · {active.source}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClassificationBadge classification={active.classification as any} compact />
                    <StatusIndicator status={active.status as any} size="sm" />
                  </div>
                </div>

                <div className="p-5 md:p-7 grid md:grid-cols-2 gap-5 md:gap-7">
                  <div>
                    <h4 className="text-[10.5px] font-mono uppercase tracking-widest text-nightfall-red font-bold mb-2.5">
                      Artifact Metadata
                    </h4>
                    <dl className="space-y-2 text-[12px]">
                      <MetaRow k="TYPE" v={<span className="label-chip border-nightfall-border text-nightfall-amber">{active.type}</span>} />
                      <MetaRow k="SOURCE" v={active.source} />
                      <MetaRow k="CASE" v={active.caseId} />
                      <MetaRow k="FILE SIZE" v={active.size} />
                      <MetaRow k="DIGEST (SHA-256)" v={active.hash} hash />
                      <MetaRow k="CAPTURED" v={active.captured} />
                      <MetaRow k="HANDLED BY" v={active.handler || '—'} />
                    </dl>

                    <div className="mt-5 pt-4 border-t border-nightfall-border/60">
                      <h4 className="text-[10.5px] font-mono uppercase tracking-widest text-nightfall-blue font-bold mb-2.5 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" /> Chain of Custody
                      </h4>
                      <ol className="relative border-l border-nightfall-border/60 pl-4 space-y-2.5 mt-3">
                        {(active.chain || []).map((c, i) => (
                          <li key={i} className="relative">
                            <span className="absolute -left-[19px] top-0.5 w-2 h-2 rounded-full bg-nightfall-green border border-nightfall-bg" />
                            <div className="text-[10px] font-mono text-nightfall-green">{c.date}</div>
                            <div className="text-[11.5px] text-nightfall-text leading-snug mt-0.5">{c.action} — {c.officer}</div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10.5px] font-mono uppercase tracking-widest text-nightfall-amber font-bold mb-2.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Analyst Notes
                    </h4>
                    <div className="card p-4 mb-5">
                      <p className="text-[12.5px] leading-relaxed text-nightfall-textMuted">
                        {active.description}
                      </p>
                    </div>

                    <h4 className="text-[10.5px] font-mono uppercase tracking-widest text-nightfall-green font-bold mb-2.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Retention / Disposition
                    </h4>
                    <div className="card p-4 grid grid-cols-2 gap-3 mb-5">
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-0.5">Retention (yrs)</div>
                        <div className="text-[15px] font-bold font-mono text-nightfall-text">{active.retention || '7'}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-0.5">Storage</div>
                        <div className="text-[11px] font-mono text-nightfall-text">OFFLINE · ENCRYPTED</div>
                      </div>
                    </div>

                    <h4 className="text-[10.5px] font-mono uppercase tracking-widest text-nightfall-red font-bold mb-2.5 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5" /> Integrity Verification
                    </h4>
                    <div className="card p-4 font-mono text-[10px] leading-relaxed break-all text-nightfall-textDim">
                      {active.hash}
                      <div className="mt-2 pt-2 border-t border-nightfall-border/60 flex items-center justify-between">
                        <span>VERIFIED HASH · PASS</span>
                        <span className="text-nightfall-green">■ OK</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-nightfall-border bg-black/30 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-nightfall-textDim">
                  <span>EVIDENCE ITEM: {active.id.toUpperCase()} · EXHIBIT: {active.file.split('.').slice(0, -1).join('.').toUpperCase()}</span>
                  <span className="flex items-center gap-1.5">
                    <ChevronDown className="w-3.5 h-3.5" />
                    SELECT ITEM IN LEFT PANEL FOR DETAILS
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function MetaRow({ k, v, hash }: { k: string; v: React.ReactNode; hash?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-3 border-b border-dashed border-nightfall-border/50 pb-1.5 last:border-none last:pb-0">
      <dt className="text-[10px] font-mono uppercase tracking-widest text-nightfall-textDim pt-0.5 flex-shrink-0">{k}</dt>
      <dd className={`text-right ${hash ? 'font-mono text-[9.5px] break-all max-w-[260px] leading-tight text-nightfall-text' : 'text-[12px] text-nightfall-text'}`}>{v}</dd>
    </div>
  )
}
