import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileLock, Eye, Download, Share2, ChevronRight } from 'lucide-react'

const redactionBlocks = [
  { type: 'text', value: '███████████████████████' },
  { type: 'text', value: '██████████' },
  { type: 'text', value: '███████████████████████████' },
  { type: 'text', value: '█████' },
  { type: 'text', value: '████████████████' },
]

export function RedactedDocument() {
  const [zoom, setZoom] = useState(false)

  return (
    <div className="panel p-0 overflow-hidden relative">
      <div className="border-b border-nightfall-border bg-black/30">
        <div className="px-5 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FileLock className="w-4 h-4 text-nightfall-amber" />
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-text">Black Meridian Task Force — Operational Summary</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-nightfall-card border border-transparent hover:border-nightfall-border" onClick={() => setZoom(v => !v)}>
              <Eye className="w-3.5 h-3.5 text-nightfall-textMuted" />
            </button>
            <button className="p-1.5 hover:bg-nightfall-card border border-transparent hover:border-nightfall-border">
              <Download className="w-3.5 h-3.5 text-nightfall-textMuted" />
            </button>
            <button className="p-1.5 hover:bg-nightfall-card border border-transparent hover:border-nightfall-border">
              <Share2 className="w-3.5 h-3.5 text-nightfall-textMuted" />
            </button>
          </div>
        </div>
        <div className="px-5 py-2 bg-nightfall-amber/5 border-t border-nightfall-border/50 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="label-chip border-nightfall-amber/50 text-nightfall-amber bg-nightfall-amber/10">CLASSIFICATION: SENSITIVE · SOURCE ON FILE</span>
            <span className="label-chip border-nightfall-border text-nightfall-textDim">CASE ID: NF-CASE-0812-RR</span>
            <span className="label-chip border-nightfall-border text-nightfall-textDim">OP: BLACK MERIDIAN / RED ROOM</span>
          </div>
          <span className="text-[9px] font-mono text-nightfall-textDim">PAGES 1 / 7 · PARTIAL REDACTION APPLIED</span>
        </div>
      </div>

      <div className={`bg-[#f5f1e8] text-black font-serif relative ${zoom ? 'scale-[1.02]' : ''} transition-transform duration-300`}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-grain" />
        <div className="relative p-6 md:p-10 space-y-5 scanlines overflow-auto max-h-[600px]">
          <div className="flex items-start justify-between border-b-2 border-black/70 pb-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-black/70">FCIB / BLACK MERIDIAN TASK FORCE</div>
              <div className="text-[14px] font-bold mt-1 tracking-tight">OPERATIONAL SUMMARY — POST-ACTION RECONSTRUCTION</div>
              <div className="text-[10px] font-mono mt-1 text-black/60">FILE REF: BM-TF-2026-0812-001 / REV-B</div>
            </div>
            <div className="text-right">
              <div className="px-3 py-1.5 border-2 border-double border-nightfall-red/60 text-[10px] font-mono text-nightfall-red inline-block">
                <div>NOFORN</div>
                <div className="tracking-widest">FVEY ONLY</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] font-mono">
            <div className="flex">
              <span className="w-28 text-black/50">CLASSIFICATION:</span>
              <span className="font-semibold">SENSITIVE · SOURCE ON FILE</span>
            </div>
            <div className="flex">
              <span className="w-28 text-black/50">HANDLER:</span>
              <span>{redactionBlocks[1].value}</span>
            </div>
            <div className="flex">
              <span className="w-28 text-black/50">DATE OF OP:</span>
              <span>11-12 AUG 2026 · OP WINDOW</span>
            </div>
            <div className="flex">
              <span className="w-28 text-black/50">LOCATION:</span>
              <span>LOCATION REDACTED</span>
            </div>
          </div>

          <div className="pt-2 text-[12.5px] leading-relaxed space-y-4">
            <p>
              <span className="font-bold">1. PURPOSE.</span> This memorandum provides a reconstructed summary of the
              multi-element operation conducted on the night of 11-12 August 2026 in support of the Black Meridian
              investigation. Data within compiled from field transmissions, chain-of-custody receipts, and post-op
              after-action reports. Source identities and specific tradecraft details remain redacted pending wider
              declassification review.
            </p>
            <p>
              <span className="font-bold">2. SOURCE.</span> Intelligence originated from SOURCE M-17, an asset with
              previously vetted through {redactionBlocks[2].value}. The source was embedded within the
              {redactionBlocks[0].value} criminal network for a period of
              {redactionBlocks[3].value} months prior to transmission. Source reliability assessed as HIGH.
            </p>
            <p>
              <span className="font-bold">3. INITIAL SIGNAL.</span> At 21:04 local on 11 AUG, the first encrypted
              transmission was received via {redactionBlocks[4].value}. Verification phrase confirmed genuine per established protocol.
              Immediate escalation effected across three command tiers.
            </p>
            <p>
              <span className="font-bold">4. ANALYSIS PHASE.</span> Concurrent tracks were opened:
              (a) blockchain — two-hop mixer cluster traced to Wallet A → Mixer → Wallet C → Operational Account (87% correlation);
              (b) CCTV — Node-0417 fragment yielded partial Vehicle Identification Number reflection;
              (c) vehicle movement analysis across {redactionBlocks[2].value};
              (d) partial decryption of chat_fragment.enc (14% payload recovery).
            </p>
            <p>
              <span className="font-bold">5. DEPLOYMENT.</span> Location confidence threshold reached at 23:41 local.
              Three elements departed staging at 00:18. Perimeter secured 00:38. Entry effected through
              {redactionBlocks[1].value}. Facility secured 00:46. Individual located 00:51.
              No resistance encountered.
            </p>
            <p>
              <span className="font-bold">6. OUTCOME.</span> Subject removed to receiving medical
              facility. Broadcast infrastructure seized prior to scheduled 01:00 transmission. Evidence collection 01:12–06:40 local.
              Operation completed 02:38.
            </p>
            <p>
              <span className="font-bold">7. DISTRIBUTION.</span> This document marked PARTIALLY REDACTED
              — released under Nightfall Intelligence responsible-disclosure protocol. Not for secondary publication
              without cross-corroboration against originating case file materials.
            </p>
          </div>

          <div className="pt-4 border-t border-black/30 flex justify-between items-end flex-wrap gap-4">
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-black/50 mb-1">PREPARED BY</div>
              <div className="italic">{redactionBlocks[4].value}</div>
              <div className="text-[10px] font-mono text-black/50 mt-0.5">FCIB / BLACK MERIDIAN TF / OPS-3</div>
            </div>
            <div className="text-right">
              <div className="inline-block border-2 border-black/80 px-4 py-1 rotate-[-4deg] text-[10px] font-bold tracking-widest text-nightfall-red/80">
                <div>REDACTED</div>
                <div>PORTIONS CLASSIFIED</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 py-1.5 bg-gradient-to-t from-[#f5f1e8] via-[#f5f1e8]/80 to-transparent text-center">
          <span className="text-[9px] font-mono tracking-widest text-black/50">
            — CLASSIFIED PORTIONS REDACTED · RELEASED PER RESPONSIBLE DISCLOSURE FRAMEWORK —
          </span>
        </div>
      </div>
    </div>
  )
}
