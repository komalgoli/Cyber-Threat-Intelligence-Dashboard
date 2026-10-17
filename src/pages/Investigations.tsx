import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileSearch, Filter } from 'lucide-react'
import { articles } from '../data/articles'
import { NewsCard } from '../components/NewsCard'
import { SearchFiltersBar, SearchFilters } from '../components/SearchFiltersBar'

export default function Investigations() {
  const [params] = useSearchParams()
  const [filters, setFilters] = useState<SearchFilters>({
    q: '',
    category: params.get('category') ? params.get('category')!.toUpperCase() : 'ALL',
    year: params.get('filter') === 'latest' ? '2026' : 'ALL',
    confidence: 'ALL',
    status: params.get('status') ? params.get('status')!.toUpperCase() : 'ALL',
    caseId: '',
    threatActor: '',
  })

  const filtered = useMemo(() => {
    return articles.filter(a => {
      if (filters.q) {
        const q = filters.q.toLowerCase()
        const hay = `${a.headline} ${a.subheadline} ${a.excerpt || ''} ${a.tags.join(' ')} ${a.caseId || ''} ${a.id}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (filters.category !== 'ALL' && a.category !== filters.category.toLowerCase()) return false
      if (filters.year !== 'ALL') {
        const y = a.date.split(' ').pop()
        if (y !== filters.year) return false
      }
      if (filters.confidence === '90%+' && a.confidence < 90) return false
      if (filters.confidence === '75%+' && a.confidence < 75) return false
      if (filters.confidence === '60%+' && a.confidence < 60) return false
      if (filters.status !== 'ALL' && !a.status.toUpperCase().startsWith(filters.status)) return false
      if (filters.caseId && !(a.caseId || '').toUpperCase().includes(filters.caseId.toUpperCase())) return false
      if (filters.threatActor) {
        const q = filters.threatActor.toLowerCase()
        const hit = (a.threatActorIds || []).some(t => t.toLowerCase().includes(q)) || a.tags.some(t => t.toLowerCase().includes(q))
        if (!hit) return false
      }
      return true
    })
  }, [filters])

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <FileSearch className="w-6 h-6 text-nightfall-red" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-nightfall-red font-bold">
            Investigation Library · Case Files
          </span>
        </div>
        <h1 className="text-[28px] md:text-[38px] font-bold tracking-tight text-white mb-3 leading-tight">
          Investigations & Nightfall Coverage
        </h1>
        <p className="text-[14px] text-nightfall-textMuted max-w-3xl">
          Reconstructed cases, threat actor dossiers, underground marketplace analyses, intelligence operations, and
          evidence studies. All files are part of the Nightfall Intelligence reporting cycle.
        </p>
      </motion.div>

      <div className="mb-8">
        <SearchFiltersBar filters={filters} setFilters={setFilters} compact />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-nightfall-border">
        <div className="text-[11px] font-mono text-nightfall-textDim flex items-center gap-2">
          <Filter className="w-3.5 h-3.5" />
          <span>SHOWING <span className="text-nightfall-text font-semibold">{filtered.length}</span> OF <span className="text-nightfall-text font-semibold">{articles.length}</span> CASE FILES</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-nightfall-textDim">
          <span className="label-chip border-nightfall-border">{filters.category}</span>
          <span className="label-chip border-nightfall-border">YEAR: {filters.year}</span>
          <span className="label-chip border-nightfall-border">CONF: {filters.confidence}</span>
          <span className="label-chip border-nightfall-border">STATUS: {filters.status}</span>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((a, i) => (
            <NewsCard key={a.id} article={a} priority={i} />
          ))}
        </div>
      ) : (
        <div className="panel p-10 text-center">
          <FileSearch className="w-10 h-10 text-nightfall-textDim mx-auto mb-3 opacity-40" />
          <div className="text-[15px] font-semibold text-nightfall-text mb-2">No investigations match those filters.</div>
          <div className="text-[12px] text-nightfall-textMuted">Try broadening your search terms or adjusting filter criteria.</div>
        </div>
      )}
    </div>
  )
}
