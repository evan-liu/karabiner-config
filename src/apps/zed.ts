import { ifApp, toKey } from 'karabiner.ts'

export const ifZed = ifApp('^dev.zed.Zed$')

export const zed = {
  leftDock: toKey(1, '⌘'),
  fileFinder: toKey('p', '⌘'),
  terminal: toKey('`', '⌃'),
}
