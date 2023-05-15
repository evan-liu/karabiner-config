import { ifApp, toKey } from 'karabiner.ts'

export const ifSourceTree = ifApp('^com.torusknot.SourceTree')

export const sourceTree = {
  commit: toKey('c', '⌘⇧'),
  fetch: toKey('f', '⌘⇧'),
}
