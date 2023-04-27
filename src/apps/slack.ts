import { ifApp, map, rule, withCondition } from 'karabiner.ts'
import { left, right } from '../utils/tap-dance'
import { ifAppleKeyboard } from '../devices/apple-keyboard'

export const ifSlack = ifApp('^com.tinyspeck.slackmacgap$')

export const slack = rule('Slack', ifSlack).manipulators([
  left('⌘').to('d', '⌘⇧'), // Show/Hide SideBar
  left('⌥').to('f6'), // Move focus to the next section
  right('⌘').to('.', '⌘'), // Hide right bar
  right('⌥').to('k', '⌘'), // Open

  ...withCondition(ifAppleKeyboard)([
    map('left_command').to('left_command').toIfAlone('d', '⌘⇧'), // Show/Hide SideBar
  ]),
])
