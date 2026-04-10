/**
 * Partner / client logos shown on the home page marquee.
 * All PNGs under `src/assets/` used for brand social proof.
 */
import logoAws from '../assets/aws.png'
import logoCapgemini from '../assets/capgemini.png'
import logoCisco from '../assets/cisco.png'
import logoCloudBackup from '../assets/cloud backup.png'
import logoEmailConversion from '../assets/email conversion.png'
import logoIbm from '../assets/ibm.png'
import logoJpmorgan from '../assets/jpmorgan.png'
import logoMicrosoft from '../assets/microsoft.png'
import logoOffice365 from '../assets/office 365 migration.png'
import logoTenant from '../assets/tenant_migration.png'

export type PartnerLogo = { src: string; name: string }

export const PARTNER_LOGOS: PartnerLogo[] = [
  { src: logoMicrosoft, name: 'Microsoft' },
  { src: logoAws, name: 'Amazon Web Services' },
  { src: logoCapgemini, name: 'Capgemini' },
  { src: logoCisco, name: 'Cisco' },
  { src: logoIbm, name: 'IBM' },
  { src: logoJpmorgan, name: 'JPMorgan Chase' },
  { src: logoOffice365, name: 'Office 365 migration' },
  { src: logoTenant, name: 'Tenant migration' },
  { src: logoCloudBackup, name: 'Cloud backup' },
  { src: logoEmailConversion, name: 'Email conversion' },
]
