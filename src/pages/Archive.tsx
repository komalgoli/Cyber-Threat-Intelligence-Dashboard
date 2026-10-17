import { useState } from 'react'
import { motion } from 'framer-motion'
import { Archive as ArchiveLucide, ChevronLeft, ChevronRight, FileSearch } from 'lucide-react'
import { articles } from '../data/articles'
import { Link } from 'react-router-dom'
import { StatusIndicator } from '../components/StatusIndicator'
import { ClassificationBadge } from '../components/ClassificationBadge'

export default function ArchivePage() {
  const perPage = 10
  const [page, setPage] = useState(1)
  const start = (page - 1) * perPage
  const pageItems = articles.slice(start, start + perPage)
  const totalPages = Math.ceil(articles.length / perPage)

  const years = ['2026', '2025', '2024', '2023']

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 md:py-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <ArchiveLucide className="w-6 h-6 text-nightfall-textDim" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-nightfall-textDim font-bold">
            Case Archive · Historical Reconstructions
          </span>
        </div>
        <h1 className="text-[28px] md:text-[38px] font-bold tracking-tight text-white mb-3 leading-tight">
          Nightfall Intelligence Archive
        </h1>
        <p className="text-[14px] text-nightfall-textMuted max-w-3xl">
          Complete catalog of Nightfall Intelligence reconstructions, sorted newest-to-oldest. Accession
          numbers, declassification markers, and file metadata preserved per archival standards.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {years.map((y, i) => (
          <Link
            key={y}
            to={'/investigations?year=' + y}
            className="group border border-nightfall-border bg-nightfall-card/40 p-4 md:p-5 hover:border-nightfall-borderLight transition-colors"
          >
            <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-1">ARCHIVE YEAR · INDEX</div>
            <div className="text-[26px] font-bold font-mono text-nightfall-text group-hover:text-nightfall-red transition-colors">{y}</div>
            <div className="text-[10px] font-mono text-nightfall-textDim mt-0.5">
              {articles.filter(a => a.date.endsWith(y)).length} FILES · ACCESSIONED
            </div>
          </Link>
        ))}
      </div>

      <div className="panel p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="bg-black/40 text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim">
                <th className="text-left px-4 md:px-6 py-3 font-semibold">ACCESSION #</th>
                <th className="text-left px-4 md:px-6 py-3 font-semibold">FILE / HEADLINE</th>
                <th className="text-left px-4 md:px-6 py-3 font-semibold hidden md:table-cell">CATEGORY</th>
                <th className="text-left px-4 md:px-6 py-3 font-semibold hidden lg:table-cell">DATE</th>
                <th className="text-left px-4 md:px-6 py-3 font-semibold hidden sm:table-cell">CLASS / STATUS</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((a, i) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t border-nightfall-border/60 hover:bg-nightfall-card/40 transition-colors"
                >
                  <td className="px-4 md:px-6 py-4 align-top">
                    <div className="font-mono text-[10px] text-nightfall-red font-semibold">NF-2026-{String(start + i + 1).padStart(4, '0')}</div>
                    <div className="text-[9px] font-mono text-nightfall-textDim mt-0.5">{a.caseId || '—'}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 align-top">
                    <Link to={'/article/' + a.id} className="group">
                      <div className="text-[13px] font-semibold text-nightfall-text group-hover:text-nightfall-red transition-colors leading-snug mb-1">
                        {a.headline}
                      </div>
                      <div className="text-[11px] text-nightfall-textMuted line-clamp-1">{a.subheadline}</div>
                      <div className="text-[10px] font-mono text-nightfall-textDim mt-1 sm:hidden">{a.date} · {a.category.toUpperCase()}</div>
                    </Link>
                  </td>
                  <td className="px-4 md:px-6 py-4 align-top hidden md:table-cell">
                    <span className="label-chip border-nightfall-border text-nightfall-amber/80">{a.category.toUpperCase()}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 align-top hidden lg:table-cell font-mono text-[11px] text-nightfall-textDim">{a.date}</td>
                  <td className="px-4 md:px-6 py-4 align-top hidden sm:table-cell">
                    <div className="flex flex-col gap-2">
                      <ClassificationBadge classification={a.classification} compact />
                      <StatusIndicator status={a.status} size="sm" />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 px-4 md:px-6 py-4 border-t border-nightfall-border/60 bg-black/20">
          <div className="text-[10.5px] font-mono text-nightfall-textDim flex items-center gap-2">
            <FileSearch className="w-3.5 h-3.5" />
            PAGE {page} OF {totalPages} · ARCHIVE ID: NF-ARCH-2026-007 · TOTAL {articles.length} FILES
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 border border-nightfall-border hover:border-nightfall-borderLight disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`min-w-[32px] h-[32px] px-2 text-[11px] font-mono border ${page === n ? 'border-nightfall-red bg-nightfall-red/10 text-nightfall-red' : 'border-nightfall-border text-nightfall-textDim hover:border-nightfall-borderLight hover:text-nightfall-text'}`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 border border-nightfall-border hover:border-nightfall-borderLight disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
