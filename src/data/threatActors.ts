export interface ThreatActor {
  id: string
  alias: string
  nameVariants: string[]
  firstObserved: string
  activity: 'Active' | 'Dormant' | 'Defunct' | 'Re-emerged'
  knownTactics: string[]
  confidence: number
  associatedCampaigns: { id: string; name: string; date: string }[]
  indicators: { type: string; value: string; note: string }[]
  timeline: { date: string; event: string }[]
  description: string
  motivation: string
  origin: string
}

export const threatActors: ThreatActor[] = [
  {
    id: 'null-veil',
    alias: 'NULL VEIL',
    nameVariants: ['NullVeil', 'NV-APT', 'OP_NULLVEIL', 'Null Veil Collective'],
    firstObserved: '14 March 2024',
    activity: 'Re-emerged',
    knownTactics: ['Spear-phishing with synthetic content', 'Living-off-the-land binaries', 'Stolen credential reuse', 'C2 over DNS tunneling', 'Encrypted second-stage payloads', 'DLL side-loading via signed driver'],
    confidence: 85.7,
    associatedCampaigns: [
      { id: 'c-2026-007', name: 'Echo Chamber', date: '12 July 2026' },
      { id: 'c-2025-118', name: 'Paper Lantern', date: '3 November 2025' },
      { id: 'c-2025-044', name: 'Static Line', date: '21 April 2025' }
    ],
    indicators: [
      { type: 'Domain', value: 'nv-apt-c2-node[.]onion', note: 'Primary C2 channel; 6 hop chain observed' },
      { type: 'IPv4', value: '192.0.2.88', note: 'Exit relay observed across 3 campaigns' },
      { type: 'Hash (SHA256)', value: '7F3A2D119C5B8E4F2A6D1B9C3E8F0A2D4C6B8E1F0A3D5C7B9E2F1A4D6C8E0B3F5', note: 'Second-stage staging payload signature' },
      { type: 'Mutex', value: 'Global\\\\NV_Session_8821', note: 'Unique mutex; 2 new submissions VPS-wide' }
    ],
    timeline: [
      { date: '14 March 2024', event: 'First observed targeting regional financial services entities — 3 entities in 48h window' },
      { date: '09 September 2024', event: 'Shifted focus to professional services and law firms — 7 engagements documented' },
      { date: '21 April 2025', event: 'Campaign Static Line: 21 entities impacted across 4 sectors over 19-day window' },
      { date: '13 March 2026', event: 'Period of apparent dormancy begins — no new indicators for 121 days' },
      { date: '18 July 2026', event: 'Re-emergence confirmed across 3 new campaigns; infrastructure fingerprint matches 94.7%' }
    ],
    description: 'Null Veil is an advanced persistent threat actor attributed to a cluster of 6–10 operators with a demonstrated focus on long-game access acquisition and data staging prior to exfiltration. The actor is notable for extended dwell times (median 47 days, maximum observed 132 days) and a strong preference for credential-based access over exploit-driven initial entry. Internal codenames for this cluster vary across partner organizations; Nightfall uses "NV-APT" in cross-agency materials.',
    motivation: 'Data exfiltration, strategic intelligence collection, long-term access brokerage on vetted marketplaces',
    origin: 'Cross-border operator cluster; language artifacts point to multilingual cohort'
  },
  {
    id: 'black-meridian',
    alias: 'BLACK MERIDIAN',
    nameVariants: ['BM Collective', 'BlackMeridianNET', 'Meridian Ops', 'BM-TF Target'],
    firstObserved: '02 January 2025',
    activity: 'Active',
    knownTactics: ['Marketplace administration', 'Escrow service operation', 'Vetted access brokerage', 'Multi-sig transaction coordination', 'Forum moderation infrastructure', 'Invite-only vendor onboarding'],
    confidence: 90.4,
    associatedCampaigns: [
      { id: 'c-2026-014', name: 'Iron Gate Takedown', date: '27 June 2026' },
      { id: 'c-2026-002', name: 'Red Room Files', date: '11 August 2026' },
      { id: 'c-2025-091', name: 'Meridian Marketplace', date: '14 September 2025' }
    ],
    indicators: [
      { type: 'Onion Service', value: 'blackmeridian-market-v3[.]onion', note: 'Primary marketplace front; 3 load-balanced mirrors' },
      { type: 'XMR Address', value: '4xMeridianClusterPrimary8a2f1b9c3d7e6a8b0c2d4f6e8a0b2c4d6f8e0', note: 'Cluster primary wallet — 214 linked downstream addresses' },
      { type: 'PGP Fingerprint', value: '7F3A 2D11 9C5B 8E4F 2A6D  1B9C 3E8F 0A2D 4C6B 8E1F', note: 'Admin signing key; shared across 4 forum identities' }
    ],
    timeline: [
      { date: '02 January 2025', event: 'Black Meridian marketplace announced on 4 underground forums simultaneously — same PGP signed post' },
      { date: '14 September 2025', event: 'User base surpasses 11,347 active accounts; introduces vetted vendor tier with $2000 bond' },
      { date: '08 March 2026', event: 'Secondary listing platform IronGate launched — shared admin panel and PKI confirmed' },
      { date: '27 June 2026', event: 'IronGate, VoidMarket, ShadowArchive all vanish within 72h window; wallet outflow observed' },
      { date: '11 August 2026', event: 'Tied to Red Room Files investigation via 3-hop wallet correlation cluster' }
    ],
    description: 'Black Meridian is a criminal collective operating interconnected underground services including a marketplace, access brokerage, and an encrypted messaging platform for vetted members. The organization is named for the Black Meridian Task Force investigating it. Current operator estimate: 4 primary administrators, 11–17 support staff, approximately 140–180 vetted vendors.',
    motivation: 'Financial profit via underground services, access brokerage (30% fee), escrow holding, vendor bond deposits',
    origin: 'Distributed operator cluster with offshore infrastructure hosted across 4 jurisdictions'
  },
  {
    id: 'ghost-orchid',
    alias: 'GHOST ORCHID',
    nameVariants: ['GhostOrchid APT', 'GO_Rig', 'Orchid Ghost', 'Petal Drift Cluster'],
    firstObserved: '27 August 2023',
    activity: 'Dormant',
    knownTactics: ['Zero-day exploitation of telecom stack', 'Firmware-level persistence', 'Air-gap bridging attempts', 'Satellite terminal targeting', 'Long-horizon intelligence collection', 'Masquerading as legitimate OTA update'],
    confidence: 78.9,
    associatedCampaigns: [
      { id: 'c-2025-063', name: 'Petal Drift', date: '18 June 2025' },
      { id: 'c-2024-124', name: 'Iron Stem', date: '02 December 2024' }
    ],
    indicators: [
      { type: 'IPv6', value: '2001:db8:beef:deaf:f00d:cafe:baad:f00d', note: 'Satellite downlink fingerprint; 3 ground stations affected' },
      { type: 'Certificate Serial', value: '9F:2A:7B:4C:0E:1D:83:A2', note: 'Stolen OEM firmware signing cert; serial observed in 2 OTA updates' },
      { type: 'Hash (MD5)', value: 'D41D8CD98F00B204E9800998ECF8427E', note: 'Wiper stub hash; 3 router firmware variants recovered' }
    ],
    timeline: [
      { date: '27 August 2023', event: 'First unique implants recovered from telecom satellite ground station — 2 dish controllers affected' },
      { date: '02 December 2024', event: 'Campaign Iron Stem: firmware implants on 17 specific router models across 8 operators' },
      { date: '18 June 2025', event: 'Campaign Petal Drift detected; no new activity since 03 September 2025 — dormancy watch ongoing' }
    ],
    description: 'Ghost Orchid is a threat actor believed to conduct espionage-style operations against telecommunications and satellite-related infrastructure. Last observed activity dated 03 September 2025; current dormancy status under active weekly review. Attribution confidence is the lowest among primary tracked clusters due to minimal implant overlap and lack of language artifacts.',
    motivation: 'Strategic intelligence collection, infrastructure access persistence, signal intelligence interception at downlink facilities',
    origin: 'Unattributed state-nexus cluster with no confirmed language or locale markers'
  },
  {
    id: 'cinder-9',
    alias: 'CINDER-9',
    nameVariants: ['Cinder9', 'C9-Ransom', 'CinderOps', 'Cinder Nine Crew'],
    firstObserved: '07 November 2025',
    activity: 'Active',
    knownTactics: ['Ransomware-as-a-service with custom affiliates', 'Steal-before-encrypt extortion', 'Publicly named victim shaming site', 'MS-SQL brute-force initial access', 'Mimikatz credential theft', 'Exfiltration via rsync tunnel on non-standard port'],
    confidence: 87.8,
    associatedCampaigns: [
      { id: 'c-2026-011', name: 'Northstar Logistics', date: '01 August 2026' },
      { id: 'c-2026-005', name: 'Aspen Group', date: '14 May 2026' },
      { id: 'c-2025-137', name: 'First Wave C9', date: '19 December 2025' }
    ],
    indicators: [
      { type: 'Ransom Note', value: 'CINDER9_README_HOW_TO_RECOVER.txt', note: 'Note filename; ASCII banner with hardcoded operator ID field' },
      { type: 'Extension', value: '.c9lock', note: 'Encrypted file suffix; appended after staging completes' },
      { type: 'BTC Wallet', value: '1bcinderninepaymentprimary9a4b2c1d8e6f3a0b2c4d6e8f0a', note: 'Primary collection wallet observed in 7 of 11 confirmed incidents' },
      { type: 'Shaming Domain', value: 'cinder9-victims-public[.]onion', note: 'Victim shaming / data leak portal; 17 listings current' }
    ],
    timeline: [
      { date: '07 November 2025', event: 'Cinder-9 actor profile posted on 3 RaaS affiliate recruitment forums — initial $5k affiliate fee' },
      { date: '19 December 2025', event: 'First confirmed victims: 7 manufacturing and retail entities across EU and NA in 11-day window' },
      { date: '14 May 2026', event: 'Aspen Group intrusion: 1.217 TB stolen data staged for incremental release schedule' },
      { date: '01 August 2026', event: 'Northstar Logistics: claim posted to onion shaming domain; 48-hour deadline quoted' }
    ],
    description: 'Cinder-9 is a ransomware-as-a-service operator with a documented pattern of data exfiltration prior to encryption and a public shaming site for non-paying victims. Affiliate program recruits access brokers through 4 underground forums with dual-arbitration dispute system. Estimated affiliate roster at time of reporting: 22–27 active partners.',
    motivation: 'Financial extortion via encryption and threatened data release; affiliate split documented at 65% affiliate / 35% operator',
    origin: 'RaaS operation with distributed affiliate network; operator timezone data inconsistent across 3 cohorts'
  },
  {
    id: 'sable-fox',
    alias: 'SABLE FOX',
    nameVariants: ['SableFox', 'SF-INT', 'Fox Sable', 'Sable Den Collective'],
    firstObserved: '13 May 2024',
    activity: 'Active',
    knownTactics: ['Initial access brokerage', 'Stealer-log monetization', 'Proxy-residential access sales', 'Compromised account resale', 'Fake KYC document market', 'Bulk cookie jar trading'],
    confidence: 82.1,
    associatedCampaigns: [
      { id: 'c-2026-009', name: 'Fox Den Takedown', date: '21 July 2026' },
      { id: 'c-2025-078', name: 'Account Stream', date: '08 July 2025' }
    ],
    indicators: [
      { type: 'Market URL', value: 'sablefox-accounts-v2[.]onion', note: 'Primary account marketplace front; 2 mirrors confirmed' },
      { type: 'Jabber ID', value: 'sablefox_ops@xmpp-services[.]net', note: 'Admin contact; 3-month messaging history recovered' },
      { type: 'Session Cookie', value: 'SF_SESS_9a2f8c4e1b6d3a0f2c8e4b6d0a2f8c4e', note: 'Admin panel session format; consistent across all 3 platform instances' }
    ],
    timeline: [
      { date: '13 May 2024', event: 'Sable Fox brand debuts for access brokerage — introductory pricing for first 40 "verified" vendors' },
      { date: '08 July 2025', event: 'Account Stream operation: 8,472 compromised accounts across 21 platforms documented by passive monitor' },
      { date: '21 July 2026', event: 'Fox Den: disruption of 3 hosting nodes — 1.18 TB of logs and market database seized in coordinated action' }
    ],
    description: 'Sable Fox is a criminal brokerage specializing in the monetization of stolen account credentials, initial access to corporate environments (from $80 to $12,000 depending on revenue and access tier), and residential proxy services for other threat actors. Notable for public dispute-resolution log that functions as unintentional OPSEC self-documentation.',
    motivation: 'Financial profit through stolen credential marketplace and access brokerage — estimated 18–24% commission per completed transaction',
    origin: 'Eastern European-language operator cluster, Cyrillic artifacts observed in admin panel JavaScript'
  },
  {
    id: 'echo-vector',
    alias: 'ECHO VECTOR',
    nameVariants: ['EchoVector', 'EV-Wiper', 'Vector Echo', 'Resonance Group'],
    firstObserved: '18 February 2025',
    activity: 'Defunct',
    knownTactics: ['Wiper payload deployment after failed extortion', 'MBR overwrite with custom banner', 'VSS shadow copy deletion', 'Domain controller targeting', 'False-flag threat actor attribution attempts', 'Syslog timestamp manipulation'],
    confidence: 83.6,
    associatedCampaigns: [
      { id: 'c-2025-152', name: 'Resonance', date: '14 October 2025' },
      { id: 'c-2025-099', name: 'First Harmonic', date: '26 February 2025' }
    ],
    indicators: [
      { type: 'Wiper Binary', value: 'EchoVectorWiper64.exe', note: 'Driver-signed wiper binary; version string v2.3.1 embedded in resources' },
      { type: 'Registry Key', value: 'HKLM\\SOFTWARE\\EchoVector\\InstallState', note: 'Install marker; uninstaller timestamp matches 4 of 7 victim sites' },
      { type: 'Banner String', value: 'ECHO_VECTOR_WIPER_v2.3.1', note: 'Post-wipe banner displayed on MBR overwrite; 7 sites confirmed' }
    ],
    timeline: [
      { date: '26 February 2025', event: 'First Harmonic: wiper deployed at 2 legal firms 11 days after extortion demands went unpaid' },
      { date: '14 October 2025', event: 'Resonance: 4 entities impacted before disruption of C2 infrastructure spanning 3 VPS providers' },
      { date: '23 January 2026', event: 'No new indicators for 130 consecutive days; operator profile marked Defunct after takedown confirmation' }
    ],
    description: 'Echo Vector is a threat actor that specialized in destructive wiper deployments, typically triggered after an initial extortion attempt failed to yield payment. Disruption of core infrastructure in late 2025 followed by 130-day dormancy and post-takedown operator identification (designated M-22 in filings) leads to current Defunct classification. Known for attempting to plant other actor\'s TTPs as false-flag artifacts at 2 of 7 confirmed victim sites.',
    motivation: 'Data destruction as retaliation after failed extortion; operator statements posted on 2 occasions referencing "making an example"',
    origin: 'Single primary operator identified as M-22 in takedown filings; assisted by 1–2 occasional affiliates'
  }
]

export function getThreatActorById(id: string): ThreatActor | undefined {
  return threatActors.find(t => t.id === id || t.alias.toLowerCase() === id.toLowerCase())
}
