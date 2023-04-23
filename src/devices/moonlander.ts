import { ifDevice, rule } from 'karabiner-config'
import { doubleLeft, doubleRight } from '../utils/tap-dance'

export const ifMoonlander = ifDevice({ vendor_id: 12951, product_id: 6505 })

export const moonlander = rule('Moonlander', ifMoonlander).manipulators([
  doubleLeft('⌘').to('q', '⌘'),
  doubleRight('⌘').to('w', '⌘'),
])
