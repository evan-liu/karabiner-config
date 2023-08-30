import { ifApp, toKey } from 'karabiner.ts'

export const ifWarp = ifApp('^dev.warp.Warp')

export const warp = {
  toggleCommandPalette: toKey('p', '⌘'),
  toggleNavigationPalette: toKey('p', '⌘⇧'),
}
