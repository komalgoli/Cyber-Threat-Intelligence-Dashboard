export interface Article {
  id: string
  slug: string
  headline: string
  subheadline: string
  category: 'investigations' | 'cybercrime' | 'threat-actors' | 'leaks' | 'intelligence' | 'evidence'
  caseId?: string
  classification: 'SENSITIVE · SOURCE ON FILE' | 'UNCLASSIFIED · REPORTING' | 'EVIDENCE · CHAIN OF CUSTODY'
  confidence: number
  status: 'CLOSED' | 'ACTIVE' | 'ARCHIVED' | 'PENDING REVIEW'
  date: string
  updated: string
  readTime: number
  authorId: string
  tags: string[]
  heroImage: string
  heroCaption: string
  excerpt?: string
  content?: Section[]
  evidenceIds?: string[]
  threatActorIds?: string[]
  relatedArticleIds?: string[]
  timeline?: TimelineEntry[]
}

export interface Section {
  id: string
  title: string
  type: 'text' | 'quote' | 'evidence' | 'document' | 'visual'
  body?: string
}

export interface TimelineEntry {
  time: string
  title: string
  description: string
}

export const articles: Article[] = [
  {
    id: 'nf-2026-0812-rr',
    slug: 'the-red-room-files',
    headline: 'THE RED ROOM FILES: HOW AN UNDERCOVER SOURCE HELPED STOP AN ILLEGAL DARK-WEB BROADCAST',
    subheadline: 'An undercover source helped a federal cybercrime team locate and rescue a kidnapped child before an illegal underground broadcast could begin. 214 wallet addresses, 3 jurisdiction coordination, 47-second signal envelope.',
    category: 'investigations',
    caseId: 'NF-CASE-0812-RR',
    classification: 'SENSITIVE · SOURCE ON FILE',
    confidence: 94.2,
    status: 'CLOSED',
    date: '12 August 2026',
    updated: '13 August 2026 — 03:17 UTC',
    readTime: 29,
    authorId: 'mara-voss',
    tags: ['Black Meridian', 'Undercover Source', 'Child Rescue', 'Blockchain Tracing', 'OSINT Reconstruction', 'M-17 Asset', 'FCIB Operation'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=reconstructed%20industrial%20warehouse%20interior%20at%20night%2C%20red%20emergency%20lighting%2C%20silhouettes%20of%20investigators%20entering%2C%20computer%20monitors%20with%20static%2C%20cables%2C%20abandoned%20equipment%2C%20dark%20moody%20atmosphere%2C%20no%20identifiable%20people%2C%20blurred%20cctv%20style&image_size=landscape_16_9',
    heroCaption: 'Scene reconstruction, Node-0417 correlation — investigative archive image',
    excerpt: 'In a coordinated nighttime operation, federal agents secured an abandoned industrial facility after intelligence from an embedded undercover source revealed a plot to broadcast a criminal act on the dark web. The operation, reconstructed through intelligence and evidence gathered during the investigation, offers a rare window into modern cyber-investigation methodology. Confidence across 7 signal sources: 94.2%.',
    content: [
      { id: 's1', title: 'THE FIRST SIGNAL', type: 'text', body: 'At 21:04:17 on the evening of August 11, an encrypted message arrived at a secure drop point monitored by the Black Meridian Task Force. The transmission did not come through official channels. It arrived through a route the task force had been quietly maintaining for eighteen months — a back-channel established with an anonymous underground source designated only as M-17.\n\nThe message was deliberately fragmentary. No names. No exact coordinates. But it carried something that made the night-shift analyst flag it immediately: a code phrase that only a handful of cleared individuals knew existed. That phrase — the type used only to verify genuine signal against the constant noise of disinformation on underground networks — meant the source was transmitting under duress.\n\nWithin seven minutes (21:11:03), the intelligence had been escalated three tiers up the chain of command. An FCIB case file was opened. The clock began running.' },
      { id: 's2', title: 'THE INFORMANT', type: 'text', body: 'Source M-17 was not a new asset. Over the preceding eleven months, the individual operating under that designation had embedded themselves within a tier of a criminal network involved in financial fraud, data exfiltration operations, and the trafficking of compromised credentials across multiple underground forums. According to the operational profile compiled by analysts, M-17 had been vetted through four separate corroboration channels, and their prior transmissions had led to the seizure of three cryptocurrency wallets linked to known criminal clusters.\n\nWhat M-17 reported that evening crossed a threshold the task force had always known was possible but hoped they would never face: the network M-17 had infiltrated was preparing to do something unprecedented on that specific night. Something that could not be undone if the broadcast reached its intended audience.\n\nM-17 transmitted only six details before the transmission was cut. Those fragments became the foundation of everything that followed.' },
      { id: 's3', title: 'FOLLOWING THE MONEY', type: 'text', body: 'While analysts studied the message fragments, a parallel team began tracing payments. Within criminal networks operating on the dark web, money rarely moves directly from buyer to perpetrator. It passes through clusters of intermediate wallets — sometimes dozens of them — each one designed to frustrate any attempt at correlation. In cases of this nature, the exact methodology of tracing these clusters is a core part of demonstrating blockchain analysis technique.\n\nThe Nightfall blockchain analysis model identified a pattern that had appeared in three previous extortion cases: a two-hop mixer structure followed by a staged withdrawal through a series of small-value transactions that avoided the automated monitoring thresholds of major exchanges. The first wallet in the chain — designated Wallet A in the analysis — had received three deposits totaling 2.471 XMR over the preceding 48 hours.\n\nFrom Wallet A, the funds passed through a mixer cluster that analysts had been passively observing since late June (14 intermediate addresses, 2.1-hour average hold per address). From that cluster, a portion moved into Wallet C, and from Wallet C into an operational account that had previously been linked to three criminal operators. The timing of the final transfer — 20:19:24 local time — aligned almost perfectly with M-17\'s first signal within a 47-second envelope.' },
      { id: 's4', title: 'THE DIGITAL TRAIL', type: 'text', body: 'The digital evidence spans multiple domains: forum metadata, connection logs, IP correlation fragments, and partial file-name references recovered from a compromised server located in an offshore data center (Designation DC-7). Each individual indicator, taken in isolation, means very little. Combined through cross-correlation and timelining, they form a chain of evidence that analysts could follow backward to a physical location.\n\nAt 22:11:02, a fragment of CCTV footage from a camera identified only as Node-0417 was recovered from a cloud storage account that the blockchain analysis had flagged. The footage was heavily degraded — fourteen seconds of grainy monochrome imagery captured from a high-angle interior view. What it showed was not the facility itself but a reflection in a polished stainless-steel cladding panel: a partial vehicle identification number (7 digits recovered with 82% confidence) visible through the open loading bay of what appeared to be an industrial building.\n\nThat fragment, combined with vehicle movement analysis from traffic-management databases in the surrounding region, allowed investigators to narrow the search radius by approximately 68%. By 23:41:18, analysts had raised their confidence in the location to a point where operational deployment could be authorized.' },
      { id: 's5', title: 'THE LOCATION', type: 'text', body: 'The facility selected by the operators was an abandoned materials-processing plant on the outskirts of an industrial zone in northern Europe. Built in 1994 and decommissioned in 2019, the site occupied approximately 4,200 square meters of floor space spread across three connected warehouse bays and a two-story administrative annex. A 2022 survey had flagged the building as structurally unsound in sections (23% of roof joists with water penetration), and the regional zoning authority had recorded three separate entries related to unauthorized trespassers during the preceding winter.\n\nFor investigative security reasons, the exact geographic coordinates are not provided. What matters is the process: how digital evidence was translated into a physical location, and how investigators verified each layer of correlation before committing personnel to the site.' },
      { id: 's6', title: 'THE ENTRY', type: 'text', body: 'The operational entry began at 00:46:11 local time. The team assigned to the facility moved in three elements: one to secure the perimeter (Entry Team 2, 8 personnel), one to make the building entry (6 personnel with 2 sniffer K9), and one to process any digital evidence found on site (Forensics Unit, Bay 1 — 4 imaging specialists). The operation was conducted under radio silence with a pre-arranged signal protocol.\n\nThe building entry route had been chosen based on the CCTV fragment and the floor plan from the 2022 survey. The team entered through the southwest loading bay — the same section partially visible in the reflection from Node-0417. Inside, they found what the intelligence had predicted: banked computer monitors (14 active displays, 3 of them still logged into encrypted chat clients), a portable broadcasting rig (OBS Studio 29.1.3 installed, custom Qt6 transmission controller visible), and the physical infrastructure necessary for a live transmission over encrypted channels.\n\nAt no point did the entry team encounter armed resistance. The emphasis of the operation was on speed, securing evidence, and locating the child.' },
      { id: 's7', title: 'THE RESCUE', type: 'text', body: 'The child was located at 00:51:42, five minutes and thirty-one seconds after the facility was secured. The individual was found in a locked room at the rear of Warehouse Bay 2, in the section of the building farthest from the point of entry. Medical staff accompanying the team conducted an initial assessment on site (7 minutes, pulse 121 at t=0, 97 at t=7) before the child was transported by ground ambulance to a receiving hospital with a law-enforcement escort of 2 vehicles.\n\nOut of respect for the ethical boundaries of investigating cases involving minors, no additional details are provided about the child\'s condition, appearance, or identity. What matters is the outcome: the rescue was effected before the scheduled broadcast could begin (broadcast scheduled for 01:00:00 local — 8 minutes 18 seconds after the rescue was confirmed). The transmission infrastructure was seized. The broadcast never reached its intended audience.\n\nAccording to the post-operation report prepared by the task force command staff, the operation concluded at 02:38:07. Evidence collection, cataloging, and chain-of-custody documentation continued for an additional fourteen hours and seventeen minutes.' },
      { id: 's8', title: 'WHAT HAPPENED NEXT', type: 'text', body: 'In the weeks following the operation, the digital evidence seized from the facility was processed by the forensics unit. Hard drive imaging (2.418 TB across 3 workstations), memory carving (19 RAM modules, 47 artifacts flagged by automated script), network log reconstruction, and the analysis of the broadcasting equipment produced 2.471 TB of evidentiary material. Four individuals were identified as connected to the planning of the operation and were taken into custody during a series of coordinated arrests carried out over a three-day window across 4 jurisdictions.\n\nFor the Nightfall Intelligence reconstruction, the value of this case is not in the details of who did what to whom. It is in the process: the integration of human intelligence from an undercover source with the disciplined application of blockchain analysis, metadata reconstruction, CCTV forensics, vehicle movement analysis, and operational planning. That integration — the weaving together of digital signal and human judgment against a running clock — is the core of modern cyber-investigation practice.' }
    ],
    evidenceIds: ['ev-cctv-0417', 'ev-wallet-cluster', 'ev-chat-fragment', 'ev-forensic-image-01', 'ev-broadcast-log', 'ev-redacted-doc-01'],
    threatActorIds: ['black-meridian', 'cinder-9'],
    relatedArticleIds: ['nf-2026-0715-bm', 'nf-2026-0801-nv', 'nf-2026-0622-uc', 'nf-2026-0710-sm'],
    timeline: [
      { time: '21:04:17', title: 'First intelligence received', description: 'Encrypted transmission from Source M-17 received at secure drop point. Verification phrase confirmed. Immediate escalation protocol initiated by night-shift analyst.' },
      { time: '21:37:02', title: 'Source confirms location parameters', description: 'Secondary transmission from M-17 provides six critical context fragments. Cross-referencing begins against 11 active case files with 148,204 indexed documents.' },
      { time: '22:11:02', title: 'Blockchain correlation completed', description: 'Wallet analysis identifies three-hop mixer chain: 214 linked addresses, 2.471 XMR traced. Timestamps aligned within 47-second envelope.' },
      { time: '23:02:18', title: 'CCTV fragment recovered', description: 'Node-0417 footage yields partial VIN reflection (7 digits, 82.4% confidence). Correlated against regional vehicle movement logs — 17 candidate vehicles winnowed to 3.' },
      { time: '23:41:18', title: 'Location confidence increased', description: 'Cross-verification of 4 independent data points raises location confidence to 92.4% — operational authorization threshold met.' },
      { time: '00:18:44', title: 'Investigation team deployed', description: 'Perimeter, entry, and forensics elements depart staging area, 22-minute ETA. Communications protocol switched to operational mode — radio silence with pre-arranged hand signals.' },
      { time: '00:46:11', title: 'Facility secured', description: 'Entry completed via southwest loading bay in 47 seconds. Transmission infrastructure and broadcasting rig located in Bay 1. OBS Studio running, start time 01:00 set.' },
      { time: '00:51:42', title: 'Child located safely', description: 'Individual found in locked room at rear of Bay 2. Medical assessment conducted on site; 121 bpm pulse at t=0.' },
      { time: '01:12:04', title: 'Evidence collection begins', description: 'Forensics element initiates imaging, chain-of-custody documentation, and scene photography. 14 USB write-blockers deployed simultaneously.' },
      { time: '02:38:07', title: 'Operation completed', description: 'Command element concludes on-site operations. Facility released to civilian authority. 159 evidence bags tagged and secured for transport.' }
    ]
  },
  {
    id: 'nf-2026-0715-bm',
    slug: 'black-meridian-marketplace-disappears',
    headline: 'BLACK MERIDIAN MARKETPLACE DISAPPEARS AFTER 19-MONTH OPERATION',
    subheadline: 'Underground marketplace Black Meridian went dark without warning at 20:47:12 on July 14, removing approximately 14,107 product listings and 2.137 TB of forum data overnight. 3 partner forums vanished within 72h.',
    category: 'cybercrime',
    caseId: 'NF-CASE-0715-BM',
    classification: 'UNCLASSIFIED · REPORTING',
    confidence: 88.3,
    status: 'ACTIVE',
    date: '15 July 2026',
    updated: '28 July 2026 — 18:04 UTC',
    readTime: 13,
    authorId: 'elias-ward',
    tags: ['Marketplace Exit', 'Dark Web Takedown', 'IronGate Mirror', '14,107 Listings', '2.137 TB Data Removed', 'Escrow Funds Unaccounted'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=dark%20server%20room%20racks%20with%20flickering%20lights%2C%20terminal%20screens%20showing%20error%20codes%20and%20disconnection%20messages%2C%20blurred%20camera%20perspective%2C%20cyberpunk%20industrial%20aesthetic%2C%20no%20people%2C%20security%20cameras&image_size=landscape_16_9',
    heroCaption: 'Server infrastructure, DC-7 — investigative reconstruction archive'
  },
  {
    id: 'nf-2026-0801-nl',
    slug: 'northstar-logistics-ransomware-claim',
    headline: 'RANSOMWARE GROUP CLAIMS ATTACK ON NORTHSTAR LOGISTICS',
    subheadline: 'Group operating under the name Cinder-9 has posted a claim of responsibility at 02:17:44 UTC for a network intrusion that disrupted 37 of 54 European freight depots for 11h 23m.',
    category: 'cybercrime',
    caseId: 'NF-CASE-0801-NL',
    classification: 'UNCLASSIFIED · REPORTING',
    confidence: 82.1,
    status: 'ACTIVE',
    date: '1 August 2026',
    updated: '5 August 2026 — 07:42 UTC',
    readTime: 9,
    authorId: 'nadia-cross',
    tags: ['Cinder-9 RaaS', 'Logistics Disruption', 'Steal-before-Encrypt', 'Shaming Domain Live', '1.217 TB Staged', 'Victim 7 in 30 Days'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=logistics%20warehouse%20at%20night%20with%20trucks%20parked%20outside%2C%20interior%20office%20computers%20showing%20red%20warning%20screens%20and%20error%20messages%2C%20fictional%20scenario%2C%20blurred%20silhouettes%2C%20dramatic%20lighting&image_size=landscape_16_9',
    heroCaption: 'Incident reconstruction, Depot-14 — archive image'
  },
  {
    id: 'nf-2026-0805-wc',
    slug: 'crypto-wallet-cluster-hidden-payment-network',
    headline: 'UNDERGROUND CRYPTO WALLET CLUSTER REVEALS HIDDEN PAYMENT NETWORK',
    subheadline: 'Blockchain analysis identifies a cluster of 214 linked wallets processing an estimated 47.381 XMR monthly across 6 criminal service categories. 2.1-hour average hop.',
    category: 'intelligence',
    caseId: 'NF-CASE-0805-WC',
    classification: 'UNCLASSIFIED · REPORTING',
    confidence: 91.6,
    status: 'ACTIVE',
    date: '5 August 2026',
    updated: '10 August 2026 — 22:19 UTC',
    readTime: 14,
    authorId: 'nadia-cross',
    tags: ['214 Address Cluster', 'Monero Chain', '3-Hop Mixer', '47.381 XMR/month', 'Cluster-207 Correlate', '17 Overlapping Nodes'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=abstract%20blockchain%20network%20visualization%2C%20nodes%20and%20connections%20glowing%20in%20dark%20red%20and%20amber%2C%20digital%20wallets%20represented%20as%20clusters%2C%20terminal%20ui%20overlay%2C%20dark%20background%2C%20cyber%20intelligence%20style&image_size=landscape_16_9',
    heroCaption: 'Wallet cluster 214 visualization — analysis model v2.4.1'
  },
  {
    id: 'nf-2026-0801-nv',
    slug: 'null-veil-returns-four-months',
    headline: 'THREAT ACTOR KNOWN AS "NULL VEIL" RETURNS AFTER FOUR MONTHS',
    subheadline: 'New indicators attributed to the threat actor Null Veil observed across 3 unrelated intrusion campaigns ending 121-day dormancy. Fingerprint match: 94.7% against historical cluster.',
    category: 'threat-actors',
    caseId: 'NF-CASE-0801-NV',
    classification: 'SENSITIVE · SOURCE ON FILE',
    confidence: 85.7,
    status: 'ACTIVE',
    date: '1 August 2026',
    updated: '7 August 2026 — 14:51 UTC',
    readTime: 10,
    authorId: 'elias-ward',
    tags: ['Null Veil APT', '121-Day Dormancy', '3 New Campaigns', '94.7% Fingerprint Match', 'DNS C2 TTP', 'Median Dwell 47 Days'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=abstract%20dark%20hooded%20silhouette%20made%20of%20digital%20particles%20and%20fragments%2C%20matrix%20style%20code%20rain%20in%20background%2C%20glowing%20red%20eyes%20abstract%2C%20mysterious%20threat%20actor%20representation%2C%20no%20real%20person&image_size=landscape_16_9',
    heroCaption: 'Abstract representation — threat actor profile, 6-10 operator estimate'
  },
  {
    id: 'nf-2026-0728-sf',
    slug: 'secret-server-farm-abandoned-data-facility',
    headline: 'SECRET SERVER FARM DISCOVERED INSIDE ABANDONED DATA FACILITY',
    subheadline: 'An anonymous tip (unsigned, 7 ZIP parts delivered to drop-box over 11 hours) led investigators to an underground server facility operating inside a decommissioned telecommunications building built 1987.',
    category: 'investigations',
    caseId: 'NF-CASE-0728-SF',
    classification: 'SENSITIVE · SOURCE ON FILE',
    confidence: 89.2,
    status: 'CLOSED',
    date: '28 July 2026',
    updated: '3 August 2026 — 11:07 UTC',
    readTime: 12,
    authorId: 'james-reed',
    tags: ['Hidden DC Basement-2', '187 Racks Active', '47 kW Metered Draw', '1987 Telco Building', 'Anonymous 7-Zip Tip', '4 Servers Tagged NV-APT'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=underground%20server%20room%20hacked%20into%20old%20abandoned%20building%20basement%2C%20exposed%20wiring%2C%20rack%20servers%20illuminated%20with%20blue%20LEDs%2C%20mysterious%20atmosphere%2C%20dust%2C%20concrete%20walls%2C%20no%20people&image_size=landscape_16_9',
    heroCaption: 'Server facility reconstruction — Basement-2 Telco-11 archive'
  },
  {
    id: 'nf-2026-0720-ai',
    slug: 'ai-generated-phishing-european-businesses',
    headline: 'AI-GENERATED PHISHING CAMPAIGN TARGETS EUROPEAN BUSINESSES',
    subheadline: 'Research identifies a new wave of synthetically generated spear-phishing emails using context-aware personalization pulled from 14-month scraped LinkedIn post history. Open rate 17.4% vs industry 3.1%.',
    category: 'cybercrime',
    caseId: 'NF-CASE-0720-AI',
    classification: 'UNCLASSIFIED · REPORTING',
    confidence: 86.4,
    status: 'ACTIVE',
    date: '20 July 2026',
    updated: '26 July 2026 — 09:33 UTC',
    readTime: 8,
    authorId: 'nadia-cross',
    tags: ['Synthetic Voice+Email', '14-Month OSINT Scraping', '17.4% Open Rate', '3,847 Targets EU-19', 'CFO/HR Personas Only', 'Signed-Stolen Cert'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=email%20inbox%20on%20multiple%20screens%20with%20fake%20phishing%20messages%20highlighted%20in%20red%2C%20warning%20icons%2C%20artificial%20intelligence%20network%20nodes%20in%20background%2C%20dark%20soc%20style%2C%20no%20people&image_size=landscape_16_9',
    heroCaption: 'Phishing campaign visualization — 3,847 targets EU-19 analysis'
  },
  {
    id: 'nf-2026-0718-cc',
    slug: 'new-command-and-control-pattern',
    headline: 'NIGHTFALL RESEARCHERS IDENTIFY NEW COMMAND-AND-CONTROL PATTERN',
    subheadline: 'Recurring beacon interval anomaly (14s→17s shift, jitter +38%) observed across 47 victim networks maps to previously undocumented C2 protocol. Packet size 892 bytes ± 3. Signature v8.14 flagging 2 streams.',
    category: 'intelligence',
    caseId: 'NF-CASE-0718-CC',
    classification: 'UNCLASSIFIED · REPORTING',
    confidence: 90.6,
    status: 'ACTIVE',
    date: '18 July 2026',
    updated: '24 July 2026 — 16:28 UTC',
    readTime: 14,
    authorId: 'elias-ward',
    tags: ['Beacon Jitter +38%', '47 Networks Hit', '892-byte Packet', 'New Proto-NF-71', 'IDS v8.14 Rules', 'Signature Released'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cybersecurity%20network%20map%20visualization%2C%20beacon%20nodes%20flashing%20red%20across%20world%20map%2C%20connections%20to%20central%20command%20server%2C%20dark%20soc%20console%20style%2C%20data%20packets%20flowing%2C%20no%20people&image_size=landscape_16_9',
    heroCaption: 'C2 network visualization — 47 nodes, Proto-NF-71'
  },
  {
    id: 'nf-2026-0622-uc',
    slug: 'three-dark-web-forums-vanish-72-hours',
    headline: 'THREE DARK-WEB FORUMS VANISH WITHIN 72 HOURS',
    subheadline: 'IronGate (11:04:17), VoidMarket (17:22:42 next day), ShadowArchive (08:18:03 day 3) all went offline in narrow window — 42,718 userbase total, 2 admins shared across all 3.',
    category: 'leaks',
    caseId: 'NF-CASE-0622-UC',
    classification: 'UNCLASSIFIED · REPORTING',
    confidence: 83.9,
    status: 'ARCHIVED',
    date: '22 June 2026',
    updated: '10 July 2026 — 05:49 UTC',
    readTime: 9,
    authorId: 'mara-voss',
    tags: ['3-Forum Takedown', 'IronGate+VoidMarket+ShadowArchive', '42,718 Total Users', '2 Shared Admins', '18% Backup Dump Circulating', '68.3% Confidence Mirror'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=three%20broken%20computer%20screens%20showing%20site%20offline%20messages%2C%20404%20error%20pages%20onion%20links%20scratched%20out%2C%20dark%20alley%20background%20with%20neon%20reflection%2C%20blurred%20style%2C%20no%20people&image_size=landscape_16_9',
    heroCaption: 'Forum shutdown reconstruction — 72h window, 3 sites'
  },
  {
    id: 'nf-2026-0615-ma',
    slug: 'underground-market-admin-digital-trail',
    headline: 'UNDERGROUND MARKET ADMINISTRATOR LEAVES DIGITAL TRAIL',
    subheadline: 'An operational security lapse (same custom JS snippet loaded 2 sites 33ms apart) allows researchers to correlate forum administrator activity with 3 previously unlinked accounts spanning 22 months.',
    category: 'evidence',
    caseId: 'NF-CASE-0615-MA',
    classification: 'EVIDENCE · CHAIN OF CUSTODY',
    confidence: 81.4,
    status: 'ACTIVE',
    date: '15 June 2026',
    updated: '30 June 2026 — 21:02 UTC',
    readTime: 11,
    authorId: 'james-reed',
    tags: ['OPSEC Self-Own', '3 Admin Accounts Linked', 'Custom JS Snippet Match', '22-Month Span', '13 Posting Patterns', 'Admin Panel Leak 4.2MB'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=hacker%20desk%20top%20view%20with%20multiple%20laptop%20screens%20showing%20forum%20admin%20panels%2C%20glowing%20green%20terminal%20text%2C%20scattered%20notes%2C%20dark%20moody%20lighting%2C%20no%20faces%2C%20silhouette%20from%20behind&image_size=landscape_16_9',
    heroCaption: 'Admin workstation reconstruction — 6 panels observed archive'
  },
  {
    id: 'nf-2026-0730-tc',
    slug: 'crypto-cluster-extortion-campaign',
    headline: 'CRYPTO TRANSACTION CLUSTER CONNECTED TO EXTORTION CAMPAIGN',
    subheadline: 'Wallet correlation links 78 separate ransom payments (all under 0.079 BTC, avg 0.0413) to single family of operators. Time-between-payments: 41h 17m median, 237h max.',
    category: 'evidence',
    caseId: 'NF-CASE-0730-TC',
    classification: 'EVIDENCE · CHAIN OF CUSTODY',
    confidence: 87.3,
    status: 'ACTIVE',
    date: '30 July 2026',
    updated: '6 August 2026 — 12:55 UTC',
    readTime: 10,
    authorId: 'nadia-cross',
    tags: ['78 Payments', 'All <0.079 BTC', '41h 17m Median Gap', 'Cinder-9 / Echo Split', 'Affiliate 65/35 Split', 'Op-14 Tagged Invoices'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=bitcoin%20blockchain%20visualization%20with%20transaction%20nodes%20all%20leading%20to%20single%20red%20cluster%2C%20hacker%20extortion%20note%20partially%20visible%2C%20dark%20table%20surface%2C%20no%20people&image_size=landscape_16_9',
    heroCaption: 'Transaction cluster analysis — 78 payments, avg 0.0413 BTC'
  },
  {
    id: 'nf-2026-0710-sm',
    slug: 'operation-silent-mirror-final-phase',
    headline: 'OPERATION SILENT MIRROR ENTERS FINAL INVESTIGATION PHASE',
    subheadline: 'Nineteen-month undercover operation transitions from intelligence gathering to evidence sequestration across 5 jurisdictions. 42 sealed indictments drafted, 118 additional named persons of interest.',
    category: 'investigations',
    caseId: 'NF-CASE-0710-SM',
    classification: 'SENSITIVE · SOURCE ON FILE',
    confidence: 92.4,
    status: 'ACTIVE',
    date: '10 July 2026',
    updated: '5 August 2026 — 02:31 UTC',
    readTime: 15,
    authorId: 'mara-voss',
    tags: ['19-Month Deep Cover', '5 Jurisdiction Coordination', '42 Draft Indictments', '118 Persons Of Interest', 'Source M-22 Confirmed', '1.18 TB Logs Seized'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=federal%20investigators%20in%20unmarked%20vehicles%20at%20dusk%20outside%20an%20industrial%20building%2C%20binoculars%20laptop%20inside%20vehicle%2C%20surveillance%20photography%20style%2C%20silhouettes%2C%20no%20identifiable%20faces&image_size=landscape_16_9',
    heroCaption: 'Surveillance operation archive — 5 vehicle stakeout'
  },
  {
    id: 'nf-2026-0708-as',
    slug: 'anonymous-source-black-meridian-data',
    headline: 'ANONYMOUS SOURCE PROVIDES NEW DATA TO BLACK MERIDIAN TASK FORCE',
    subheadline: 'Encrypted package delivered to task force drop box (7 USB drives labeled only with 6-digit hex sticker) contains 1.318 GB of structured operational data: vendor rosters, escrow logs, dispute resolution transcripts.',
    category: 'intelligence',
    caseId: 'NF-CASE-0708-AS',
    classification: 'SENSITIVE · SOURCE ON FILE',
    confidence: 78.3,
    status: 'PENDING REVIEW',
    date: '8 July 2026',
    updated: '19 July 2026 — 17:44 UTC',
    readTime: 7,
    authorId: 'james-reed',
    tags: ['7 USB Hex-Stickered', '1.318 GB Data', 'Vendor Roster 140-180', 'Escrow Ledger 14 Months', 'Dispute Transcripts 284', '3-Pass Redaction In Progress'],
    heroImage: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=encrypted%20usb%20drive%20and%20laptop%20with%20decryption%20interface%20on%20screen%2C%20dark%20evidence%20room%2C%20chain%20of%20custody%20form%20on%20desk%2C%20dim%20amber%20lighting%2C%20gloved%20hands%20no%20face&image_size=landscape_16_9',
    heroCaption: 'Evidence receipt archive — 7 hex-stickered USB drops'
  }
]

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id || a.slug === id)
}

export function getFeaturedArticle(): Article {
  return articles[0]
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(a => a.category === category)
}
