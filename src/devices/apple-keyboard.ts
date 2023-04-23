import { ifDevice, map, rule } from 'karabiner-config'

export const ifAppleKeyboard = ifDevice({ vendor_id: 1452, product_id: 835 })

export const appleKeyboard = rule(
  'Apple Keyboard',
  ifAppleKeyboard,
).manipulators([
  //
  map('right_command').toHyper(),
  map('right_option').toMeh(),
])
