import { map, rule, withMapper } from 'karabiner.ts'

export const openApp = rule('Open App').manipulators([
  withMapper({
    a: 'Arc',
    c: 'Calendar',
    f: 'Finder',
    l: 'Lens',
    m: 'Airmail', // Mail
    n: 'Notion',
    r: 'Rider',
    s: 'Slack',
    t: 'Warp', // Terminal
    w: 'WebStorm',
    x: 'Xcode',
    z: 'zoom.us',
    ',': 'System Settings',
  })((k, v) => map(k, 'Meh').toApp(v)),
])
