import { ifApp, map, rule } from 'karabiner-config'
import { left, right } from '../utils/tap-dance'

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
])
