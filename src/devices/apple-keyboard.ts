import { ifDevice, map, rule } from 'karabiner.ts'

const ifAppleKeyboard = ifDevice({ vendor_id: 1452, product_id: 835 })

export const appleKeyboard = rule('Apple', ifAppleKeyboard).manipulators([
  map('⇪').to('⎋'),

  // The esc on the keyboard, not the ⇪ mapping above
  map('⎋', 'fn').toHyper(),
  map('⎋', '⌃').toMeh(),
])
