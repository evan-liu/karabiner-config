import { ifApp, map, rule, withCondition } from 'karabiner.ts'
import { left, right } from '../utils/tap-dance'
import { ifAppleKeyboard } from '../devices/apple-keyboard'

export const ifArc = ifApp('^company.thebrowser.Browser$')

export const arc = rule('Arc', ifArc).manipulators([
  left('⌘').to('s', '⌘⌥'), // Reveal/Hide Sidebar
  left('⌥').to('r', '⌘'), // Refresh
  left('⌃').to('=', '⌃⇧'), // Add Split View

  right('⌘').to('i', '⌘⌥'), // Developer Tools
  right('⌥').to('l', '⌘'), // Open Command Bar
  right('⌃').to('t', '⌘'), // New Tab

  map('[', '⌥').to('↑', '⌘⌥'), // Pre Tab
  map(']', '⌥').to('↓', '⌘⌥'), // Next Tab
  map('[', '⌃').to('←', '⌘⌥'), // Pre Space
  map(']', '⌃').to('→', '⌘⌥'), // Next Space

  ...withCondition(ifAppleKeyboard)([
    map('left_command').toIfAlone('s', '⌘⌥'), // Reveal/Hide Sidebar
  ]),
])
