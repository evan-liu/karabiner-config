import { ifApp, toKey } from 'karabiner.ts'

export const ifObsidian = ifApp('^md.obsidian$')

export const obsidian = {
  quickSwitcher: toKey('o', '⌘'),
}
