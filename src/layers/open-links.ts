import { FromKeyParam, map, withMapper } from 'karabiner.ts'

try {
  var links = require('../../links.json')
} catch {
  console.log('link.json not found')
}

export const openLinks = [
  withMapper(links as Record<FromKeyParam, string>)((k, v) =>
    map(k).to$(`open "${v}"`),
  ),
]
