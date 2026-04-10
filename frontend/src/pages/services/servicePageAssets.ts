/**
 * Figma MCP export URLs — replace with files in /public when these expire (~7 days).
 * Source: https://www.figma.com/design/qog60m4YVUE6cwuGJkt7ML/shefware-1
 */
export const SERVICE_HERO_BANNER_KEYS = [
  'heroBannerGoogleWorkspace',
  'heroBannerEmailConversion',
  'heroBannerOffice365',
  'heroBannerTenant',
  'heroBannerCloudBackup',
  'heroBannerTeams',
] as const

export type ServiceHeroBannerKey = (typeof SERVICE_HERO_BANNER_KEYS)[number]

export const SERVICE_PAGE_ASSETS = {
  journeyPath:
    'https://www.figma.com/api/mcp/asset/bd759d21-9512-4289-964b-68cbf360bea3',
  complianceIllustration:
    'https://www.figma.com/api/mcp/asset/2d0908e2-b6c8-4881-9184-43788f48649e',
  /** Local banners in `public/images/gw-migration/` (also used by deploy). */
  heroBannerGoogleWorkspace: '/images/gw-migration/banner.jpg',
  heroBannerEmailConversion:
    'https://www.figma.com/api/mcp/asset/45be3001-85be-414f-acc9-6d4b12c56fee',
  heroBannerOffice365:
    'https://www.figma.com/api/mcp/asset/15e66966-1d40-4c70-9edb-45e2a2a2e741',
  heroBannerTenant:
    'https://www.figma.com/api/mcp/asset/3963b9e0-0e57-43fb-993d-05575804a8c0',
  heroBannerCloudBackup:
    'https://www.figma.com/api/mcp/asset/17992537-0505-4dd1-aa62-200259965b9b',
  heroBannerTeams:
    'https://www.figma.com/api/mcp/asset/d375d1fc-7506-4890-9555-0274ff2379c8',
} as const
