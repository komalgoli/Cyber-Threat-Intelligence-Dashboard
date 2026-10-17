import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileVideo, Hash, Fingerprint, Database, FileText, Network, Package, ChevronDown, ChevronUp, FileCheck, Link2, Clipboard, Lock } from 'lucide-react'
import type { Evidence } from '../data/evidence'
import { StatusIndicator } from './StatusIndicator'

const typeIcons: Record<string, { Icon: any; color: string }> = {
  CCTV: { Icon: FileVideo, color: 'text-nightfall-amber' },
  'BLOCKCHAIN ANALYSIS': { Icon: Database, color: 'text-nightfall-blue' },
  'ENCRYPTED COMMUNICATION': { Icon: Network, color: 'text-nightfall-red' },
  'FORENSIC IMAGE': { Icon: Fingerprint, color: 'text-nightfall-green' },
  'LOG FILE': { Icon: FileText, color: 'text-nightfall-amber' },
  'DOCUMENT': { Icon: FileCheck, color: 'text-nightfall-blue' },
  'NETWORK CAPTURE': { Icon: Package, color: 'text-nightfall-green' },
}

export function EvidenceCard({ evidence, compact = false, idx = 0 }: { evidence: Evidence; compact?: boolean; idx?: number }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const def = { Icon: FileText, color: 'text-nightfall-textDim' }
  const cfg = typeIcons[evidence.type] || def
  const Icon = cfg.Icon
  const color = cfg.color

  const rots = [-1.1, 0.9, -0.5, 1.3, -0.7]
  const rot = rots[idx % 5]
  const borderVariants = ['border-uneven', 'border-uneven-2', 'border-uneven-3']
  const bv = borderVariants[idx % 3]

  const copyHash = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (evidence.hash) {
      navigator.clipboard?.writeText(evidence.hash)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <motion.div
      className={`card p-0 overflow-hidden group hover:border-nightfall-borderLight ${bv} relative`}
      whileHover={{ y: -3 + (idx % 2 === 0 ? -1 : 0), rotate: rot * 0.2 }}
      transition={{ duration: 0.15 }}
      style={{
        transform: `rotate(${rot}deg) translateY(${(idx % 2 === 0 ? -2 : 3)}px)`,
        boxShadow: idx % 2 === 0
          ? '3px 5px 13px -4px rgba(0,0,0,0.55)'
          : '-2px 6px 14px -5px rgba(0,0,0,0.6)',
      }}
    >
      <div className={`tape ${idx % 3 === 0 ? 'tape-corner-tr' : idx % 3 === 1 ? 'tape-corner-bl' : 'tape-side-r'}`} />
      {idx % 3 === 2 && <div className="dogear" />}
      <div className="absolute top-3 right-12 z-[2]">
        <span className={`stamp stamp-green rot-p1`} style={{ fontSize: 7.5, padding: '1.5px 7px 2px' }}>
          {idx % 2 === 0 ? 'CHAIN OK' : 'EVIDENCE'}
        </span>
      </div>
      {idx === 0 && (
        <div className="absolute bottom-16 right-2 z-[2] hidden md:block">
          <span className="stamp stamp-red rot-n2" style={{ fontSize: 8, padding: '1.5px 7px 2px' }}>
            CRITICAL
          </span>
        </div>
      )}

      <div className="p-4 relative">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className={`p-2 border border-current/20 bg-current/5 ${color} relative ${idx % 2 ? 'rot-n1' : 'rot-p1'}`} style={{ borderRadius: idx % 2 ? '2px 4px 1px 3px' : '3px 1px 4px 2px' }}>
            <Icon className="w-4 h-4" />
            <span className="absolute -bottom-1 -right-1 w-[8px] h-[8px] bg-nightfall-bg border border-nightfall-border/80 rounded-full flex items-center justify-center">
              <Lock className="w-[4px] h-[4px] text-nightfall-green/80" />
            </span>
          </div>
          <StatusIndicator status={evidence.status} />
        </div>

        <div className="mb-2 relative">
          <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1 flex items-center justify-between">
            <span>{evidence.type}</span>
            <span className="font-hand text-nightfall-amber/70 text-[10px] -rotate-3 normal-case tracking-normal">
              ex. #{(idx + 7).toString().padStart(4, '0')}
            </span>
          </div>
          <div className="font-mono text-[12px] text-nightfall-text break-all">{evidence.file}</div>
          <span className="font-hand text-nightfall-textDim/70 text-[11px] -rotate-2 block mt-0.5 translate-x-1 hidden sm:block">
            ⇢ see also case file §{idx + 2}
          </span>
        </div>

        {!compact && (
          <>
            {evidence.hash && (
              <div className="mt-3 pt-3 border-t border-nightfall-border/70 relative group/hash">
                <div className="absolute -top-[8px] left-3 text-[8px] font-mono text-nightfall-textDim/70 bg-nightfall-card px-1 rot-n1">
                  FINGERPRINT
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1">
                      <Hash className="w-3 h-3 inline mr-1" /> HASH (SHA-{idx % 2 ? '256' : '512'})
                    </div>
                    <div className="text-[10px] font-mono text-nightfall-amber/80 break-all pr-1 select-all">
                      {evidence.hash}
                    </div>
                  </div>
                  <button
                    onClick={copyHash}
                    className="flex-shrink-0 p-1 border border-nightfall-border/70 hover:border-nightfall-amber/50 hover:text-nightfall-amber text-nightfall-textDim/70 transition-colors"
                    title="Copy hash"
                  >
                    {copied ? '✓' : <Clipboard className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            )}

            {evidence.confidence !== undefined && (
              <div className="mt-3 pt-3 border-t border-nightfall-border/70 flex justify-between items-center relative">
                <div className="absolute -top-[8px] left-3 text-[8px] font-mono text-nightfall-textDim/70 bg-nightfall-card px-1 rot-p1">
                  INTEGRITY
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim">CONFIDENCE</span>
                <span className="text-[11px] font-mono font-semibold text-nightfall-green inline-flex items-center gap-1">
                  {(evidence.confidence + (idx % 3) * 0.7 - 1.2).toFixed(1)}%
                  <span className="w-1 h-1 rounded-full bg-current animate-pulse-slower" />
                </span>
              </div>
            )}

            {evidence.size && (
              <div className="mt-2 text-[10px] font-mono text-nightfall-textDim flex justify-between items-center">
                <span className="rot-n1 inline-block">SIZE</span>
                <span className="text-nightfall-text rot-p1 inline-block px-1.5 py-0.5 border border-nightfall-border/60">{evidence.size}</span>
              </div>
            )}
          </>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 text-[10px] font-mono uppercase tracking-widest text-nightfall-textDim border-t border-nightfall-border/70 hover:text-nightfall-text transition-colors relative"
        >
          <div className="absolute -top-[8px] left-1/2 -translate-x-1/2 text-[8px] font-mono text-nightfall-textDim/60 bg-nightfall-card px-1 rot-n1">
            {expanded ? 'CLOSE' : 'DETAILS'}
          </div>
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? 'COLLAPSE' : 'VIEW FULL RECORD'}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-nightfall-border relative"
          >
            <div className="absolute top-2 right-3 z-[2]">
              <span className="stamp stamp-blue rot-n1" style={{ fontSize: 7.5, padding: '1.5px 7px 2px' }}>
                CHAIN LOG
              </span>
            </div>
            <div className="p-4 bg-black/30 space-y-3 text-[11px] relative">
              <div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1 flex items-center gap-1">
                  SOURCE
                  <span className="font-hand text-nightfall-amber/70 text-[10px] -rotate-2 ml-1 normal-case tracking-normal">
                    origin verified
                  </span>
                </div>
                <div className="font-mono text-nightfall-text">{evidence.source}</div>
              </div>
              {evidence.captured && (
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1">CAPTURED</div>
                  <div className="font-mono text-nightfall-amber/80">{evidence.captured}</div>
                </div>
              )}
              {evidence.description && (
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1">DESCRIPTION</div>
                  <p className="text-nightfall-textMuted leading-[1.7]">{evidence.description}</p>
                </div>
              )}
              {evidence.chainOfCustody && (
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-2 flex items-center gap-1">
                    <Link2 className="w-3 h-3" /> CHAIN OF CUSTODY
                    <span className="font-hand text-nightfall-green/70 text-[10px] -rotate-2 ml-1 normal-case tracking-normal">
                      no gaps · {evidence.chainOfCustody.length} entries
                    </span>
                  </div>
                  <ol className="space-y-2 border-l border-nightfall-border/80 ml-1 relative before:content-[''] before:absolute before:left-[-3px] before:top-0 before:bottom-0 before:w-px before:bg-nightfall-red/20">
                    {evidence.chainOfCustody.map((c, i) => (
                      <li key={i} className={`pl-3 relative ${i % 2 ? 'translate-x-[1px]' : '-translate-x-[1px]'}`}>
                        <span className={`absolute -left-[3px] top-1 w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-nightfall-red' : i === evidence.chainOfCustody!.length - 1 ? 'bg-nightfall-green' : 'bg-nightfall-borderLight'}`}></span>
                        <div className={`font-mono text-[10px] text-nightfall-textDim ${i % 2 ? 'rot-p1' : 'rot-n1'} inline-block`}>{c.date}</div>
                        <div className="text-nightfall-text">{c.action}</div>
                        <div className="text-[10px] text-nightfall-textDim flex items-center gap-1.5">
                          <span>— {c.analyst}</span>
                          {i === evidence.chainOfCustody!.length - 1 && (
                            <span className="font-hand text-nightfall-green/70 -rotate-2">current</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
