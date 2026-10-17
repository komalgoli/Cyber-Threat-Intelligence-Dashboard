interface ConfidenceBarProps {
  value: number
  label?: string
  size?: 'sm' | 'md'
}

export function ConfidenceBar({ value, label = 'CONFIDENCE', size = 'md' }: ConfidenceBarProps) {
  const height = size === 'sm' ? 'h-1' : 'h-1.5'
  const color = value >= 85 ? 'bg-nightfall-green' : value >= 70 ? 'bg-nightfall-amber' : 'bg-nightfall-red'

  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[9px] font-mono uppercase tracking-widest text-nightfall-textDim">{label}</span>
        <span className="text-[11px] font-mono font-semibold text-nightfall-text">{value}%</span>
      </div>
      <div className={`w-full bg-nightfall-border/50 ${height} rounded-sm overflow-hidden`}>
        <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
