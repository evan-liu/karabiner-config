import {
  ifDevice,
  toMouseCursorPosition,
  toMouseKey,
  toPointingButton,
} from 'karabiner.ts'

export const ifMoonlander = ifDevice({ vendor_id: 12951, product_id: 6505 })

const moveLeft = (v = 1) => toMouseKey({ x: -1536, speed_multiplier: v })
const moveRight = (v = 1) => toMouseKey({ x: 1536, speed_multiplier: v })
const moveUp = (v = 1) => toMouseKey({ y: -1536, speed_multiplier: v })
const moveDown = (v = 1) => toMouseKey({ y: 1536, speed_multiplier: v })

const scrollUp = (v = 1) =>
  toMouseKey({ vertical_wheel: -32, speed_multiplier: v })
const scrollDown = (v = 1) =>
  toMouseKey({ vertical_wheel: 32, speed_multiplier: v })

export const mouseCursor = {
  ...{
    1: toMouseCursorPosition({ x: '92%', y: 25, screen: 0 }),
    2: toMouseCursorPosition({ x: '25%', y: '50%', screen: 0 }),
    3: toMouseCursorPosition({ x: '75%', y: '50%', screen: 0 }),
    4: toMouseCursorPosition({ x: '50%', y: '50%', screen: 0 }),
    5: toMouseCursorPosition({ x: '50%', y: '50%', screen: 1 }),
  },
  ...{ h: moveLeft(), j: moveDown(), k: moveUp(), l: moveRight() },
  ...{ '↑': scrollUp(), '↓': scrollDown() },
  '⏎': toPointingButton('button1'),
}
