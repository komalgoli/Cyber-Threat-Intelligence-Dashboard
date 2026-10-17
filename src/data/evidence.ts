export interface Evidence {
  id: string
  file: string
  type: 'CCTV' | 'BLOCKCHAIN ANALYSIS' | 'ENCRYPTED COMMUNICATION' | 'FORENSIC IMAGE' | 'LOG FILE' | 'DOCUMENT' | 'NETWORK CAPTURE'
  status: 'ANALYZED' | 'CORRELATED' | 'PARTIALLY RECOVERED' | 'PENDING ANALYSIS' | 'SEQUESTERED'
  hash?: string
  source: string
  size?: string
  captured?: string
  confidence?: number
  caseId?: string
  classification?: string
  handler?: string
  retention?: string | number
  chain?: { date: string; action: string; officer: string }[]
  chainOfCustody?: { date: string; action: string; analyst: string }[]
  description?: string
}

export const evidence: Evidence[] = [
  {
    id: 'ev-cctv-0417',
    file: 'camera_0417_clip.mp4',
    type: 'CCTV',
    status: 'ANALYZED',
    hash: '8F3A77C1E2B5D4A8F1C3E7B9D5A2F4C8E1B3D7A9',
    source: 'CCTV Node 0417 — loading bay, southwest corner',
    size: '287.3 MB',
    captured: '2026-08-11 20:14:07 — 20:19:42 LOCAL (335 seconds, 14s usable)',
    chainOfCustody: [
      { date: '2026-08-11 22:08:43', action: 'Evidence seized; write-blocked on site; photographed in place', analyst: 'Analyst R-04 (Ops Unit 3)' },
      { date: '2026-08-12 04:17:18', action: 'Forensic imaging complete; byte-for-byte verification passed, 0 delta', analyst: 'Forensics Unit — Shift Lead T. Morales' },
      { date: '2026-08-12 09:42:06', action: 'Metadata correlation with vehicle movement DB; VIN fragment cross-referenced', analyst: 'Analyst N. Cross' }
    ],
    caseId: 'NF-CASE-0812-RR',
    classification: 'EVIDENCE · CHAIN OF CUSTODY',
    handler: 'Ops Unit 3',
    retention: 7,
    chain: [
      { date: '2026-08-11 22:08:43', action: 'Evidence seized; write-blocked on site; photographed in place', officer: 'Analyst R-04 (Ops Unit 3)' },
      { date: '2026-08-12 04:17:18', action: 'Forensic imaging complete; byte-for-byte verification passed, 0 delta', officer: 'Forensics Unit — Shift Lead T. Morales' },
      { date: '2026-08-12 09:42:06', action: 'Metadata correlation with vehicle movement DB; VIN fragment cross-referenced', officer: 'Analyst N. Cross' }
    ],
    description: 'Fourteen-second monochrome CCTV fragment recovered from Node-0417 after 2 hours of frame interpolation on surrounding degradation. Contains a reflection in a polished stainless-steel cladding panel showing a partial VIN (7 digits recovered with 82% confidence) through the southwest loading-bay door of what was later determined to be an industrial materials-processing plant. Used to narrow vehicle movement analysis radius by approximately 68%.'
  },
  {
    id: 'ev-wallet-cluster',
    file: 'wallet_cluster_214_addresses.json',
    type: 'BLOCKCHAIN ANALYSIS',
    status: 'CORRELATED',
    hash: '2B9D4A50C8F1E3B7D2A9F5C4E8B0D6A2F4C8E1B3',
    source: 'Nightfall Blockchain Analysis Model v2.4.1 — incremental build 7',
    size: '1.74 MB',
    captured: '2026-08-11 21:30:12 — 22:15:48 UTC (45 min 36s run time)',
    confidence: 87.3,
    chainOfCustody: [
      { date: '2026-08-11 22:11:02', action: 'Cluster correlation report generated with 214 linked address outputs', analyst: 'Analyst N. Cross' },
      { date: '2026-08-11 22:49:37', action: 'Corroborated against 3 prior clusters (188, 207, 211) — 17 overlapping nodes', analyst: 'Blockchain Unit — 2 signatures on file' },
      { date: '2026-08-12 08:20:14', action: 'Report reviewed for case file; 1 annotation added on Wallet C timing alignment', analyst: 'Sr. Analyst E. Ward' }
    ],
    caseId: 'NF-CASE-0811-WC',
    classification: 'SENSITIVE · SOURCE ON FILE',
    handler: 'Blockchain Unit',
    retention: 10,
    chain: [
      { date: '2026-08-11 22:11:02', action: 'Cluster correlation report generated with 214 linked address outputs', officer: 'Analyst N. Cross' },
      { date: '2026-08-11 22:49:37', action: 'Corroborated against 3 prior clusters (188, 207, 211) — 17 overlapping nodes', officer: 'Blockchain Unit — 2 signatures on file' },
      { date: '2026-08-12 08:20:14', action: 'Report reviewed for case file; 1 annotation added on Wallet C timing alignment', officer: 'Sr. Analyst E. Ward' }
    ],
    description: 'Two-hop mixer cluster with downstream operational account. 2.471 XMR traced through Wallet A (3 deposits, 48h window) → Mixer Cluster (14 intermediate addresses, 2.1h average hold) → Wallet C (6 outgoing sub-transactions) → Exchange Deposit → Operational Account #28471. Timestamps aligned with M-17 signal arrival within a 47-second envelope — correlation the basis for initial escalation.'
  },
  {
    id: 'ev-chat-fragment',
    file: 'chat_fragment_847_bytes.enc',
    type: 'ENCRYPTED COMMUNICATION',
    status: 'PARTIALLY RECOVERED',
    hash: '5C6E9F23A8B4D7F1C5E3B9A2D6F8C4E1B3D7F9A2C4E6B8D0F1A3C5E7B9D2F0A4',
    source: 'Compromised server, offshore DC-7 — /var/memdump_03 offset 0x007F1A',
    size: '43.2 KB (14% recovered payload, 847 bytes plaintext)',
    captured: '2026-08-10 01:48:22 UTC (memory snapshot; server terminated post-acquisition)',
    confidence: 64.1,
    chainOfCustody: [
      { date: '2026-08-10 02:30:18', action: 'Encrypted fragment carved from memory dump; IV + first 32 bytes of ciphertext intact', analyst: 'Passive Collection Unit — rotating-shift Team B' },
      { date: '2026-08-11 21:40:52', action: 'Partial crib-based decryption successful (14% of payload; 6 blocks remain unbroken)', analyst: 'Crypto Unit — Dr. K. Patel' },
      { date: '2026-08-12 07:11:03', action: 'Partial transcript corroborated with Source M-17 via handler out-of-band channel', analyst: 'Source Handler J. Reed' }
    ],
    caseId: 'NF-CASE-0810-CR',
    classification: 'EVIDENCE · CHAIN OF CUSTODY',
    handler: 'Crypto Unit',
    retention: 5,
    chain: [
      { date: '2026-08-10 02:30:18', action: 'Encrypted fragment carved from memory dump; IV + first 32 bytes of ciphertext intact', officer: 'Passive Collection Unit — rotating-shift Team B' },
      { date: '2026-08-11 21:40:52', action: 'Partial crib-based decryption successful (14% of payload; 6 blocks remain unbroken)', officer: 'Crypto Unit — Dr. K. Patel' },
      { date: '2026-08-12 07:11:03', action: 'Partial transcript corroborated with Source M-17 via handler out-of-band channel', officer: 'Source Handler J. Reed' }
    ],
    description: 'Encrypted chat fragment partially recovered through crib-based decryption leveraging a repeated 7-byte header that matched 2 prior samples from the same operator cohort. Contains scheduling references ("window at T plus 180 min") and meeting-point vocabulary ("bay 2, southwest corner entry") consistent with the later confirmed broadcast window. Overall reliability limited; confidence 64.1% reflects the partial state of decryption and absence of a second corroborating transcript.'
  },
  {
    id: 'ev-forensic-image-01',
    file: 'forensic_image_ws03_bay1.E01',
    type: 'FORENSIC IMAGE',
    status: 'ANALYZED',
    hash: '9A1D22B8A3B2C1D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0',
    source: 'Workstation WS-03 — Bay 1, primary broadcasting controller',
    size: '2.418 TB (2,668,412,772,352 bytes)',
    captured: '2026-08-12 01:12:04 — 06:40:27 LOCAL (5h 28m imaging)',
    confidence: 92.4,
    chainOfCustody: [
      { date: '2026-08-12 01:12:04', action: 'Scene preservation; write-blocker applied; machine photographed in-situ before removal', analyst: 'Forensics Unit, Bay 1 — Entry Team 2' },
      { date: '2026-08-12 06:40:27', action: 'E01 imaging complete with MD5+SHA1 verified; 0 bad sectors; 2 bad-block-recovery attempts', analyst: 'Lab Imaging Team — 4-person rotation' },
      { date: '2026-08-12 14:22:11', action: 'Timeline carving + browser-history extraction; 47 artifacts flagged for analyst review', analyst: 'Analyst N. Cross' }
    ],
    caseId: 'NF-CASE-0812-B1',
    classification: 'SENSITIVE · SOURCE ON FILE',
    handler: 'Forensics Unit',
    retention: 15,
    chain: [
      { date: '2026-08-12 01:12:04', action: 'Scene preservation; write-blocker applied; machine photographed in-situ before removal', officer: 'Forensics Unit, Bay 1 — Entry Team 2' },
      { date: '2026-08-12 06:40:27', action: 'E01 imaging complete with MD5+SHA1 verified; 0 bad sectors; 2 bad-block-recovery attempts', officer: 'Lab Imaging Team — 4-person rotation' },
      { date: '2026-08-12 14:22:11', action: 'Timeline carving + browser-history extraction; 47 artifacts flagged for analyst review', officer: 'Analyst N. Cross' }
    ],
    description: 'Full forensic image (EnCase E01, split into 1,024 x 2.5 GB segments) of the primary broadcasting workstation recovered from Bay 1. Contains application traces for OBS Studio 29.1.3, a custom-built transmission controller with a Qt6-based UI, scheduled transmission scripts written in PowerShell 7 (signed with a code-signing certificate later determined to be a stolen/leaked Authenticode blob), and references to an audience of approximately 471 verified payment-access accounts in 19 jurisdictions.'
  },
  {
    id: 'ev-broadcast-log',
    file: 'broadcast_controller_schedule.csv',
    type: 'LOG FILE',
    status: 'ANALYZED',
    hash: 'DC227F14B4D8C2A0F6E4C2A8F0D6B4C2A0E8F6D4C2A0B6E8F4D2C0A8E6F4B2D0',
    source: 'Broadcast Controller Application Log — WS-03, C:\\ProgramData\\Narrowcast\\logs\\',
    size: '2.137 MB (2,241,384 bytes, 18,204 lines of which 1,247 are application-level events)',
    captured: '2026-08-12 01:15:33 LOCAL (file copied at scene before full imaging)',
    confidence: 90.6,
    chainOfCustody: [
      { date: '2026-08-12 01:20:07', action: 'CSV log copied under chain of custody; SHA-256 computed twice by 2 independent analysts', analyst: 'Forensics Unit Bay 1 — Entry Team 2' },
      { date: '2026-08-12 11:05:47', action: 'Scheduled timestamps cross-correlated with M-17 transmission cadence; 2 events matched within 80s', analyst: 'Analyst E. Ward' }
    ],
    caseId: 'NF-CASE-0812-B1',
    classification: 'EVIDENCE · CHAIN OF CUSTODY',
    handler: 'Operations Log Team',
    retention: 7,
    chain: [
      { date: '2026-08-12 01:20:07', action: 'CSV log copied under chain of custody; SHA-256 computed twice by 2 independent analysts', officer: 'Forensics Unit Bay 1 — Entry Team 2' },
      { date: '2026-08-12 11:05:47', action: 'Scheduled timestamps cross-correlated with M-17 transmission cadence; 2 events matched within 80s', officer: 'Analyst E. Ward' }
    ],
    description: 'Transmission controller scheduling CSV log. Broadcast start time was programmed for 2026-08-12 01:00:00 local — nine minutes after the facility was secured at 00:51:42 per the on-site operational log. The log includes a "pre-stream connectivity check" scheduled at 00:43 that never executed (return code field blank; controller appears to have been interrupted during boot phase of the scheduled PowerShell wrapper).'
  },
  {
    id: 'ev-redacted-doc-01',
    file: 'bm_tf_ops_summary_rr2.pdf',
    type: 'DOCUMENT',
    status: 'ANALYZED',
    hash: '2F6ABM017D3C8E9F0A2B4D6C8E0F2A4B6C8D0E2F4A6C8B0D2E4F6A8C0B2D4E6F8',
    source: 'Black Meridian Task Force — Operational File, DOC-0812-RR-S1',
    size: '384.7 KB (28 pages, 167 redactions across 22 of 28 pages)',
    captured: '2026-08-12 08:00:00 (document generated; 3-pass redaction workflow)',
    confidence: 94.8,
    chainOfCustody: [
      { date: '2026-08-12 08:00:00', action: 'Document authored from operational notes for case NF-CASE-0812-RR; v0.4 initial draft', analyst: 'Document Unit — Lead Editor M. Okafor' },
      { date: '2026-08-12 15:30:42', action: 'Redaction pass completed (3 rounds, 2 independent reviewers sign-off)', analyst: 'Classification Unit' },
      { date: '2026-08-13 03:15:08', action: 'Approved for release; exemption categories documented on p.27', analyst: 'Editorial Desk' }
    ],
    caseId: 'NF-CASE-0812-RR',
    classification: 'SENSITIVE · SOURCE ON FILE',
    handler: 'Classification Unit',
    retention: 12,
    chain: [
      { date: '2026-08-12 08:00:00', action: 'Document authored from operational notes for case NF-CASE-0812-RR; v0.4 initial draft', officer: 'Document Unit — Lead Editor M. Okafor' },
      { date: '2026-08-12 15:30:42', action: 'Redaction pass completed (3 rounds, 2 independent reviewers sign-off)', officer: 'Classification Unit' },
      { date: '2026-08-13 03:15:08', action: 'Approved for release; exemption categories documented on p.27', officer: 'Editorial Desk' }
    ],
    description: 'Black Meridian Task Force — Operational Summary document, classification SENSITIVE / SOURCE ON FILE. Redacted sections include source handling protocols for M-17, precise location-identifying data for the case, and the full operational roster of the entry team. Released to Newsroom under "Eyes Only — Desk Use" terms; no onward distribution permitted per the access matrix.'
  },
  {
    id: 'ev-netcap-01',
    file: 'portmirror_bay1_switch02_full.pcapng',
    type: 'NETWORK CAPTURE',
    status: 'PENDING ANALYSIS',
    hash: 'PCAPB1NF017F3A2D119C5B8E4F2A6D1B9C3E8F0A2D4C6B8E1F0A3D5C7B9E2F1A4D6C8E0B3F5',
    source: 'Port Mirror — Bay 1 Switch 02, uplink to fiber converter, 85 minutes pre-operation through 14 minutes post-entry',
    size: '42.187 GB (13,847,221 packets; 2 TCP streams flagged for first-pass analysis)',
    captured: '2026-08-11 23:40:19 — 2026-08-12 01:05:44 LOCAL (1h 25m 25s of uninterrupted capture)',
    caseId: 'NF-CASE-0812-B1',
    classification: 'EVIDENCE · CHAIN OF CUSTODY',
    handler: 'Network Forensics',
    retention: 7,
    chain: [
      { date: '2026-08-11 23:40:19', action: 'Capture initiated on port mirror; uninterrupted recording of operational window began', officer: 'Network Forensics' },
      { date: '2026-08-12 01:05:44', action: 'Capture ended and packaged for triage queue', officer: 'Bay 1 Switch Ops Desk' }
    ],
    description: 'Full packet capture (pcapng format with 2 interface blocks) from the Bay 1 switch spanning the period immediately preceding the operation through facility securing. Currently queued for deep-dive analysis; 2 automated streams flagged by IDS signature set v8.14 for additional C2 and audience-connection indicators. Priority 2 behind forensic image processing; ETA for full triage is 3 working days per the current case backlog.'
  }
]

export function getEvidenceById(id: string): Evidence | undefined {
  return evidence.find(e => e.id === id)
}
