import { ifApp, rule } from 'karabiner-config'
import { left, right } from '../utils/tap-dance'

export const ifSlack = ifApp('^com.tinyspeck.slackmacgap$')

export const slack = rule('Slack', ifSlack).manipulators([
  left('⌘').to('d', '⌘⇧'), // Show/Hide SideBar
  left('⌥').to('f6'), // Move focus to the next section
  right('⌘').to('.', '⌘'), // Hide right bar
  right('⌥').to('k', '⌘'), // Open
])
