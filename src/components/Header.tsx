import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Radio, Activity, ChevronDown, Printer, Bookmark } from 'lucide-react'

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'LATEST', path: '/investigations?filter=latest' },
  { label: 'INVESTIGATIONS', path: '/investigations' },
  { label: 'CYBERCRIME', path: '/investigations?category=cybercrime' },
  { label: 'THREAT ACTORS', path: '/threat-actors' },
  { label: 'LEAKS', path: '/investigations?category=leaks' },
  { label: 'INTELLIGENCE', path: '/intelligence' },
  { label: 'EVIDENCE', path: '/evidence' },
  { label: 'ARCHIVE', path: '/archive' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-GB', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
  }).toUpperCase()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-nightfall-bg/92 backdrop-blur-[2px] border-b border-nightfall-border relative">
      <div className="tape tape-corner-tl" />
      <div className="absolute top-[10px] right-[22px] z-[2]">
        <span className="stamp stamp-red rot-p1" style={{ fontSize: 8.5, padding: '2px 8px 3px' }}>
          NIGHTFALL · PRESS
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="relative flex items-center justify-between gap-4 px-4 lg:px-8 pt-3 pb-1">
          <div className="flex items-center gap-2 text-[9px] font-mono text-nightfall-textDim/80 tracking-widest">
            <span className="animate-flicker">■ SIGNAL LOCK</span>
            <span className="opacity-50">/</span>
            <span>{dateStr}</span>
            <span className="opacity-50">/</span>
            <span>SHIFT B</span>
            <span className="hidden sm:inline opacity-50">/</span>
            <span className="hidden sm:inline">REV 04.17</span>
          </div>
          <div className="flex items-center gap-3 text-[9px] font-mono text-nightfall-textDim/70 tracking-widest">
            <span className="hidden md:inline">FILE: NF-MAIN.R12</span>
            <span className="opacity-50 hidden sm:inline">|</span>
            <span>OPERATIONAL · LIVE</span>
            <span className="font-hand text-nightfall-amber/80 text-[15px] ml-2 -rotate-3 translate-y-[1px]">
              —source protected—
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-4 lg:px-8 py-3 border-t border-nightfall-border/60">
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="relative w-9 h-9 flex items-center justify-center border border-nightfall-red bg-nightfall-red/10 rot-n1 shadow-[inset_0_0_10px_rgba(180,52,58,0.2)]">
              <div className="w-2 h-2 bg-nightfall-red animate-pulse-slower" />
              <div className="absolute inset-0 border border-nightfall-red/25 translate-x-[1px] translate-y-[1px]" />
              <div className="absolute -inset-[1px] border border-nightfall-borderLight/30 -translate-x-[1px] -translate-y-[1px]" />
            </div>
            <div className="flex flex-col leading-none relative">
              <span className="text-[13px] font-extrabold tracking-[0.22em] text-nightfall-text group-hover:text-white transition-colors glitch-text" data-text="NIGHTFALL">
                NIGHTFALL
              </span>
              <span className="text-[9px] font-mono tracking-[0.38em] text-nightfall-textDim mt-[6px]">
                INT<span className="text-nightfall-red/70">·</span>E<span className="text-nightfall-amber/60">·</span>LLIGENCE
              </span>
            </div>
            <span className="font-hand text-nightfall-red/70 text-[16px] ml-3 translate-y-[-4px] -rotate-6 hidden sm:inline">
              classif. ⚑
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-0 relative">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-px h-7 bg-gradient-to-b from-transparent via-nightfall-border to-transparent" />
            {navItems.map((item, idx) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-[14px] py-[10px] text-[10.5px] font-semibold tracking-[0.13em] uppercase transition-all ${
                    isActive
                      ? 'text-white bg-nightfall-panel/60 shadow-[inset_0_-2px_0_rgba(180,52,58,0.9)]'
                      : 'text-nightfall-textMuted hover:text-nightfall-text hover:bg-nightfall-card/40'
                  } ${idx % 4 === 1 ? 'skew-n1' : idx % 4 === 3 ? 'skew-p1' : ''}`
                }
                style={{
                  borderLeft: idx === 0 ? 'none' : '1px solid rgba(39, 42, 47, 0.6)',
                  borderRadius: idx === 0 ? '2px 0 0 1px' : idx === navItems.length - 1 ? '0 1px 2px 0' : '0',
                }}
              >
                {({ isActive }) => (
                  <span className="relative inline-flex items-center gap-1.5">
                    {item.label}
                    {idx === 2 && (
                      <span className="inline-flex items-center justify-center text-[8px] font-mono bg-nightfall-red/85 text-white px-[5px] py-[1px] rot-p1 translate-y-[-1px] shadow-[1px_1px_0_rgba(0,0,0,0.4)]">
                        14
                      </span>
                    )}
                    {idx === 5 && (
                      <span className="inline-flex items-center justify-center text-[8px] font-mono border border-nightfall-amber/50 text-nightfall-amber px-[4px] py-[0.5px] rot-n1 translate-y-[-1px]">
                        NEW
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rotate-45 bg-nightfall-red shadow-[0_0_6px_rgba(180,52,58,0.8)]"
                      />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-3 text-[10px] font-mono text-nightfall-textDim border-l border-nightfall-border/60 pl-3 pr-1">
              <div className="flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-nightfall-red animate-pulse-slow" />
                <span>LIVE FEED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-nightfall-green animate-pulse-slower" />
                <span className="animate-flicker">NOMINAL</span>
              </div>
              <div className="w-px h-4 bg-nightfall-border/70 mx-1" />
              <button className="p-1.5 border border-nightfall-border/80 hover:border-nightfall-borderLight hover:bg-nightfall-card/60 transition-colors" title="Print view">
                <Printer className="w-3.5 h-3.5 text-nightfall-textDim" />
              </button>
              <button className="p-1.5 border border-nightfall-border/80 hover:border-nightfall-borderLight hover:bg-nightfall-card/60 transition-colors" title="Bookmark">
                <Bookmark className="w-3.5 h-3.5 text-nightfall-textDim" />
              </button>
            </div>

            <button
              onClick={() => setSearchOpen(v => !v)}
              className="p-2 border border-nightfall-border hover:border-nightfall-borderLight hover:bg-nightfall-card transition-colors border-uneven relative"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-nightfall-textMuted" />
              <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-nightfall-amber rounded-full shadow-[0_0_4px_rgba(201,138,42,0.7)] animate-blink-lazy" />
            </button>

            <button
              onClick={() => setMobileOpen(v => !v)}
              className="xl:hidden p-2 border border-nightfall-border hover:border-nightfall-borderLight transition-colors border-uneven-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.form
              onSubmit={handleSearch}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-nightfall-border bg-nightfall-panel/95 relative"
            >
              <div className="tape tape-side-r" />
              <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-4 flex items-center gap-3 relative">
                <Search className="w-5 h-5 text-nightfall-textMuted flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search articles, cases, threat actors, evidence, IOCs, [CLOSED/ARCHIVED/REDACTED]..."
                  className="flex-1 bg-transparent border-b border-nightfall-border focus:border-nightfall-red outline-none py-2 text-sm placeholder:text-nightfall-textDim font-type tracking-wide"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-nightfall-border hover:border-nightfall-red hover:text-nightfall-red transition-colors border-uneven-3"
                >
                  Execute
                </button>
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-nightfall-textDim ml-1">
                  <span className="label-chip border-nightfall-border/70 rot-n1">CASE</span>
                  <span className="label-chip border-nightfall-border/70 rot-p1">THREAT</span>
                  <span className="label-chip border-nightfall-border/70">IOC</span>
                </div>
                <span className="font-hand text-nightfall-amber/70 text-[14px] absolute right-[28%] -bottom-[2px] rotate-2 hidden md:inline">
                  ← try "wallet" or "cctv"
                </span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden overflow-hidden border-t border-nightfall-border bg-nightfall-panel/96"
            >
              <div className="flex flex-col">
                {navItems.map((item, i) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-6 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase border-b border-nightfall-border/50 flex items-center justify-between relative ${
                        isActive ? 'text-white bg-nightfall-card/80' : 'text-nightfall-textMuted'
                      } ${i % 3 === 0 ? 'pl-8' : i % 3 === 2 ? 'pl-4' : ''}`
                    }
                  >
                    <span className="relative">
                      {item.label}
                      {i === 2 && (
                        <span className="ml-2 text-[8px] font-mono bg-nightfall-red/85 text-white px-[5px] py-[1px] rot-p1">
                          14
                        </span>
                      )}
                    </span>
                    <ChevronDown className={`w-3 h-3 -rotate-90 ${i % 2 ? 'translate-x-[2px]' : ''}`} />
                  </NavLink>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-[-6px] left-[200px] h-[6px] w-[120px] bg-nightfall-bg border-l border-r border-b border-nightfall-border/80 -z-0" />
    </header>
  )
}
