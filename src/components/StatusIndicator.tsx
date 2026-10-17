import { motion } from 'framer-motion'

interface StatusIndicatorProps {
  status: string
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function StatusIndicator({ status, showLabel = true, size = 'md' }: StatusIndicatorProps) {
  const statusMap: Record<string, { color: string; label: string }> = {
    'CLOSED': { color: '#3c8a54', label: 'CLOSED' },
    'ACTIVE': { color: '#b4343a', label: 'ACTIVE' },
    'ARCHIVED': { color: '#5f6167', label: 'ARCHIVED' },
    'PENDING REVIEW': { color: '#c98a2a', label: 'PENDING' },
    'ANALYZED': { color: '#3c8a54', label: 'ANALYZED' },
    'CORRELATED': { color: '#2b6cb0', label: 'CORRELATED' },
    'PARTIALLY RECOVERED': { color: '#c98a2a', label: 'PARTIAL' },
    'PENDING ANALYSIS': { color: '#b4343a', label: 'PENDING' },
    'SEQUESTERED': { color: '#8b8d93', label: 'SEQUESTERED' },
  }

  const s = statusMap[status] || { color: '#5f6167', label: 'UNKNOWN' }
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'

  return (
    <div className="inline-flex items-center gap-1.5">
      <motion.span
        className={`${dotSize} rounded-full`}
        style={{ backgroundColor: s.color }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      {showLabel && (
        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: s.color }}>
          {s.label}
        </span>
      )}
    </div>
  )
}
