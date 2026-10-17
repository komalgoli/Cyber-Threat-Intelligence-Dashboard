import { motion } from 'framer-motion'
import { Network, Globe, Server, Mail, HardDrive, UploadCloud } from 'lucide-react'

interface Tactic {
  id: string
  name: string
  description: string
  observedUse: string
}

interface Phase {
  id: string
  phase: string
  tactics: Tactic[]
}

const mitreStyle: Phase[] = [
  {
    id: 'initial-access',
    phase: 'Initial Access',
    tactics: [
      { id: 'T1189', name: 'Drive-by Compromise', description: 'Exploitation of user-facing systems via malicious content', observedUse: 'Cinder-9 deploys exploit kit on compromised vendor portals' },
      { id: 'T1566', name: 'Phishing (synthetic)', description: 'Context-aware email with personalized lures', observedUse: 'Null Veil uses synthetic-spear lures in European campaign' },
      { id: 'T1190', name: 'Public-facing application exploit', description: 'Targeting unpatched internet-facing software', observedUse: 'Ghost Orchid targets telecom stack CVEs' },
    ],
  },
  {
    id: 'execution',
    phase: 'Execution',
    tactics: [
      { id: 'T1059', name: 'Command and Scripting Interpreter', description: 'Abuse of native shell and scripting environments', observedUse: 'PowerShell and batch staging observed across 47 tracked entities' },
      { id: 'T1204', name: 'User Execution', description: 'Social engineering to induce user interaction', observedUse: 'Sable Fox brokers trojanized installers for access resale' },
    ],
  },
  {
    id: 'persistence',
    phase: 'Persistence',
    tactics: [
      { id: 'T1547', name: 'Boot or Logon Autostart Execution', description: 'Registry run keys, startup folders, services', observedUse: 'Echo Vector wiper pre-stages via Run key for reboot-triggered MBR overwrite' },
      { id: 'T1542', name: 'Pre-OS Boot / Firmware', description: 'Below-OS persistence in firmware components', observedUse: 'Ghost Orchid firmware implants — 17 router models in tracked set' },
    ],
  },
  {
    id: 'credential-access',
    phase: 'Credential Access',
    tactics: [
      { id: 'T1003', name: 'OS Credential Dumping', description: 'Extraction of credentials from memory and stores', observedUse: 'Mimikatz use across Cinder-9 affiliate playbook' },
      { id: 'T1110', name: 'Brute Force', description: 'Credential guessing against remote services', observedUse: 'MS-SQL brute — top-5 password list in Sable Fox access feed' },
    ],
  },
  {
    id: 'discovery',
    phase: 'Discovery',
    tactics: [
      { id: 'T1087', name: 'Account Discovery', description: 'Enumeration of accounts and trust boundaries', observedUse: 'net user / domain-style enumeration — perimeter mapped' },
      { id: 'T1046', name: 'Network Service Scanning', description: 'Internal discovery of reachable services', observedUse: 'Custom scanner fingerprinting 445/1433/3389 — monitored subnets' },
    ],
  },
  {
    id: 'command-control',
    phase: 'Command and Control',
    tactics: [
      { id: 'T1572', name: 'Protocol Tunneling (DNS)', description: 'C2 channel hidden inside legitimate protocols', observedUse: 'Null Veil — DNS-tunnelled beacon with 43-min heartbeat interval' },
      { id: 'T1071', name: 'Web Protocols', description: 'HTTPS masquerade of C2 traffic', observedUse: 'Nightfall researchers detect new C2 beacon pattern across 47 victims' },
    ],
  },
  {
    id: 'exfiltration',
    phase: 'Exfiltration',
    tactics: [
      { id: 'T1567', name: 'Exfiltration over Web Service', description: 'Staged uploads to cloud storage and file-sharing', observedUse: 'Black Meridian data staging on 3 tracked providers' },
      { id: 'T1048', name: 'Exfiltration Over Alternative Protocol', description: 'Non-HTTP channels for data egress', observedUse: 'FTP-over-DNS transfer in Silent Mirror operation' },
    ],
  },
  {
    id: 'impact',
    phase: 'Impact',
    tactics: [
      { id: 'T1486', name: 'Data Encrypted for Impact', description: 'Ransomware encryption of data stores', observedUse: 'Cinder-9 RaaS .c9 extension with steal-before-encrypt' },
      { id: 'T1561', name: 'Disk / MBR Wipe', description: 'Overwrite or corrupt boot structures', observedUse: 'Echo Vector wiper — MBR banner at 4 targeted legal firms' },
    ],
  },
]

const phaseIcons: Record<string, any> = {
  'Initial Access': Globe,
  'Execution': Server,
  'Persistence': UploadCloud,
  'Credential Access': Network,
  'Discovery': Network,
  'Command and Control': Network,
  'Exfiltration': UploadCloud,
  'Impact': HardDrive,
}

export function MitreStyleAnalysis() {
  const colors = [
    'border-nightfall-red/50 text-nightfall-red',
    'border-nightfall-amber/50 text-nightfall-amber',
    'border-nightfall-green/50 text-nightfall-green',
    'border-nightfall-blue/50 text-nightfall-blue',
  ]

  return (
    <div className="panel p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-nightfall-border bg-black/30 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-nightfall-blue" />
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-text">
            Threat Tactic Matrix — Observed Actor Behavior Reference
          </span>
        </div>
        <span className="label-chip border-nightfall-amber/40 bg-nightfall-amber/10 text-nightfall-amber">
          NIGHTFALL CTI MODEL · RESEARCH REFERENCE
        </span>
      </div>

      <div className="p-4 md:p-6 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-4">
          {mitreStyle.map(function (phase, i) {
            const Icon = phaseIcons[phase.phase] || Network
            const color = colors[i % colors.length]
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={'border p-3 ' + color + ' bg-current/5'}
              >
                <Icon className="w-4 h-4 mb-2 opacity-80" />
                <div className="text-[10px] font-bold uppercase tracking-wider leading-tight">{phase.phase}</div>
                <div className="text-[9px] font-mono text-nightfall-textDim mt-0.5">{phase.tactics.length} TACTICS</div>
              </motion.div>
            )
          })}
        </div>

        <div className="space-y-2">
          {mitreStyle.map(function (phase, i) {
            const Icon = phaseIcons[phase.phase] || Network
            const tactics = phase.tactics
            return (
              <div key={phase.id} className="border border-nightfall-border hover:border-nightfall-borderLight transition-colors">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-nightfall-border/60 bg-nightfall-card/60">
                  <Icon className="w-3.5 h-3.5 text-nightfall-textDim" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-nightfall-text font-semibold">
                    {phase.phase.toUpperCase()}
                  </span>
                  <span className="ml-auto text-[9px] font-mono text-nightfall-textDim">{tactics.length} entries · TRACKED</span>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y md:divide-x-0 divide-nightfall-border/50">
                  {tactics.map(function (t, j) {
                    const borderClass = j % 2 === 1 ? 'md:border-l md:border-t-0 border-t' : ''
                    return (
                      <div key={t.id} className={'p-4 md:p-5 ' + borderClass}>
                        <div className="flex items-baseline justify-between mb-1.5">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-[10px] text-nightfall-red">{t.id}</span>
                            <span className="text-[12px] font-semibold text-nightfall-text">{t.name}</span>
                          </div>
                        </div>
                        <p className="text-[11px] leading-relaxed text-nightfall-textMuted mb-2">{t.description}</p>
                        <div className="text-[10.5px] leading-snug text-nightfall-amber/90 font-mono">
                          <span className="text-nightfall-textDim mr-1">Observed:</span>{t.observedUse}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
