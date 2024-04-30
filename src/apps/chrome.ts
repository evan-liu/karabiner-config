import { ifApp, toKey } from 'karabiner.ts'

export const ifChrome = ifApp('^com.google.Chrome$')

// https://developer.chrome.com/docs/devtools/shortcuts/
export const chrome = {
  developerTools: toKey('i', '⌘⌥'),
  refreshThePage: toKey('r', '⌘'),
  searchTabs: toKey('a', '⌘⇧'),
}
