import { ifDevice, map, rule } from 'karabiner.ts'

const ifAppleKeyboard = ifDevice({ vendor_id: 1452, product_id: 835 })

export const appleKeyboard = rule(
  'apple keyboard modifiers',
  ifAppleKeyboard,
).manipulators([
  map('⇪').to('⎋'),
  map('‹⌃', 'fn').toHyper(),
  map('‹⌥', 'fn').toMeh(),
])
