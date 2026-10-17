import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

export function WalletFlowVisualization() {
  const [active, setActive] = useState(0)
  const nodes = [
    { label: 'Wallet A', sub: 'Initial Deposit', color: 'border-nightfall-blue/60 bg-nightfall-blue/10 text-nightfall-blue', amount: '2.47 XMR', tag: 'DEPOSIT' },
    { label: 'Mixer Cluster', sub: '2-hop tumble (3 intermediaries)', color: 'border-nightfall-textDim/60 bg-nightfall-card text-nightfall-text', amount: 'Mixed', tag: 'OBFUSCATED' },
    { label: 'Wallet C', sub: 'Outbound staging', color: 'border-nightfall-amber/60 bg-nightfall-amber/10 text-nightfall-amber', amount: '2.38 XMR', tag: 'STAGING' },
    { label: 'Exchange Deposit', sub: 'Fiat off-ramp attempt', color: 'border-nightfall-red/60 bg-nightfall-red/10 text-nightfall-red', amount: 'Flagged', tag: 'EGRESS' },
    { label: 'Operational Account', sub: 'Linked to operators', color: 'border-nightfall-green/60 bg-nightfall-green/10 text-nightfall-green', amount: 'Correlated', tag: 'ENDPOINT' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(a => (a + 1) % nodes.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-amber mb-1">
            Blockchain Flow · Correlation Model
          </div>
          <h4 className="text-[13px] font-semibold text-nightfall-text">Wallet Correlation — Observed Transaction Chain</h4>
        </div>
        <span className="text-[9px] font-mono text-nightfall-textDim border border-nightfall-border px-2 py-1">
          CONF 87% · 5-HOP TRACE
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-1">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="flex-1 flex items-stretch md:items-center gap-2"
          >
            <motion.div
              animate={active === i ? { scale: 1.03, y: -2 } : { scale: 1, y: 0 }}
              className={`flex-1 border-2 ${node.color} p-3 transition-all ${active === i ? 'shadow-[0_0_20px_currentColor/20]' : ''}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold tracking-wide">{node.label}</span>
                <span className="text-[8px] font-mono text-current opacity-70">{node.tag}</span>
              </div>
              <div className="text-[9px] text-nightfall-textDim leading-tight mb-2">{node.sub}</div>
              <div className="font-mono text-[12px] font-semibold">{node.amount}</div>
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="hidden md:flex items-center text-nightfall-borderLight mx-1">
                <motion.div
                  animate={active >= i ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -4 }}
                  className="text-nightfall-red"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            )}
            {i < nodes.length - 1 && (
              <div className="md:hidden flex justify-center py-0.5 text-nightfall-red">
                <ArrowRight className="w-4 h-4 rotate-90" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-nightfall-border/70 text-[10.5px] text-nightfall-textDim leading-relaxed">
        <span className="text-nightfall-amber font-mono mr-1">NOTE:</span>
        Flow visualization depicts blockchain correlation model reconstructed during post-incident analysis. Addresses,
        amounts, and hops derived from on-chain tracing with 87% attribution confidence per Nightfall Intelligence
        blockchain analysis model v2.4 / REV-B.
      </div>
    </div>
  )
}
