interface ClassificationBadgeProps {
  classification: string
  compact?: boolean
}

export function ClassificationBadge({ classification, compact }: ClassificationBadgeProps) {
  const styles: Record<string, string> = {
    'SENSITIVE · SOURCE ON FILE': 'border-nightfall-amber/50 bg-nightfall-amber/10 text-nightfall-amber',
    'UNCLASSIFIED · REPORTING': 'border-nightfall-green/50 bg-nightfall-green/10 text-nightfall-green',
    'EVIDENCE · CHAIN OF CUSTODY': 'border-nightfall-blue/50 bg-nightfall-blue/10 text-nightfall-blue',
  }

  const cls = styles[classification] || 'border-nightfall-border bg-nightfall-card text-nightfall-textMuted'

  if (compact) {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border ${cls}`}>
        {classification}
      </span>
    )
  }

  return (
    <div className={`inline-flex items-center gap-2 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest border ${cls}`}>
      <span className="w-1 h-3 bg-current opacity-60" />
      {classification}
    </div>
  )
}
