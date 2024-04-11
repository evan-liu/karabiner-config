import { ifApp, toKey } from 'karabiner.ts'

export const ifZed = ifApp('^dev.zed.Zed$')

export const zed = {
  closeAllDocks: toKey('y', '⌘⌥'),
  taskRerun: toKey('t', '⌥'),

  terminal: toKey('`', '⌃'),
  fileFinder: toKey('p', '⌘'),

  leftDock: toKey(1, '⌘'),
}
