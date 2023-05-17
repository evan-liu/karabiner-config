import { map, withMapper } from 'karabiner.ts'

export const launchApp = [
  withMapper({
    a: 'Arc',
    c: 'Calendar',
    f: 'Finder',
    i: 'WeChat', // IM
    k: 'Lens', // K8s
    m: 'Airmail', // Mail
    n: 'Notion',
    r: 'Rider',
    s: 'Slack',
    t: 'Warp', // Terminal
    w: 'WebStorm',
    x: 'Xcode',
    z: 'zoom.us',
    ',': 'System Settings',
  })((k, v) => map(k).toApp(v)),
]
