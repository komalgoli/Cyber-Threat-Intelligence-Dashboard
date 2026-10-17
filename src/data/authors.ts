export interface Author {
  id: string
  name: string
  title: string
  bio: string
  handle: string
}

export const authors: Author[] = [
  {
    id: 'mara-voss',
    name: 'Mara Voss',
    title: 'Senior Investigative Correspondent',
    bio: 'Covers complex cybercrime investigations, underground networks, and intelligence operations. Former analyst with Sentinel Cyber Division — 11 years field experience across 4 jurisdictions.',
    handle: '@mvoss.nf'
  },
  {
    id: 'elias-ward',
    name: 'Elias Ward',
    title: 'Cyber Threat Researcher',
    bio: 'Specializes in threat actor profiling, malware analysis, and dark-web ecosystem mapping. Researcher with Orion Intelligence Group. Maintains the "Warden" actor-cluster taxonomy used internally.',
    handle: '@eward.orion'
  },
  {
    id: 'nadia-cross',
    name: 'Nadia Cross',
    title: 'Digital Forensics Analyst',
    bio: 'Leads digital evidence reconstruction, blockchain analysis, and metadata forensics for Nightfall investigations. Certified blockchain investigator (CBI-II) with 64 case reconstructions on record.',
    handle: '@ncross.dfa'
  },
  {
    id: 'james-reed',
    name: 'James Reed',
    title: 'Intelligence Editor',
    bio: 'Oversees source verification, cross-agency intelligence coordination, and operational security protocols. Desk chief for the Black Meridian task force liaison channel.',
    handle: '@jreed.intel'
  }
]
