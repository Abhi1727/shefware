import type { ServiceHeroBannerKey } from './servicePageAssets'
import type { BentoIconKey, ProcessIconKey, SecurityIconKey } from './servicePageIcons'

export type BentoTitleSegment = { text: string; variant: 'default' | 'accent' | 'accentBlock' }

export interface ServicePageConfig {
  slug: string
  listTitle: string
  listDescription: string
  hero: { title: string; subtitle: string; body: string }
  metrics: { v1: string; l1: string; v2: string; l2: string; v3: string; l3: string }
  benefits: { sectionTitle: string; items: readonly string[] }
  heroBannerKey: ServiceHeroBannerKey
  process: {
    title: string
    subtitle: string
    steps: readonly { title: string; body: string; icon: ProcessIconKey }[]
  }
  bento: {
    title: readonly BentoTitleSegment[]
    subtitle: string
    cards: readonly { title: string; body: string; icon: BentoIconKey; offset: string }[]
  }
  security: {
    line1: string
    line2?: string
    subtitle: string
    cards: readonly { title: string; body: string; icon: SecurityIconKey }[]
  }
  complianceBody: string
}

const STANDARD_BENTO_CARDS: ServicePageConfig['bento']['cards'] = [
  {
    title: 'End-to-End Migration',
    body: 'From the starting assessment to the outcome, Shefware handles the full migration cycle. We start with an analysis of the environment and planning, which is followed by safe and secure data transfer, configuration, and verification.',
    icon: 'arrows',
    offset: 'lg:top-0',
  },
  {
    title: 'Vast User Migration',
    body: 'Smoothly move several user accounts in one function with the help of our automatic migration method. We manage user mapping, creation of mailboxes, and effective data transfer, which saves time.',
    icon: 'users',
    offset: 'lg:top-16',
  },
  {
    title: 'Staged and Hybrid Migration',
    body: 'To reduce the time and functional impact, we offer staged and hybrid migration methods. This permits to move data in different levels while users continue to work.',
    icon: 'nodes',
    offset: 'lg:-top-6',
  },
  {
    title: 'Permission and Access',
    body: 'We protect file sharing settings, user roles, and access permissions through the process of migration. All the information and control are retained to make sure users have the same level of access in the fresh environment.',
    icon: 'lock',
    offset: 'lg:top-8',
  },
] as const

const CLOUD_BENTO_CARDS: ServicePageConfig['bento']['cards'] = [
  {
    title: 'End-to-End Backup',
    body: 'From discovery through scheduling and verification, Shefware manages the full backup lifecycle so mailbox data stays recoverable and audit-ready.',
    icon: 'arrows',
    offset: 'lg:top-0',
  },
  {
    title: 'Large-Scale Mailboxes',
    body: 'Run high-volume backups without sacrificing fidelity—ideal for enterprise tenants and long retention archives.',
    icon: 'users',
    offset: 'lg:top-16',
  },
  {
    title: 'Incremental & Scheduled Jobs',
    body: 'Stage backups over time and align runs with maintenance windows so daily operations stay uninterrupted.',
    icon: 'nodes',
    offset: 'lg:-top-6',
  },
  {
    title: 'Access & Retention Controls',
    body: 'Preserve permissions, sharing, and policy boundaries so backed-up data mirrors how your organization governs production mail.',
    icon: 'lock',
    offset: 'lg:top-8',
  },
] as const

const OFFICE_PROCESS_STEPS: ServicePageConfig['process']['steps'] = [
  {
    title: 'Staged Migration',
    body: 'Our Staged Migration is known to transfer the mails from on- premises Exchange to Exchange Online, which is ideal for Medium- to-Large organizations. Users need to identify and arrange them, and further migrate in arrays via Microsoft 365.',
    icon: 'chart',
  },
  {
    title: 'Express (Cutover) Migration',
    body: 'We provide Express Migration, also known as Cutover Migration, is a quick and simple method in which the organization migrates all the emails and data at once in a single phase.',
    icon: 'gear',
  },
  {
    title: 'Hybrid Deployment',
    body: 'Hybrid Deployment is an ideal blend of both the old system and the cloud system used together. Our Service allows users to continue working on their old-premise service and start working on Microsoft 365.',
    icon: 'sync',
  },
  {
    title: 'IMAP & Cloud Connectivity',
    body: 'Shefware Internet Message Access Protocol is an easy way to keep all the mail, contacts, and other data on the mail server, which allows users to access the same data with flexibility.',
    icon: 'shield',
  },
] as const

