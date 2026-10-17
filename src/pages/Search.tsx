import { useMemo, useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search as SearchIcon, FileText, Target, Database, Network, Hash } from 'lucide-react'
import { articles } from '../data/articles'
import { threatActors } from '../data/threatActors'
import { evidence } from '../data/evidence'
import { NewsCard } from '../components/NewsCard'

type ResultType = 'article' | 'actor' | 'evidence'

interface SearchResult {
  type: ResultType
  id: string
  title: string
  subtitle: string
  tags: string[]
  confidence: number
  date?: string
  image?: string
  path: string
}

export default function Search() {
  const [params, setParams] = useSearchParams()
  const initialQ = params.get('q') || ''
  const [q, setQ] = useState(initialQ)

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (q) setParams({ q }, { replace: true })
    }, 350)
    return () => clearTimeout(debounce)
  }, [q, setParams])

  const { results, counts } = useMemo(() => {
    const query = (q || '').trim().toLowerCase()
    const out: SearchResult[] = []
    const c = { article: 0, actor: 0, evidence: 0 }

    if (query) {
      articles.forEach(a => {
        const hay = `${a.headline} ${a.subheadline} ${a.excerpt || ''} ${a.tags.join(' ')} ${a.caseId || ''} ${a.id} ${a.category}`.toLowerCase()
        if (hay.includes(query)) {
          out.push({
            type: 'article',
            id: a.id,
            title: a.headline,
            subtitle: a.subheadline,
            tags: [a.category.toUpperCase(), ...a.tags.slice(0, 2)],
            confidence: a.confidence,
            date: a.date,
            image: a.heroImage,
            path: `/article/${a.id}`,
          })
          c.article++
        }
      })
      threatActors.forEach(t => {
        const hay = `${t.alias} ${t.nameVariants.join(' ')} ${t.description} ${t.knownTactics.join(' ')} ${t.origin}`.toLowerCase()
        if (hay.includes(query)) {
          out.push({
            type: 'actor',
            id: t.id,
            title: t.alias,
            subtitle: t.description,
            tags: ['THREAT ACTOR', t.activity, t.firstObserved],
            confidence: t.confidence,
            path: `/threat-actors#${t.id}`,
          })
          c.actor++
        }
      })
      evidence.forEach(e => {
        const hay = `${e.file} ${e.type} ${e.source} ${e.hash || ''} ${e.description || ''}`.toLowerCase()
        if (hay.includes(query)) {
          out.push({
            type: 'evidence',
            id: e.id,
            title: e.file,
            subtitle: e.description || e.source,
            tags: [e.type, e.status],
            confidence: e.confidence || 0,
            date: e.captured?.split(' ')[0],
            path: `/evidence`,
          })
          c.evidence++
        }
      })
    }
    return { results: out, counts: c }
  }, [q])

  return (
    <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 md:py-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <SearchIcon className="w-6 h-6 text-nightfall-red" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-nightfall-red font-bold">
            Site Search · Local Index
          </span>
        </div>
        <h1 className="text-[28px] md:text-[38px] font-bold tracking-tight text-white mb-6 leading-tight">
          Search the Nightfall Archive
        </h1>

        <div className="panel p-4 md:p-5">
          <div className="flex items-center gap-3 mb-3">
            <SearchIcon className="w-5 h-5 text-nightfall-textDim flex-shrink-0" />
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search articles, cases, threat actors, evidence, indicators, archives, threat intel..."
              className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-nightfall-textDim py-2"
              autoFocus
            />
            {q && (
              <button
                onClick={() => setQ('')}
                className="text-[10px] font-mono uppercase tracking-widest text-nightfall-textDim hover:text-nightfall-text px-3 py-1 border border-nightfall-border"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-nightfall-textDim">
            <span>SEARCH ACROSS:</span>
            <span className="label-chip border-nightfall-border">{counts.article} ARTICLES</span>
            <span className="label-chip border-nightfall-border">{counts.actor} ACTORS</span>
            <span className="label-chip border-nightfall-border">{counts.evidence} EVIDENCE</span>
            <span className="ml-auto text-nightfall-textDim opacity-70">Local indexed search · no network calls</span>
          </div>
        </div>
      </motion.div>

      {q.trim() === '' ? (
        <div className="panel p-10 md:p-14 text-center max-w-3xl mx-auto">
          <SearchIcon className="w-12 h-12 text-nightfall-textDim mx-auto mb-5 opacity-30" />
          <h2 className="text-[20px] md:text-[24px] font-bold text-white mb-3">Enter a search term above to begin</h2>
          <p className="text-[13px] text-nightfall-textMuted leading-relaxed mb-6">
            Nightfall Intelligence search operates against the local indexed dataset. Try searching for:
            Black Meridian, Null Veil, Cinder-9, wallet cluster, CCTV, blockchain, ransomware, Red Room Files,
            Silent Mirror, Ghost Orchid, Sable Fox, Echo Vector…
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Null Veil', 'Black Meridian', 'Cinder-9', 'blockchain', 'ransomware', 'CCTV'].map(t => (
              <button
                key={t}
                onClick={() => setQ(t)}
                className="label-chip border-nightfall-border hover:border-nightfall-red hover:text-nightfall-red transition-colors cursor-pointer"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 pb-3 border-b border-nightfall-border flex flex-wrap items-center justify-between gap-3">
            <div className="text-[12px] font-mono text-nightfall-textDim">
              {results.length} {results.length === 1 ? 'RESULT' : 'RESULTS'} FOR: <span className="text-nightfall-text font-semibold">“{q}”</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-nightfall-textDim">
              <span className="label-chip border-nightfall-red/40 text-nightfall-red bg-nightfall-red/5">{counts.article} ARTICLES</span>
              <span className="label-chip border-nightfall-amber/40 text-nightfall-amber bg-nightfall-amber/5">{counts.actor} ACTORS</span>
              <span className="label-chip border-nightfall-blue/40 text-nightfall-blue bg-nightfall-blue/5">{counts.evidence} EVIDENCE</span>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="space-y-4">
              {results.slice(0, 6).map((r, i) => (
                <SearchResultRow key={r.id + r.type} r={r} i={i} />
              ))}

              {results.length > 6 && results.filter(r => r.type === 'article').length > 2 && (
                <div className="mt-10">
                  <h3 className="text-[14px] font-semibold text-nightfall-text mb-5 pb-2 border-b border-nightfall-border flex items-center gap-2">
                    <FileText className="w-4 h-4 text-nightfall-red" />
                    Full Article Results as Cards
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {results.filter(r => r.type === 'article').map((r, i) => {
                      const art = articles.find(a => a.id === r.id)
                      return art ? <NewsCard key={art.id} article={art} priority={i} /> : null
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="panel p-10 text-center">
              <SearchIcon className="w-10 h-10 text-nightfall-textDim mx-auto mb-3 opacity-40" />
              <div className="text-[15px] font-semibold text-nightfall-text mb-2">No results for “{q}”</div>
              <div className="text-[12px] text-nightfall-textMuted">Try broader terms. Search is case-insensitive over titles, metadata, tags, and descriptions.</div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function SearchResultRow({ r, i }: { r: SearchResult; i: number }) {
  const Icon = r.type === 'article' ? FileText : r.type === 'actor' ? Target : r.type === 'evidence' ? Database : Network
  const accent = r.type === 'article' ? 'text-nightfall-red border-nightfall-red/40' : r.type === 'actor' ? 'text-nightfall-amber border-nightfall-amber/40' : 'text-nightfall-blue border-nightfall-blue/40'

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.03 }}
    >
      <Link to={r.path} className="card p-4 md:p-5 grid md:grid-cols-[60px_1fr_160px] gap-4 hover:border-nightfall-borderLight transition-colors block">
        <div className={`w-[60px] h-[60px] border ${accent} bg-current/5 flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${accent.split(' ')[0]}`} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className={`label-chip ${accent}`}>{r.type.toUpperCase()}</span>
            {r.tags.slice(0, 3).map(t => (
              <span key={t} className="label-chip border-nightfall-border text-nightfall-textDim">{t}</span>
            ))}
          </div>
          <h3 className="text-[15px] font-semibold text-nightfall-text leading-snug mb-1.5 group-hover:text-nightfall-red break-words">
            {r.title}
          </h3>
          <p className="text-[12px] text-nightfall-textMuted leading-snug line-clamp-2">{r.subtitle}</p>
        </div>
        <div className="text-right flex flex-col items-end justify-center gap-1">
          {r.confidence > 0 && (
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-0.5">CONFIDENCE</div>
              <div className="text-[12px] font-bold font-mono text-nightfall-green">{r.confidence}%</div>
            </div>
          )}
          {r.date && (
            <div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim mb-0.5">DATE</div>
              <div className="text-[11px] font-mono text-nightfall-text">{r.date}</div>
            </div>
          )}
          {r.id && (
            <div className="flex items-center gap-1 text-[9.5px] font-mono text-nightfall-textDim mt-1">
              <Hash className="w-3 h-3" />{r.id}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
