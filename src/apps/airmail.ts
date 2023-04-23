import { ifApp, rule } from 'karabiner-config'
import { left, right } from '../utils/tap-dance'

export const ifAirmail = ifApp('^it.bloop.airmail2$')

export const airmail = rule('Airmail', ifAirmail).manipulators([
  left('⌘').to('↓', '⌘⌥'), // Reveal/Hide Sidebar
  right('⌥').to('↑', '⌥'), // Goto the first message
])
