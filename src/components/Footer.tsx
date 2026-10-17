import { Link } from 'react-router-dom'
import { Shield, FileSearch, AlertTriangle, Mail, Archive, Eye, BookOpen, Gavel } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-nightfall-border bg-black/60 mt-20">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 py-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9 flex items-center justify-center border border-nightfall-red bg-nightfall-red/10">
                <div className="w-2 h-2 bg-nightfall-red animate-pulse" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[13px] font-bold tracking-[0.2em] text-white">NIGHTFALL</span>
                <span className="text-[9px] font-mono tracking-[0.35em] text-nightfall-textDim mt-0.5">INTELLIGENCE</span>
              </div>
            </div>
            <p className="text-[12px] leading-relaxed text-nightfall-textMuted mb-4 max-w-sm">
              Investigative journalism and threat intelligence reporting. Covering cybercrime, underground
              networks, and digital forensics. Editorial independence maintained through source protection
              protocols and multi-channel corroboration standards.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-nightfall-green/40 bg-nightfall-green/5 text-[10px] font-mono uppercase tracking-wider text-nightfall-green">
              <Eye className="w-3 h-3" />
              Active Investigation Network
            </div>
          </div>

          <FooterColumn
            title="About"
            icon={<Shield className="w-3.5 h-3.5" />}
            links={[
              { label: 'Organization', path: '/about#org' },
              { label: 'Editorial Team', path: '/about#team' },
              { label: 'Methodology', path: '/about#method' },
              { label: 'Source Reliability', path: '/about#sources' },
            ]}
          />

          <FooterColumn
            title="Investigations"
            icon={<FileSearch className="w-3.5 h-3.5" />}
            links={[
              { label: 'Active Cases', path: '/investigations?status=active' },
              { label: 'Closed Files', path: '/investigations?status=closed' },
              { label: 'Black Meridian', path: '/threat-actors#black-meridian' },
              { label: 'Operation Silent Mirror', path: '/article/nf-2026-0710-sm' },
            ]}
          />

          <FooterColumn
            title="Policies"
            icon={<Gavel className="w-3.5 h-3.5" />}
            links={[
              { label: 'Evidence Policy', path: '/policies/evidence' },
              { label: 'Classification Policy', path: '/policies/classification' },
              { label: 'Methodology', path: '/policies/methodology' },
              { label: 'Terms of Use', path: '/policies/terms' },
            ]}
          />

          <div>
            <div className="flex items-center gap-2 mb-4 text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-textMuted border-b border-nightfall-border pb-2">
              <Archive className="w-3.5 h-3.5 text-nightfall-blue" />
              Archive Access
            </div>
            <div className="space-y-2 text-[11px] font-mono text-nightfall-textDim">
              <div className="flex justify-between">
                <span>Cases Indexed:</span>
                <span className="text-nightfall-text">847</span>
              </div>
              <div className="flex justify-between">
                <span>Evidence Items:</span>
                <span className="text-nightfall-text">12,409</span>
              </div>
              <div className="flex justify-between">
                <span>Threat Actors:</span>
                <span className="text-nightfall-text">231</span>
              </div>
              <div className="flex justify-between">
                <span>Indicators:</span>
                <span className="text-nightfall-text">98,172</span>
              </div>
              <div className="flex justify-between">
                <span>Archive ID:</span>
                <span className="text-nightfall-text">NF-ARCH-2026-007</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-nightfall-border py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-nightfall-textDim">
            <span>© 2026 NIGHTFALL INTELLIGENCE NETWORK</span>
            <span className="hidden md:inline text-nightfall-border">|</span>
            <span>NODE: NF-PUB-03 / SECURE</span>
            <span className="hidden md:inline text-nightfall-border">|</span>
            <span>BUILD: 2026.08.13-v1</span>
            <span className="hidden md:inline text-nightfall-border">|</span>
            <span className="text-[9.5px] text-nightfall-textDim/70 max-w-xs">
              Investigative reconstruction — all identities and case details are journalistically redacted and
              source-protected.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-nightfall-border hover:border-nightfall-borderLight transition-colors text-nightfall-textMuted hover:text-nightfall-text">
              <Mail className="w-3 h-3" />
              Contact
            </Link>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border border-nightfall-green/30 text-nightfall-green/80">
              <AlertTriangle className="w-3 h-3" />
              Source Protected Reporting
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  icon,
  links,
}: {
  title: string
  icon: React.ReactNode
  links: { label: string; path: string }[]
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4 text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-textMuted border-b border-nightfall-border pb-2">
        <span className="text-nightfall-red">{icon}</span>
        {title}
      </div>
      <ul className="space-y-2.5">
        {links.map(link => (
          <li key={link.label}>
            <Link
              to={link.path}
              className="text-[11.5px] text-nightfall-textMuted hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
