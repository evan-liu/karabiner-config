import { ifApp, toKey } from 'karabiner.ts'

export const ifArc = ifApp('^company.thebrowser.Browser$')

export const arc = {
  newTab: toKey('t', '⌘'),
  newWindow: toKey('n', '⌘'),
  closeTab: toKey('w', '⌘'),
  openLittleArc: toKey('n', '⌘⌥'),
  reOpenLastClosedTab: toKey('t', '⌘⇧'),
  pinTab: toKey('d', '⌘'),
  copyCurrentTabUrl: toKey('c', '⌘⇧'),
  changeCurrentTabUrl: toKey('l', '⌘'),
  revealHideSidebar: toKey('s', '⌘⌥'),
  clearUnpinnedTabs: toKey('k', '⌘⇧'),
  toggleBetweenRecentTabs: toKey('⇥', '⌃'),
  goBackOnTabHistory: toKey('[', '⌘'),
  goForwardOnTabHistory: toKey(']', '⌘'),
  addSplitView: toKey('=', '⌃⇧'),
  closeSplitView: toKey('-', '⌃⇧'),
  refresh: toKey('r', '⌘'),
  developerTools: toKey('i', '⌘⌥'),
  openCommandBar: toKey('l', '⌘'),
  preTab: toKey('↑', '⌘⌥'),
  nextTab: toKey('↓', '⌘⌥'),
  preSpace: toKey('←', '⌘⌥'),
  nextSpace: toKey('→', '⌘⌥'),
}
