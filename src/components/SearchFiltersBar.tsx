import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export interface SearchFilters {
  q: string
  category: string
  year: string
  confidence: string
  status: string
  caseId: string
  threatActor: string
}

interface Props {
  filters: SearchFilters
  setFilters: (f: SearchFilters) => void
  showPanel?: boolean
  compact?: boolean
}

const categories = ['ALL', 'INVESTIGATIONS', 'CYBERCRIME', 'THREAT ACTORS', 'LEAKS', 'INTELLIGENCE', 'EVIDENCE']
const years = ['ALL', '2026', '2025', '2024', '2023']
const confidences = ['ALL', '90%+', '75%+', '60%+']
const statuses = ['ALL', 'ACTIVE', 'CLOSED', 'ARCHIVED', 'PENDING']

export function SearchFiltersBar({ filters, setFilters, showPanel = false, compact = false }: Props) {
  const [open, setOpen] = useState(showPanel)

  const update = (key: keyof SearchFilters, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  return (
    <div className="panel p-0 overflow-hidden">
      <div className="px-4 py-3 border-b border-nightfall-border flex items-center gap-2">
        <Search className="w-4 h-4 text-nightfall-textDim flex-shrink-0" />
        <input
          type="text"
          value={filters.q}
          onChange={e => update('q', e.target.value)}
          placeholder="Search across articles, cases, threat actors, evidence, indicators, archives..."
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-nightfall-textDim"
        />
        {filters.q && (
          <button
            onClick={() => update('q', '')}
            className="p-1 text-nightfall-textDim hover:text-nightfall-text"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        {!compact && (
          <button
            onClick={() => setOpen(v => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-nightfall-border hover:border-nightfall-borderLight text-[10px] font-mono uppercase tracking-wider"
          >
            <Filter className="w-3.5 h-3.5" />
            Filters {open ? '▲' : '▼'}
          </button>
        )}
      </div>

      <AnimatePresence>
        {(open || compact) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-nightfall-border/50 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <FilterSelect label="CATEGORY" options={categories} value={filters.category} onChange={v => update('category', v)} />
              <FilterSelect label="YEAR" options={years} value={filters.year} onChange={v => update('year', v)} />
              <FilterSelect label="CONFIDENCE" options={confidences} value={filters.confidence} onChange={v => update('confidence', v)} />
              <FilterSelect label="STATUS" options={statuses} value={filters.status} onChange={v => update('status', v)} />
              <div>
                <label className="block text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1">CASE ID</label>
                <input
                  type="text"
                  value={filters.caseId}
                  onChange={e => update('caseId', e.target.value)}
                  placeholder="e.g. NF-0812"
                  className="input text-[11px] py-1"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1">THREAT ACTOR</label>
                <input
                  type="text"
                  value={filters.threatActor}
                  onChange={e => update('threatActor', e.target.value)}
                  placeholder="e.g. Null Veil"
                  className="input text-[11px] py-1"
                />
              </div>
            </div>
            <div className="px-4 py-2 border-t border-nightfall-border/50 flex items-center justify-between bg-black/20">
              <span className="text-[10px] font-mono text-nightfall-textDim">
                Search operates against local indexed dataset — no remote calls.
              </span>
              <button
                onClick={() => setFilters({ q: '', category: 'ALL', year: 'ALL', confidence: 'ALL', status: 'ALL', caseId: '', threatActor: '' })}
                className="text-[10px] font-mono uppercase tracking-widest text-nightfall-amber hover:text-nightfall-amber/80"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterSelect({
  label, options, value, onChange,
}: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-nightfall-bg border border-nightfall-border px-2 py-1.5 text-[11px] font-mono text-nightfall-text focus:outline-none focus:border-nightfall-red"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
