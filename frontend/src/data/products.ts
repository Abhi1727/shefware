export type ProductCategoryId = 'office365' | 'tenant' | 'email-conversion' | 'cloud-backup'

export type ProductSlug =
  | 'ost-to-pst-converter'
  | 'office-365-to-365'
  | 'imap-backup'
  | 'mbox-to-pst'
  | 'eml-viewer'
  | 'ost-viewer'
  | 'eml-to-pdf'

export type Product = {
  slug: ProductSlug
  listTitle: string
  pageTitle: string
  tagline: string
  description: string
  categories: ProductCategoryId[]
  /** Shown on marketplace cards */
  priceLabel: string
  ratingLabel: string
  /** Primary action */
  liveUrl?: string
  liveCtaLabel?: string
  features: string[]
  figmaNodeRef: string
}

export const PRODUCT_SLUGS: ProductSlug[] = [
  'ost-to-pst-converter',
  'office-365-to-365',
  'imap-backup',
  'mbox-to-pst',
  'eml-viewer',
  'ost-viewer',
  'eml-to-pdf',
]

export const PRODUCT_CATEGORIES: {
  id: ProductCategoryId
  label: string
  shortLabel: string
}[] = [
  { id: 'office365', label: 'Office 365 Migration', shortLabel: 'Office 365' },
  { id: 'tenant', label: 'Tenant Migration', shortLabel: 'Tenant' },
  { id: 'email-conversion', label: 'Email Conversion', shortLabel: 'Conversion' },
  { id: 'cloud-backup', label: 'Cloud Backup', shortLabel: 'Backup' },
]

export const PRODUCTS: Record<ProductSlug, Product> = {
  'ost-to-pst-converter': {
    slug: 'ost-to-pst-converter',
    listTitle: 'OST to PST Converter',
    pageTitle: 'Shefware OST to PST Converter',
    tagline: 'Recover Outlook data from orphaned or disconnected OST files.',
    description:
      'Convert Outlook OST files to PST for backup, migration, or legal discovery—without connecting to the original mailbox.',
    categories: ['email-conversion'],
    priceLabel: '$34.00 / license',
    ratingLabel: 'Trusted by IT teams',
    liveUrl: 'https://osttopst.us',
    liveCtaLabel: 'Open live tool',
    features: [
      'Large-file friendly processing with clear progress',
      'Preserves mail, calendar, contacts, and folder hierarchy where supported',
      'Built for helpdesk and migration scenarios—not a toy utility',
    ],
    figmaNodeRef: '229:1312',
  },
  'office-365-to-365': {
    slug: 'office-365-to-365',
    listTitle: 'Office 365 to Microsoft 365',
    pageTitle: 'Shefware Office 365 to 365',
    tagline: 'Tenant and mailbox moves with operational guardrails.',
    description:
      'Plan and execute Microsoft 365 tenant and mailbox migrations with repeatable steps, validation, and rollback-minded workflows.',
    categories: ['office365', 'tenant'],
    priceLabel: '$49.00 / license',
    ratingLabel: 'Enterprise rollouts',
    features: [
      'Mailbox and workload scope planning',
      'Batching and scheduling for controlled cutovers',
      'Reporting hooks for stakeholders and audit trails',
    ],
    figmaNodeRef: '432:453',
  },
  'imap-backup': {
    slug: 'imap-backup',
    listTitle: 'IMAP Backup',
    pageTitle: 'Shefware IMAP Backup',
    tagline: 'Continuous, policy-aligned mailbox archives.',
    description:
      'Back up IMAP mailboxes to durable storage with retention-aware policies and restore paths your security team can stand behind.',
    categories: ['cloud-backup'],
    priceLabel: '$19.99 / month',
    ratingLabel: 'Mailbox protection',
    features: [
      'Incremental sync to reduce bandwidth and time',
      'Folder-level fidelity and attachment handling',
      'Designed for compliance-minded organizations',
    ],
    figmaNodeRef: '399:491',
  },
  'mbox-to-pst': {
    slug: 'mbox-to-pst',
    listTitle: 'MBOX to PST',
    pageTitle: 'Shefware MBOX to PST',
    tagline: 'Bring Thunderbird, Apple Mail, and Google Takeout into Outlook.',
    description:
      'Migrate MBOX archives into PST for unified Outlook operations, discovery, and long-term retention on Microsoft platforms.',
    categories: ['email-conversion'],
    priceLabel: 'Contact for quote',
    ratingLabel: 'Cross-platform moves',
    features: [
      'Handles common MBOX variants from desktop clients',
      'Mapping to Outlook folders with preview checkpoints',
      'Suited to user cutovers and bulk IT migrations',
    ],
    figmaNodeRef: '435:1903',
  },
  'eml-viewer': {
    slug: 'eml-viewer',
    listTitle: 'EML Viewer',
    pageTitle: 'Shefware EML Viewer',
    tagline: 'Inspect EML messages without risky double-click defaults.',
    description:
      'Open and review .eml files in a dedicated viewer with metadata, headers, and body rendering tuned for support and forensics.',
    categories: ['email-conversion'],
    priceLabel: 'Contact for quote',
    ratingLabel: 'Support & review',
    features: [
      'Header and MIME structure visibility',
      'Attachment preview where safe',
      'Lightweight install for deskside teams',
    ],
    figmaNodeRef: '494:214',
  },
  'ost-viewer': {
    slug: 'ost-viewer',
    listTitle: 'OST Viewer',
    pageTitle: 'Shefware OST Viewer',
    tagline: 'Read-only access to OST contents before conversion.',
    description:
      'Validate contents, counts, and folder integrity inside OST files prior to PST export or escalation to advanced recovery.',
    categories: ['email-conversion'],
    priceLabel: 'Contact for quote',
    ratingLabel: 'Pre-migration QA',
    features: [
      'Non-destructive browsing of OST structure',
      'Sampling views for large stores',
      'Pairs naturally with the OST to PST Converter',
    ],
    figmaNodeRef: '503:2138',
  },
  'eml-to-pdf': {
    slug: 'eml-to-pdf',
    listTitle: 'EML to PDF',
    pageTitle: 'Shefware EML to PDF',
    tagline: 'Archival-friendly rendering for legal and records teams.',
    description:
      'Batch-render EML messages to PDF with consistent pagination, headers, and attachment handling policies you can standardize.',
    categories: ['email-conversion'],
    priceLabel: 'Contact for quote',
    ratingLabel: 'Records & eDiscovery',
    features: [
      'Batch conversion with naming conventions',
      'Printable layouts for downstream review',
      'Automation-friendly for service desks',
    ],
    figmaNodeRef: '509:3687',
  },
}

export function isProductSlug(value: string): value is ProductSlug {
  return (PRODUCT_SLUGS as string[]).includes(value)
}

export function getProduct(slug: string): Product | undefined {
  return isProductSlug(slug) ? PRODUCTS[slug] : undefined
}
