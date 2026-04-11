/**
 * Home promo slides from this folder. Globs live here (same directory as assets) so Vite resolves
 * reliably on Windows; brace patterns like `*.{png,jpg}` are avoided.
 */
export type ComponentBannerSlide = { src: string; alt: string }

function assetUrl(mod: unknown): string | undefined {
  if (typeof mod === 'string') return mod
  if (mod && typeof mod === 'object' && 'default' in mod) {
    const d = (mod as { default: unknown }).default
    if (typeof d === 'string') return d
  }
  return undefined
}

const pngMods = import.meta.glob<{ default: string }>('./*.png', { eager: true, import: 'default' })
const jpgMods = import.meta.glob<{ default: string }>('./*.jpg', { eager: true, import: 'default' })
const jpegMods = import.meta.glob<{ default: string }>('./*.jpeg', { eager: true, import: 'default' })
const webpMods = import.meta.glob<{ default: string }>('./*.webp', { eager: true, import: 'default' })
const svgMods = import.meta.glob<{ default: string }>('./*.svg', { eager: true, import: 'default' })

const componentBannerModules: Record<string, unknown> = {
  ...pngMods,
  ...jpgMods,
  ...jpegMods,
  ...webpMods,
  ...svgMods,
}

export function slidesFromComponentImagesFolder(): ComponentBannerSlide[] {
  const entries: [string, string][] = []
  for (const [path, mod] of Object.entries(componentBannerModules)) {
    const url = assetUrl(mod)
    if (url) entries.push([path, url])
  }

  return entries
    .sort(([pathA], [pathB]) => {
      const baseA = pathA.split(/[/\\]/).pop() ?? pathA
      const baseB = pathB.split(/[/\\]/).pop() ?? pathB
      const numA = parseInt(/\d+/.exec(baseA)?.[0] ?? '0', 10)
      const numB = parseInt(/\d+/.exec(baseB)?.[0] ?? '0', 10)
      if (numA !== numB) return numA - numB
      return baseA.localeCompare(baseB, undefined, { numeric: true, sensitivity: 'base' })
    })
    .map(([path, src]) => {
      const base = path.split(/[/\\]/).pop() ?? 'banner'
      const stem = base.replace(/\.[^.]+$/, '')
      return { src, alt: `Home promo banner — ${stem}` }
    })
}
