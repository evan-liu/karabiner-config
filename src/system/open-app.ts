import { map, rule } from 'karabiner.ts'

export const openApp = rule('Open App').manipulators([
  map('a', 'Meh').toApp('Arc'),
  map('c', 'Meh').toApp('Calendar'),
  map('f', 'Meh').toApp('Finder'),
  map('l', 'Meh').toApp('Lens'),
  map('m', 'Meh').toApp('Airmail'), // Mail
  map('n', 'Meh').toApp('Notion'),
  map('r', 'Meh').toApp('Rider'),
  map('s', 'Meh').toApp('Slack'),
  map('t', 'Meh').toApp('Warp'), // Terminal
  map('w', 'Meh').toApp('WebStorm'),
  map('x', 'Meh').toApp('Xcode'),
  map('z', 'Meh').toApp('zoom.us'),
  map(',', 'Meh').toApp('System Settings'),
])