const OFFICE_SECURITY: ServicePageConfig['security']['cards'] = [
  {
    title: 'Regular checking',
    body: 'We monitor migration activities to detect and save from any security risks.',
    icon: 'shield',
  },
  {
    title: 'No Data Retention Policy',
    body: 'Shefware does not hold any individual data after the full migration process.',
    icon: 'server',
  },
  {
    title: 'API Based Migration Environment',
    body: 'Enables safe and secure APIs and data transfer between platforms.',
    icon: 'cloud',
  },
  {
    title: 'Encrypted Data',
    body: 'We utilizes safe and secure protocols to save data during migration between the source and place.',
    icon: 'mfa',
  },
  {
    title: 'Role-Based Grants Access',
    body: 'We give access as per the user roles to manage data security strictly.',
    icon: 'role',
  },
  {
    title: 'Verification Checks',
    body: 'Shefware makes sure transferred data is full and unchanges via the process of validation.',
    icon: 'badge',
  },
] as const

const GW_SECURITY: ServicePageConfig['security']['cards'] = [
  {
    title: 'End-to-End Encryption',
    body: 'All migration data is protected with strong end-to-end encryption to ensure secure transfer.',
    icon: 'shield',
  },
  {
    title: 'Temporary Data Storage',
    body: 'Data is temporarily stored in a protected environment and automatically deleted after migration.',
    icon: 'server',
  },
  {
    title: 'Safe and Secure Cloud Environment',
    body: 'The migration process runs in a protected cloud infrastructure designed to keep your data safe.',
    icon: 'cloud',
  },
  {
    title: 'Multiple Factor Authentication',
    body: 'Includes a multiple verification layer for safe access and identity protection.',
    icon: 'mfa',
  },
  {
    title: 'Role-Based Access Control',
    body: "Gave data access as per the user's role, ensuring strict permissions management.",
    icon: 'role',
  },
  {
    title: 'Data Assurity',
    body: 'Make sure data stays accurate and consistent throughout the entire migration process.',
    icon: 'badge',
  },
] as const

export const SERVICE_PAGE_ORDER = [
  'google-workspace-to-microsoft-365-migration',
  'email-conversion',
  'office-365-migration',
  'tenant-to-tenant-migration',
  'cloud-backup',
  'teams-migration',
] as const

export type ServicePageSlug = (typeof SERVICE_PAGE_ORDER)[number]

