export interface FeedEntry {
  id: string
  timestamp: string
  message: string
  type: 'INDICATOR' | 'CORRELATION' | 'PROFILE' | 'EVIDENCE' | 'DOMAIN' | 'REVIEW' | 'SOURCE' | 'WALLET' | 'NODE' | 'STORAGE' | 'ALERT'
  confidence?: number
}

export const liveFeedEntries: FeedEntry[] = [
  { id: 'f1',  timestamp: '20:41:08', message: 'New IPv4 indicator: 192.0.2.88/32 flagged by Node-0417 correlation cluster', type: 'INDICATOR', confidence: 93.7 },
  { id: 'f2',  timestamp: '20:40:31', message: 'Wallet cluster correlation completed — 214 linked addresses, 3-hop mixer identified, timestamp delta 47s', type: 'CORRELATION', confidence: 87.3 },
  { id: 'f3',  timestamp: '20:39:52', message: 'Threat actor profile updated: Cinder-9 — added MS-SQL brute-force TTP, adjusted confidence +2.1%', type: 'PROFILE', confidence: 81.4 },
  { id: 'f4',  timestamp: '20:38:44', message: 'Evidence package EV-2026-0844 indexed — forensic image WS-03 bay1, 2.41 TB e01, hash verified', type: 'EVIDENCE' },
  { id: 'f5',  timestamp: '20:37:11', message: 'New domain observed: voidpay-gateway[.]onion — appeared on 3 watchlists within 6 min window', type: 'DOMAIN', confidence: 74.8 },
  { id: 'f6',  timestamp: '20:35:03', message: 'Analyst review completed on NF-CASE-0805-WC — 2 findings, 1 correction pushed by N. Cross', type: 'REVIEW', confidence: 96.2 },
  { id: 'f7',  timestamp: '20:34:18', message: 'Source M-19 operational check-in logged — 74-word burst via dead-drop, code phrase confirmed', type: 'SOURCE' },
  { id: 'f8',  timestamp: '20:32:55', message: 'IOC pushed: SHA256 7F3A2D119C5B8E4F2A6D1B9C3E8F0A2D4C6B8E — 6 vendors already detecting', type: 'INDICATOR', confidence: 88.9 },
  { id: 'f9',  timestamp: '20:31:40', message: 'Null Veil campaign correlation — 82.4% confidence (was 79.1% 3h ago), 4 new supporting signals', type: 'CORRELATION', confidence: 82.4 },
  { id: 'f10', timestamp: '20:30:09', message: 'Forum post archived: Black Meridian recruitment thread #18473 — 22 replies, 3 applicants pseudonymized', type: 'EVIDENCE' },
  { id: 'f11', timestamp: '20:28:47', message: 'Wallet deposit: 0.03471 XMR → Cluster-7 hop-2, 2 confirmations, tx pool latency 2.4 min', type: 'WALLET', confidence: 91.6 },
  { id: 'f12', timestamp: '20:27:22', message: 'Threat actor Sable Fox: confidence adjusted 78.6 → 82.3 after new Jabber ID correlation', type: 'PROFILE', confidence: 82.3 },
  { id: 'f13', timestamp: '20:26:04', message: 'Document NF-DOC-0813-014 released for review — 384 KB PDF, 14 redactions, DRAFT watermark', type: 'EVIDENCE', confidence: 94.8 },
  { id: 'f14', timestamp: '20:24:51', message: 'Beacon pattern deviation detected: subnet 10.17.0.0/24, interval shifted 14s → 17s, jitter +38%', type: 'INDICATOR', confidence: 76.2 },
  { id: 'f15', timestamp: '20:23:30', message: 'Onion service rotation: node 7821 → 9914, offline window 2m 47s, circuit rebuild observed', type: 'DOMAIN' },
  { id: 'f16', timestamp: '20:22:15', message: 'Source reliability review M-17: maintained HIGH rating — 14/14 corroborated transmissions in last 30 days', type: 'SOURCE', confidence: 96.4 },
  { id: 'f17', timestamp: '20:20:58', message: 'Echo Vector archival dataset cross-referenced — 3 IOC matches from prior wiper banner strings', type: 'REVIEW', confidence: 85.7 },
  { id: 'f18', timestamp: '20:19:41', message: 'Storage node NF-STO-017 rebalanced — 47.218 TB used of 96 TB, 14-day retention active', type: 'STORAGE' },
  { id: 'f19', timestamp: '20:18:14', message: 'Sat node 0x04 handshake re-established after 8 min dropout — SNR 14.2 dB, BER nominal', type: 'NODE', confidence: 89.1 },
  { id: 'f20', timestamp: '20:16:53', message: 'Wallet sweep detected: 1.274 BTC moved through 7-address CoinJoin-style split from cold wallet W-284', type: 'WALLET', confidence: 83.5 },
  { id: 'f21', timestamp: '20:15:27', message: 'ALERT: Forum IronGate backup dump (partial, ~18%) circulating — 2 sources claiming mirror possession', type: 'ALERT', confidence: 68.3 },
  { id: 'f22', timestamp: '20:14:02', message: 'Mutex match: Global\\NV_Session_8821 observed on 2 new submissions from 2 geographically distinct VPS', type: 'INDICATOR', confidence: 79.6 },
]

export function getFeedEntriesDoubled(): FeedEntry[] {
  return [...liveFeedEntries, ...liveFeedEntries]
}
