import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, AlertTriangle, Pin, Star } from 'lucide-react'
import type { Article } from '../data/articles'
import { ClassificationBadge } from './ClassificationBadge'
import { StatusIndicator } from './StatusIndicator'
import { authors } from '../data/authors'

export function NewsCard({ article, featured = false, priority = 0 }: { article: Article; featured?: boolean; priority?: number }) {
  const author = authors.find(a => a.id === article.authorId)

  const rotations = [-1.2, 0.6, -0.5, 0.9, -0.8, 1.4]
  const rot = rotations[priority % rotations.length]

  const unevenVariants = ['border-uneven', 'border-uneven-2', 'border-uneven-3']
  const borderVariant = unevenVariants[priority % 3]

  const marginTopPush = [0, 4, -2, 6, -1, 3]
  const mtPush = marginTopPush[priority % 6]

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: priority * 0.05 }}
        className="group relative overflow-hidden border border-nightfall-border shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="tape tape-corner-tl" />
        <div className="tape tape-corner-tr" />
        <div className="tape tape-corner-bl" />
        <div className="dogear" />
        <div className="coffeestain" style={{ top: -18, left: 40 }} />
        <div className="absolute top-[14px] right-[70px] z-[3] hidden md:block">
          <span className="stamp stamp-red rot-p2 shadow-[2px_2px_6px_rgba(0,0,0,0.4)]">
            CLASSIFIED · FCIB EYES ONLY
          </span>
        </div>
        <div className="absolute bottom-[22px] left-[46%] z-[3] hidden lg:block">
          <span className="stamp stamp-amber rot-n2" style={{ fontSize: 9, padding: '3px 10px' }}>
            SOURCE: M-17 · VETTED
          </span>
        </div>
        <div className="absolute top-[30%] right-[-32px] z-[3] hidden xl:block rotate-90 origin-center">
          <span className="stamp stamp-black rot-n1" style={{ fontSize: 9, padding: '3px 12px' }}>
            VERIFIED SOURCE · FCIB COORD
          </span>
        </div>

        <Link to={`/article/${article.id}`} className="block relative">
          <div className="grid lg:grid-cols-5 relative">
            <div className="lg:col-span-3 relative h-[340px] md:h-[420px] overflow-hidden">
              <img
                src={article.heroImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.035] sepia-[0.12] hue-rotate-[-3deg] contrast-[1.04] saturate-[0.92]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/38 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/40" />
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-overlay"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 5px)',
                }}
              />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <ClassificationBadge classification={article.classification} />
                  <StatusIndicator status={article.status} />
                  {article.caseId && (
                    <span className="label-chip border-nightfall-border text-nightfall-textDim bg-black/30 backdrop-blur-sm rot-n1">
                      CASE {article.caseId}
                    </span>
                  )}
                  <span className="label-chip border-nightfall-amber/30 text-nightfall-amber/90 bg-nightfall-amber/5 rot-p1">
                    ⚑ FLAG: SOURCE AT RISK
                  </span>
                </div>
                <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-nightfall-amber/90 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3" />
                  BREAKING INVESTIGATION · RESTRICTED CASE FILE — NIGHTFALL INTEL
                </div>
                <div className="font-hand text-nightfall-green/70 text-[16px] translate-y-[2px] ml-1 -rotate-3 inline-flex items-center gap-1 md:hidden">
                  <Pin className="w-3 h-3 inline" /> pinned — lead
                </div>
              </div>

              <div className="absolute top-3 left-4 z-[2] flex items-center gap-1.5 font-hand text-nightfall-text/85 text-[14px] -rotate-4">
                <span>[1 of 3 docs]</span>
              </div>
              <div className="absolute top-3 right-4 z-[2] font-hand text-nightfall-red/80 text-[13px] rotate-2">
                EXCERPT ⇢ PAGE 7
              </div>
            </div>

            <div className="lg:col-span-2 relative p-6 md:p-8 lg:p-10 bg-nightfall-panel flex flex-col justify-between min-h-[320px]">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.35]"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 10%, rgba(180,52,58,0.06), transparent 55%), radial-gradient(ellipse at 70% 95%, rgba(201,138,42,0.05), transparent 55%)',
                }}
              />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-nightfall-red mb-3 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  {article.category.toUpperCase()}
                  <span className="ml-auto font-hand text-nightfall-amber/70 text-[14px] -rotate-3 tracking-normal normal-case">
                    ⇧ must read
                  </span>
                </div>
                <h2 className="text-[21px] md:text-[27px] lg:text-[25px] font-bold leading-[1.16] tracking-tight text-white mb-4 group-hover:text-nightfall-red transition-colors relative">
                  <span className="relative inline">
                    {article.headline}
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-nightfall-red via-nightfall-red/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </h2>
                <p className="text-[13.5px] leading-[1.72] text-nightfall-textMuted mb-5 relative">
                  {article.subheadline}
                  <span className="inline-block ml-2 w-1 h-1 rounded-full bg-nightfall-amber/60 translate-y-[-2px]" />
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-nightfall-textDim/90 mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-nightfall-border/70 rot-n1">
                    <Star className="w-2.5 h-2.5 text-nightfall-amber" /> EDITOR'S PICK
                  </span>
                  <span className="font-hand text-nightfall-textDim text-[12px] rotate-1">vetted 3 ways</span>
                </div>
              </div>

              <div className="pt-4 border-t border-nightfall-border/70 flex items-center justify-between flex-wrap gap-2 relative">
                <div className="absolute -top-[9px] left-6 text-[9px] font-mono text-nightfall-textDim/70 bg-nightfall-panel px-1.5 rot-p1">
                  — BYLINE —
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-nightfall-red/20 to-nightfall-border flex items-center justify-center border border-nightfall-border relative"
                    style={{ borderRadius: '48% 52% 54% 46% / 50% 47% 53% 50%' }}
                  >
                    <span className="text-[10px] font-bold text-nightfall-text">
                      {author?.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    <span className="absolute -right-[3px] -bottom-[2px] w-[7px] h-[7px] rounded-full bg-nightfall-green shadow-[0_0_0_1.5px_rgba(18,19,21,1)]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-nightfall-text relative inline-flex items-center gap-1">
                      {author?.name}
                      <span className="font-hand text-nightfall-red/60 text-[12px] -rotate-3 translate-y-[-2px]">
                        {author?.handle}
                      </span>
                    </div>
                    <div className="text-[10px] text-nightfall-textDim font-mono">
                      {article.date} · {article.readTime} MIN READ · <span className="text-nightfall-amber/80">{article.updated} UPDATED</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-nightfall-amber flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Investigation
                  <motion.span
                    aria-hidden
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.1 }}
                    className="inline-block"
                  >
                    →
                  </motion.span>
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/65 border border-nightfall-border/50 text-[8.5px] font-mono uppercase tracking-widest text-nightfall-textDim rot-n1">
            {article.heroCaption}
          </div>
          <div className="absolute bottom-3 left-3 text-[9px] font-mono text-nightfall-textDim/80 font-type tracking-[0.14em] rotate-[0.4deg]">
            // IMG-{article.id.toUpperCase()}-01 · RAW CAPTURE · ARCHIVE
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: priority * 0.03 }}
      className={`card overflow-hidden group ${borderVariant}`}
      whileHover={{ y: -3 + (priority % 2 === 0 ? 0 : -1), rotate: rot * 0.15 }}
      style={{
        transform: `rotate(${rot}deg) translateY(${mtPush}px)`,
        boxShadow: priority % 3 === 0
          ? '3px 5px 12px -4px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.02)'
          : priority % 3 === 1
            ? '-1px 6px 14px -5px rgba(0,0,0,0.6)'
            : '2px 4px 11px -3px rgba(0,0,0,0.5)',
      }}
    >
      <Link to={`/article/${article.id}`} className="block relative">
        <div className={`tape ${priority % 4 === 0 ? 'tape-corner-tr' : priority % 4 === 1 ? 'tape-corner-tl' : priority % 4 === 2 ? 'tape-side-r' : 'tape-corner-br'}`} />
        {priority % 3 === 0 && <div className="dogear" />}

        <div className="relative h-[180px] overflow-hidden border-b border-nightfall-border">
          <img
            src={article.heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.04] grayscale-[0.1] contrast-[1.05] saturate-[0.9]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/18 to-transparent" />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 3px)',
            }}
          />
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
            <ClassificationBadge classification={article.classification} compact />
            {priority % 2 === 0 && (
              <span className="label-chip border-nightfall-amber/35 text-nightfall-amber/85 bg-nightfall-amber/5 rot-n1 text-[8px]">
                ⚑ HOT
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 font-hand text-nightfall-text/75 text-[12px] rotate-2 hidden sm:block">
            {priority % 5 === 0 ? '‡ long read' : priority % 5 === 1 ? '¶ skip to §3' : priority % 5 === 2 ? '✎ needs check' : priority % 5 === 3 ? '↗ ref\'d in 2 cases' : '★ staff pick'}
          </div>
          <div className="absolute bottom-2 right-2 text-[7.5px] font-mono uppercase tracking-widest text-nightfall-textDim/90 bg-black/55 px-1.5 py-0.5 max-w-[90%] truncate rot-p1">
            {article.heroCaption}
          </div>
          <div className="absolute bottom-2 left-2 text-[8px] font-mono text-nightfall-textDim/70">
            #{(priority + 1).toString().padStart(3, '0')}
          </div>
        </div>

        <div className="p-4 md:p-5 flex flex-col gap-3 min-h-[200px] relative">
          <div className="absolute top-0 left-0 w-full h-[2px] opacity-60"
               style={{
                 background: `linear-gradient(90deg, transparent 0%, ${priority % 2 === 0 ? 'rgba(180,52,58,0.35)' : 'rgba(201,138,42,0.28)'} 50%, transparent 100%)`,
               }}
          />
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-red font-semibold relative inline-flex items-center gap-1">
              {article.category.toUpperCase()}
              {priority % 4 === 1 && (
                <span className="inline-block w-1 h-1 rounded-full bg-nightfall-red animate-blink-lazy" />
              )}
            </span>
            <StatusIndicator status={article.status} size="sm" />
          </div>
          <h3 className="text-[13.5px] md:text-[15px] font-bold leading-[1.35] tracking-[-0.01em] text-white group-hover:text-nightfall-red transition-colors line-clamp-3 relative">
            {article.headline}
          </h3>
          <p className="text-[11.5px] leading-[1.7] text-nightfall-textMuted line-clamp-3 flex-1">
            {article.subheadline}
            {priority % 3 === 2 && (
              <span className="font-hand text-nightfall-amber/70 text-[12px] block mt-1 -rotate-1 translate-x-1">
                — see addendum pg.2
              </span>
            )}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-nightfall-border/60 relative">
            <div className="absolute -top-[8px] left-3 text-[8px] font-mono text-nightfall-textDim/70 bg-nightfall-card px-1 rot-p1">
              META
            </div>
            <span className="text-[10px] font-mono text-nightfall-textDim">
              {article.date}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-nightfall-textDim">
              <span className={`px-1.5 py-0.5 border border-nightfall-border/60 ${priority % 2 ? 'rot-n1' : 'rot-p1'}`}>
                {article.readTime}m
              </span>
              {priority % 3 === 0 && (
                <span className="text-nightfall-green/70 text-[9px]">✓ {article.confidence}%</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
