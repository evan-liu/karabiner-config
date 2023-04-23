import { rule } from 'karabiner-config'
import { doubleLeft, doubleRight } from '../utils/tap-dance'

export const universal = rule('Universal').manipulators([
  doubleLeft('⌘').to('q', '⌘'),
  doubleRight('⌘').to('w', '⌘'),
])
