import { map, rule } from 'karabiner-config'

export const openApp = rule('Open App').manipulators([
  map('a', 'Meh').toApp('Arc'),
  map('b', 'Meh').toApp('Slack'),
  map('c', 'Meh').toApp('Calendar'),
  map('f', 'Meh').toApp('Finder'),
  map('i', 'Meh').toApp('WebStorm'),
  map('l', 'Meh').toApp('Lens'),
  map('m', 'Meh').toApp('Airmail'),
  map('n', 'Meh').toApp('Notion'),
  map('r', 'Meh').toApp('Rider'),
  map('s', 'Meh').toApp('Sourcetree'),
  map('t', 'Meh').toApp('Warp'),
  map('w', 'Meh').toApp('WeChat'),
  map('x', 'Meh').toApp('Xcode'),
  map('z', 'Meh').toApp('zoom.us'),
])
