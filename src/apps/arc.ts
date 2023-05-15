import { ifApp, toKey } from 'karabiner.ts'

export const ifArc = ifApp('^company.thebrowser.Browser$')

export const arc = {
  revealHideSidebar: toKey('s', '⌘⌥'),
  refresh: toKey('r', '⌘'),
  addSplitView: toKey('=', '⌃⇧'),
  developerTools: toKey('i', '⌘⌥'),
  openCommandBar: toKey('l', '⌘'),
  newTab: toKey('t', '⌘'),
  preTab: toKey('↑', '⌘⌥'),
  nextTab: toKey('↓', '⌘⌥'),
  preSpace: toKey('←', '⌘⌥'),
  nextSpace: toKey('→', '⌘⌥'),
}
