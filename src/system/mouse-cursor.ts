import { map, rule } from 'karabiner-config'

export const mouseCursor = rule('Mouse Cursor Position').manipulators([
  map('←', 'Meh').toMouseCursorPosition({ x: '25%', y: '50%' }),
  map('→', 'Meh').toMouseCursorPosition({ x: '75%', y: '50%' }),
  map('↓', 'Meh').toMouseCursorPosition({ x: '50%', y: '50%' }),
  map('↑', 'Meh').toMouseCursorPosition({ x: '100%', y: 0 }),
])