export const SERVICE_PAGES: Record<ServicePageSlug, ServicePageConfig> = {
  'google-workspace-to-microsoft-365-migration': {
    slug: 'google-workspace-to-microsoft-365-migration',
    listTitle: 'Google Workspace to Microsoft 365 Migration',
    listDescription: 'Emails, calendars, contacts, and files — migrated safely with zero data loss.',
    hero: {
      title: 'Google Workspace to Microsoft 365 Migration',
      subtitle: 'Migrate Business Emails, Data & Collaboration',
      body: 'Shefware offers professional Google Workspace to Microsoft 365 Migration Services built for all sizes of businesses. Transfer your emails, calendars, contacts, and files safely from Google Workspace to Microsoft 365 without any loss of data.',
    },
    metrics: {
      v1: '15000+',
      l1: 'Successful Migration',
      v2: '99%',
      l2: 'Data Accuracy',
      v3: '24x7',
      l3: 'Customer Support',
    },
    benefits: {
      sectionTitle: 'Key Benefits of Our Google Workspace Migration Service',
      items: [
        'Automatically map user accounts and give licenses in Microsoft 365, limiting the effort and errors.',
        'Moves emails, files, contacts, calendars, and shared drives without any data loss.',
        'Transfer updated and altered data after the beginning of the migration to keep everything updated.',
        'Permits flexible scheduling containing non-working hours to reduce business interruption.',
        'Our solution offers migration to different workloads containing Gmail, Google Drive, Contacts, Calendars, and shared drives as well. This ensures that nothing is left behind during the change',
        'We give a delta migration, which means only updated data is moved after the beginning of the migration. This keeps the data updated without re-running the overall work process.',
        'Preserve original folder structure, metadata, read/unread status, and rich text formatting.',
        'Split large resultant PST files into smaller parts (e.g., 2GB, 5GB, 10GB) for better management.',
      ],
    },
    heroBannerKey: 'heroBannerGoogleWorkspace',
    process: {
      title: 'Our Google Workspace Migration Process',
      subtitle:
        'A structured, architectural approach to moving your enterprise data with zero friction and maximum integrity.',
      steps: [
        {
          title: '1. Assessment and Planning',
          body: 'We analyze your Google Workspace environment and create a personalized migration plan.',
          icon: 'chart',
        },
        {
          title: '2. Setup and Configure',
          body: 'We configure the Microsoft 365 environment, user accounts, and permissions.',
          icon: 'gear',
        },
        {
          title: '3. Executing Migration',
          body: 'All the data is moved safely with checking and tracking.',
          icon: 'sync',
        },
        {
          title: '4. Validating and Support',
          body: 'We verify the accuracy of data and offer after-migration help.',
          icon: 'shield',
        },
      ],
    },
    bento: {
      title: [
        { text: 'Our Complete ', variant: 'default' },
        { text: 'Migration', variant: 'accent' },
        { text: 'Services', variant: 'accentBlock' },
      ],
      subtitle:
        'Experience an architectural approach to data sovereignty. Our orchestrated migration journey ensures zero-loss transitions for global enterprise ecosystems.',
      cards: STANDARD_BENTO_CARDS,
    },
    security: {
      line1: 'Secure and Reliable Google',
      line2: 'Workspace Migration',
      subtitle:
        "Your Google Workspace migration data security is our top priority. We employ multi-layered protection protocols to ensure your organization's transition is seamless and ironclad.",
      cards: GW_SECURITY,
    },
    complianceBody:
      'Our migration platform adheres to global security certifications including SOC2 Type II, GDPR, and HIPAA compliance to ensure your transition meets legal and professional standards.',
  },

  'email-conversion': {
    slug: 'email-conversion',
    listTitle: 'Email conversion',
    listDescription: 'Convert and migrate mailbox data across formats and platforms with accuracy and security.',
    hero: {
      title: 'Shefware Email Conversion Services',
      subtitle: 'Convert, Migrate, and Manage your Email Data Smoothly',
      body: 'Shefware provides expertise in Email Conversion Services built for businesses and individual users. Easily convert and migrate email data on various platforms and formats. From smooth file conversions to difficult enterprise migrations, our solutions make sure the accuracy, security, and no data loss.',
    },
    metrics: {
      v1: '15000+',
      l1: 'Successful Migration',
      v2: '99%',
      l2: 'Data Accuracy',
      v3: '24x7',
      l3: 'Customer Support',
    },
    benefits: {
      sectionTitle: 'Key Benefits of Our Email Conversion Service',
      items: [
        'Upgraded conversion process makes sure every email, attachment, and information gets transferred precisely.',
        'All the formats, attachments, and data are protected, managing the authenticity of email data.',
        'Keeps the authentic mailbox folder sequence the same, makes sure email stays well-organized and simple to direct.',
        'Smoothly compatible with Outlook, Microsoft 365, Exchange, and IMAP Servers for cross-platform email conversion.',
        'Fast Speed working and effectively manages a huge volume of data.',
        'A simple and user-friendly interface permits anyone to perform email conversions without any technical knowledge.',
      ],
    },
    heroBannerKey: 'heroBannerEmailConversion',
    process: {
      title: 'Shefware Core Email Conversion Services',
      subtitle: 'Everything you need is placed in one place.',
      steps: [
        {
          title: '1. OST to PST Converter',
          body: 'Our service helps you convert OST files to PST format with full accuracy. We repair and recover damaged Outlook data. It is suitable for Outlook recovery, migration, and backup.',
          icon: 'chart',
        },
        {
          title: '2. Multiple Email Format Conversion',
          body: 'We separate the format constraints and work across different platforms effectively. Conversion between PST, EML, PDF, MBOX, HTML, TXT Manage formatting, metadata, and attachments Batch conversion for numerous files.',
          icon: 'gear',
        },
        {
          title: '3. Huge Email Conversion',
          body: 'Managing the email data of one file at a time is time-consuming. So, our huge email conversion is built to process several email files and mailboxes in one function. Our tool reduces the manual work and saves your time.',
          icon: 'sync',
        },
        {
          title: '4. Supports Cloud Migration',
          body: 'Transfer your emails wherever your business needs, including modern and updated platforms. Our services cover Office 365 migration, Gmail migration, and all IMAP-related migrations, ensuring a smooth and reliable transition.',
          icon: 'shield',
        },
      ],
    },
    bento: {
      title: [
        { text: 'Our Smart Email ', variant: 'default' },
        { text: 'Conversion Process', variant: 'accent' },
      ],
      subtitle: 'We have built a smooth and effective workflow for all users.',
      cards: [
        {
          title: 'Add Your File',
          body: 'Upload and select your email data from the system to start the conversion process.',
          icon: 'arrows',
          offset: 'lg:top-0',
        },
        {
          title: 'Scan and Preview',
          body: 'The system analyzes the mailbox and permits previewing emails and formatting before beginning.',
          icon: 'users',
          offset: 'lg:top-16',
        },
        {
          title: 'Select the Product',
          body: 'Select a suitable format as per your needs for smooth compatibility and usage.',
          icon: 'nodes',
          offset: 'lg:-top-6',
        },
        {
          title: 'Convert and Access',
          body: 'Now, you can download and migrate data quickly without any kind of delay.',
          icon: 'lock',
          offset: 'lg:top-8',
        },
      ],
    },
    security: {
      line1: 'Secure and Reliable Email Conversion',
      subtitle: 'Your Email data security is our top priority.',
      cards: [
        {
          title: 'Encryption at every stage',
          body: 'Files are encrypted at every stage of processing.',
          icon: 'shield',
        },
        {
          title: 'Temporary secure storage',
          body: 'Data gets stored temporarily and is permanently deleted after the process.',
          icon: 'server',
        },
        {
          title: 'Isolated conversion environment',
          body: 'Conversion takes place in a safe and isolated environment.',
          icon: 'cloud',
        },
        {
          title: 'End-to-End Data Protection',
          body: 'We make sure about the confidentiality of all data.',
          icon: 'mfa',
        },
        {
          title: 'Third Party not Accessible',
          body: 'No data sharing and third-party access at any point.',
          icon: 'role',
        },
        {
          title: 'Follows rules with security standards',
          body: 'Developed on trustworthy industry-standard security practices.',
          icon: 'badge',
        },
      ],
    },
    complianceBody:
      'Our conversion platform adheres to global security certifications including SOC2 Type II, GDPR, and HIPAA compliance to ensure your transition meets legal and professional standards.',
  },

  'office-365-migration': {
    slug: 'office-365-migration',
    listTitle: 'Office 365 migration',
    listDescription: 'Move mail, calendars, and identities into Microsoft 365 with proven migration paths.',
    hero: {
      title: 'Shefware Office 365 Migration Services',
      subtitle: 'Safe, Backup, and Protect Your Email Data Effectively',
      body: 'Shefware Office 365 Migration tool enables users to conveniently move emails, contacts, calendars, and user accounts from their active systems to new accounts on platforms such as Microsoft Outlook and Office 365. Our Service not only safeguards important data but also improves productivity and boosts the business’s growth.',
    },
    metrics: {
      v1: '15000+',
      l1: 'Successful Migration',
      v2: '99%',
      l2: 'Data Accuracy',
      v3: '24x7',
      l3: 'Customer Support',
    },
    benefits: {
      sectionTitle: 'Key Benefits of Our Office 365 Migration Service',
      items: [
        'Shefware Office 365 Migration ensures data such as emails, files, contacts, and calendars are moved safely and securely.',
        'We have created a space for all kinds of business operations with fewer frequent service interruptions.',
        'We ensure that the whole migration process helps in safeguarding the user data from any unauthorized users and malware risks.',
        'Shefware Office 365 Migration has ensured that the organizations can reduce the operations and license costs by centralizing one account.',
        'Our service has supported all kinds of organizations that can now easily scale the user base by increasing or decreasing the staff.',
      ],
    },
    heroBannerKey: 'heroBannerOffice365',
    process: {
      title: 'Shefware Core Office 365 Migration Services',
      subtitle:
        'Choose the path that fits your organization—from staged batches to express cutover, hybrid coexistence, and IMAP-connected mail.',
      steps: OFFICE_PROCESS_STEPS,
    },
    bento: {
      title: [
        { text: 'How Shefware Office 365 ', variant: 'default' },
        { text: 'Migration Works', variant: 'accentBlock' },
      ],
      subtitle:
        'From discovery through cutover, Shefware orchestrates each phase with clear ownership and zero-loss transfer.',
      cards: STANDARD_BENTO_CARDS,
    },
    security: {
      line1: 'Secure and Reliable Office 365 Migration',
      subtitle: 'Your Email data security is our top priority.',
      cards: OFFICE_SECURITY,
    },
    complianceBody:
      'Our migration platform adheres to global security certifications including SOC2 Type II, GDPR, and HIPAA compliance to ensure your transition meets legal and professional standards.',
  },

  'tenant-to-tenant-migration': {
    slug: 'tenant-to-tenant-migration',
    listTitle: 'Tenant to tenant migration',
    listDescription:
      'Consolidate Microsoft 365 tenants after M&A, divestitures, or rebranding—with mail, files, and Teams in scope.',
    hero: {
      title: 'Shefware Tenant to Tenant Migration Office 365 Service',
      subtitle: 'Seamless Transfer of your digital workspace',
      body: 'Shefware Tenant to Tenant Migration or Office 365 Migration to Office 365 Migration is the process of transferring mailboxes, files, users, and Teams from one Microsoft 365 Tenant to another Microsoft 365 Tenant. The common reasons the organization does Tenant-to-Tenant Migration include mergers & acquisitions, divestitures, and rebranding the company.',
    },
    metrics: {
      v1: '15000+',
      l1: 'Successful Migration',
      v2: '99%',
      l2: 'Data Accuracy',
      v3: '24x7',
      l3: 'Customer Support',
    },
    benefits: {
      sectionTitle: 'Key Benefits of Our Tenant to Tenant Migration Service',
      items: [
        'Choosing Our Service boosts the collaboration between the users and their productivity by combining all the teams working under the same tenant.',
        'Our Shefware Tenant-to-Tenant Migration ensures there is data integrity, followed by easily moving all the mailbox data safely and securely.',
        'We have designed Shefware to support organizations of all sizes, whether it is a small team or a team of thousands of users.',
        'Shefware Tenant-to-Tenant Migration is cost-effective, with ease of data migration through our tools, which reduce operational cost of the organization.',
        'We ensure seamless transfer of all critical data, including OneDrive, SharePoint, Teams, etc while maintaining the data integrity in the process.',
      ],
    },
    heroBannerKey: 'heroBannerTenant',
    process: {
      title: 'Shefware Core Tenant-to-Tenant Migration Services',
      subtitle:
        'The same enterprise-grade paths we use for Office 365 migrations—staged, express, hybrid, and IMAP-aware—applied across tenants.',
      steps: OFFICE_PROCESS_STEPS,
    },
    bento: {
      title: [
        { text: 'How Shefware Tenant-to-Tenant ', variant: 'default' },
        { text: 'Migration Works', variant: 'accentBlock' },
      ],
      subtitle:
        'Tenant-to-tenant moves users, mail, files, and Teams workloads into a single destination Microsoft 365 tenant with controlled cutovers.',
      cards: STANDARD_BENTO_CARDS,
    },
    security: {
      line1: 'Secure and Reliable Tenant-to-Tenant Migration',
      subtitle: 'Your Microsoft 365 data security is our top priority.',
      cards: OFFICE_SECURITY,
    },
    complianceBody:
      'Our migration platform adheres to global security certifications including SOC2 Type II, GDPR, and HIPAA compliance to ensure your transition meets legal and professional standards.',
  },

  'cloud-backup': {
    slug: 'cloud-backup',
    listTitle: 'Cloud backup',
    listDescription: 'Protect mailbox data on IMAP and cloud platforms with dependable backup coverage.',
    hero: {
      title: 'Shefware Cloud Backup Services',
      subtitle: 'Safe, Backup, and Protect Your Email Data Effectively',
      body: 'Shefware offers dependable Cloud Backup services built for businesses and individual users to safely store and safeguard email data. Our services guide in backup emails from numerous platforms, including IMAP servers and cloud-related email services. If there are regular backups or large-scale enterprise data protection, we make sure overall safety, accessibility, and no data loss.',
    },
    metrics: {
      v1: '15000+',
      l1: 'Successful backup',
      v2: '99%',
      l2: 'Data Accuracy',
      v3: '24x7',
      l3: 'Customer Support',
    },
    benefits: {
      sectionTitle: 'Key Benefits of Our Cloud Backup Services',
      items: [
        'Make sure that all emails, attachments, and data are backed up precisely without any data loss.',
        'All email information, including attachments and properties, is protected, ensuring full data cohesion.',
        'Your mailbox stays organized, and we keep the file hierarchy the same so that you can easily have access to the same backed-up data.',
        'Shefware solution works with Outlook, Microsoft 365, Gmail, and IMAP servers.',
        'With huge mailboxes, our system gives rapid backup and maintains precision and safety.',
        'With the help of our user-friendly interface permits processing the backups smoothly by anyone.',
      ],
    },
    heroBannerKey: 'heroBannerCloudBackup',
    process: {
      title: 'Shefware Core Cloud Backup Services',
      subtitle: 'Everything you require for full email data security.',
      steps: [
        {
          title: '1. IMAP Backup Solution',
          body: 'Shefware IMAP Backup service permits you to safely back up emails from IMAP accounts. It offers various email services and makes sure complete mailbox backup containing attachments and metadata.',
          icon: 'chart',
        },
        {
          title: '2. Multiple export formats',
          body: 'Export to PST, EML, PDF, MBOX, HTML, or TXT while preserving formatting, metadata, and attachments—ideal for long-term archives and legal holds.',
          icon: 'gear',
        },
        {
          title: '3. High-volume mailbox backup',
          body: 'Process large mailboxes and many accounts in one run so operators spend less time babysitting jobs and more time validating outcomes.',
          icon: 'sync',
        },
        {
          title: '4. Cloud & platform targets',
          body: 'Point backups at the systems your business already runs—Microsoft 365, Gmail, and other IMAP endpoints—with consistent scheduling and monitoring.',
          icon: 'shield',
        },
      ],
    },
    bento: {
      title: [
        { text: 'How Shefware Cloud ', variant: 'default' },
        { text: 'Backup Works', variant: 'accentBlock' },
      ],
      subtitle: 'Plan, execute, and verify backups with the same rigor we bring to large-scale migrations.',
      cards: CLOUD_BENTO_CARDS,
    },
    security: {
      line1: 'Secure and Reliable Cloud Backup',
      subtitle:
        'Your backup data security is our top priority. We apply the same multi-layered controls used in our migration practice to every backup pipeline.',
      cards: GW_SECURITY,
    },
    complianceBody:
      'Our backup platform aligns with global security certifications including SOC2 Type II, GDPR, and HIPAA expectations so retention and recovery meet professional standards.',
  },

  'teams-migration': {
    slug: 'teams-migration',
    listTitle: 'Teams migration',
    listDescription: 'Move Teams, channels, chats, and files between tenants with structured cutovers.',
    hero: {
      title: 'Shefware Microsoft Teams Migration Services',
      subtitle: 'Migrate Teams Chats, Files & Collaboration Seamlessly',
      body: "Our Microsoft Teams Migration is the process of moving all the data, including Teams & Channels, Messages, files, and team members from the old Teams environment to the new Teams Environment. It is usually done on various occasions, such as mergers or a company's rebranding.",
    },
    metrics: {
      v1: '15000+',
      l1: 'Successful Migration',
      v2: '99%',
      l2: 'Data Accuracy',
      v3: '24x7',
      l3: 'Customer Support',
    },
    benefits: {
      sectionTitle: 'Key Benefits of Our Microsoft Teams Migration Service',
      items: [
        'Teams centralizes messages, files, and meetings so work stays visible and searchable for every team.',
        'The data is stored in a team/ channel, which reduces the long email threads, which can be quite complicated to track.',
        'Teams include the number of teams as per the requirement of the organizations, and have separate teams for each task.',
        'The increasing number of Teams boosts the opportunities for all the remote work and hybrid work culture that seamlessly blends with the organization.',
        'Teams ensures that it maintains and protects all the private channels and message history, and safely adheres to all the legal laws.',
        'It also ensures user permission control for the authorized individuals to restrict and control the access of those who can and cannot use it.',
      ],
    },
    heroBannerKey: 'heroBannerTeams',
    process: {
      title: 'Our Microsoft Teams Migration Process',
      subtitle:
        'A structured, architectural approach to moving your enterprise data with zero friction and maximum integrity.',
      steps: [
        {
          title: '1. Assessment and Planning',
          body: 'We review your source Teams tenant, workloads, and timelines, then define a controlled migration plan with clear validation checkpoints.',
          icon: 'chart',
        },
        {
          title: '2. Setup and Configure',
          body: 'We prepare the destination tenant—teams, channels, identities, and permissions—so users land in a ready-to-use collaboration space.',
          icon: 'gear',
        },
        {
          title: '3. Executing Migration',
          body: 'Channels, chats, files, and memberships move in orchestrated batches with monitoring, throttling awareness, and rollback-ready checkpoints.',
          icon: 'sync',
        },
        {
          title: '4. Validating and Support',
          body: 'We verify completeness, remediate edge cases, and stay engaged through hypercare so productivity returns quickly.',
          icon: 'shield',
        },
      ],
    },
    bento: {
      title: [
        { text: 'Value of Microsoft Teams ', variant: 'default' },
        { text: 'Migration', variant: 'accent' },
      ],
      subtitle:
        'Modernize collaboration without losing the threads, files, and permissions your teams rely on every day.',
      cards: [
        {
          title: 'Increase Work Efficiency',
          body: 'Keep chats, meetings, and files in one governed workspace so decisions stay traceable after you move.',
          icon: 'arrows',
          offset: 'lg:top-0',
        },
        {
          title: 'Safe Data Migration',
          body: 'Validated transfers for teams, channels, and documents reduce surprises during high-stakes tenant consolidations.',
          icon: 'users',
          offset: 'lg:top-16',
        },
        {
          title: 'Limitless Reliability',
          body: 'Architected runbooks and monitoring help maintain uptime for hybrid coexistence windows.',
          icon: 'nodes',
          offset: 'lg:-top-6',
        },
        {
          title: 'Improves Team Collaboration',
          body: 'Preserve membership models and shared context so distributed teams pick up where they left off.',
          icon: 'lock',
          offset: 'lg:top-8',
        },
      ],
    },
    security: {
      line1: 'Secure and Reliable Microsoft Teams Migration',
      subtitle:
        'Your Microsoft Teams migration data security is our top priority. We implement robust, multi-layered protection measures to ensure your organization’s transition is smooth, secure, and fully safeguarded at every step.',
      cards: [
        {
          title: 'Safe Session Management',
          body: 'Credential handling and session hygiene are enforced for every migration operator and automation account.',
          icon: 'shield',
        },
        {
          title: 'Isolated Data Migration',
          body: 'Tenant-scoped pipelines keep source and destination data separated until validation passes.',
          icon: 'server',
        },
        {
          title: 'Control Data Segmentation',
          body: 'Channel and file boundaries are respected so sensitive conversations stay within intended audiences.',
          icon: 'role',
        },
        {
          title: 'Safe Migration Mechanism',
          body: 'Repeatable steps, logging, and approvals reduce ad-hoc changes during the move.',
          icon: 'cloud',
        },
        {
          title: 'Encrypted Credential Maintenance',
          body: 'Secrets and tokens are stored with encryption and rotated according to least-privilege practice.',
          icon: 'mfa',
        },
        {
          title: 'Activity Monitoring',
          body: 'Operational telemetry highlights anomalies early so teams can respond before users are impacted.',
          icon: 'badge',
        },
      ],
    },
    complianceBody:
      'Our migration platform adheres to global security certifications including SOC2 Type II, GDPR, and HIPAA compliance to ensure your transition meets legal and professional standards.',
  },
}

export function isServicePageSlug(value: string): value is ServicePageSlug {
  return (SERVICE_PAGE_ORDER as readonly string[]).includes(value)
}
