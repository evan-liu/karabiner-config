import {
  ifDevice,
  toMouseCursorPosition,
  toMouseKey,
  toPointingButton,
} from 'karabiner.ts'

export const ifMoonlander = ifDevice({ vendor_id: 12951, product_id: 6505 })

const topLeft = toMouseCursorPosition({ x: 20, y: 20 })
const topRight = toMouseCursorPosition({ x: '99%', y: 20 })
const center = toMouseCursorPosition({ x: '50%', y: '50%' })
const leftCenter = toMouseCursorPosition({ x: '25%', y: '50%' })
const rightCenter = toMouseCursorPosition({ x: '75%', y: '50%' })

const moveLeft = (v = 2) => toMouseKey({ x: -1536, speed_multiplier: v })
const moveRight = (v = 2) => toMouseKey({ x: 1536, speed_multiplier: v })
const moveUp = (v = 3) => toMouseKey({ y: -1536, speed_multiplier: v })
const moveDown = (v = 3) => toMouseKey({ y: 1536, speed_multiplier: v })

const scrollUp = (v = 1) =>
  toMouseKey({ vertical_wheel: -32, speed_multiplier: v })
const scrollDown = (v = 1) =>
  toMouseKey({ vertical_wheel: 32, speed_multiplier: v })

export const mouseCursor = {
  ...{
    1: topRight,
    2: leftCenter,
    3: rightCenter,
    4: center,
    5: topLeft,
  },
  ...{ j: moveLeft(), i: moveUp(), k: moveDown(), l: moveRight() },
  ...{ '↑': scrollUp(), '↓': scrollDown() },
  '⏎': toPointingButton('button1'),
}
