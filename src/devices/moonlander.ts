import { ifDevice, map, rule } from 'karabiner.ts'

const ifMoonlander = ifDevice({ vendor_id: 12951, product_id: 6505 })

export const moonlander = rule(
  'Mouse Cursor Position',
  ifMoonlander,
).manipulators([
  map('←', 'Meh').toMouseCursorPosition({ x: '25%', y: '50%' }),
  map('→', 'Meh').toMouseCursorPosition({ x: '75%', y: '50%' }),
  map('↓', 'Meh').toMouseCursorPosition({ x: '50%', y: '50%' }),
  map('↑', 'Meh').toMouseCursorPosition({ x: '100%', y: 0 }),
])
