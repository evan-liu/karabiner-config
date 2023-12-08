import { toMouseCursorPosition, toPointingButton } from 'karabiner.ts'
import { toClearNotifications } from '../utils/to-clear-notifications'

export const system = {
  1: toMouseCursorPosition({ x: '25%', y: '50%', screen: 0 }),
  2: toMouseCursorPosition({ x: '50%', y: '50%', screen: 0 }),
  3: toMouseCursorPosition({ x: '75%', y: '50%', screen: 0 }),
  4: toMouseCursorPosition({ x: '50%', y: '50%', screen: 1 }),

  '⏎': toPointingButton('button1'),

  n: toClearNotifications(),
}
