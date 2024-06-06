import { ifDevice, map, rule } from 'karabiner.ts'
import { system } from '../apps/system'

const ifAppleKeyboard = ifDevice({ vendor_id: 1452, product_id: 835 })

export const appleKeyboard = rule('Apple', ifAppleKeyboard).manipulators([
  map('⇪').to('⎋'),
  map('⇪', '⇧').to('⇪'),

  map('›⌘', '⌥').toHyper(),
  map('›⌥', '⇧').toMeh(),

  map('fn').to(system.selectNextSourceInInputMenu),
])
