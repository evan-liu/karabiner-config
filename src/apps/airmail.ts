import { ifApp, map, rule, withCondition } from 'karabiner.ts'
import { left, right } from '../utils/tap-dance'
import { ifAppleKeyboard } from '../devices/apple-keyboard'

export const ifAirmail = ifApp('^it.bloop.airmail2$')

export const airmail = rule('Airmail', ifAirmail).manipulators([
  left('⌘').to('↓', '⌘⌥'), // Reveal/Hide Sidebar
  right('⌥').to('↑', '⌥'), // Goto the first message

  ...withCondition(ifAppleKeyboard)([
    map('left_command').to('left_command').toIfAlone('↓', '⌘⌥'), // Reveal/Hide Sidebar
  ]),
])
