import { ifDevice, map, rule } from 'karabiner.ts'

const ifAppleKeyboard = ifDevice({ vendor_id: 1452, product_id: 835 })

export const appleKeyboard = rule('Apple', ifAppleKeyboard).manipulators([
  map('⇪').to('⎋'),

  map('›⌘').toHyper(),
  map('›⌥').toMeh(),
])
