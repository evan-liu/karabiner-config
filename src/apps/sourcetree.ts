import { ifApp, rule } from 'karabiner.ts'
import { left, right } from '../utils/tap-dance'

export const ifSourceTree = ifApp('^com.torusknot.SourceTree')

export const sourceTree = rule('SourceTree', ifSourceTree).manipulators([
  left('⌥').to('c', '⌘⇧'), // Commit
  left('⌃').to('p', '⌘⇧'), // Push
  right('⌥').to('f', '⌘⇧'), // fetch
  right('⌃').to('l', '⌘⇧'), // pull
])
