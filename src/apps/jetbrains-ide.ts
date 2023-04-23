import { ifApp, rule } from 'karabiner-config'
import { double, doubleLeft, left, right } from '../utils/tap-dance'

export const ifJetBrainsIde = ifApp('^com.jetbrains.(WebStorm|rider)$')

export const jetbrainsIde = rule('IDE', ifJetBrainsIde).manipulators([
  left('⌘').to('h', '⌥'), // Hide all tool windows
  left('⌥').to('r', '⌥⇧'), // Run
  doubleLeft('⌥').to('f2', '⌘'), // Stop

  right('⌘').to(4, '⌥'), // Terminal
  right('⌥').to(';', '⌃'), // AceJump
  right('⌃').to('a', '⌘⇧'), // pull

  double('⇪').to('w', 'Hyper'), // Close project
])
