import { to$, toApp } from 'karabiner.ts'

export const launchApp = {
  a: toApp('Arc'),
  c: toApp('Calendar'),
  f: toApp('Finder'),
  i: toApp('WeChat'), // IM
  k: toApp('Lens'), // K8s
  m: toApp('Airmail'), // Mail
  n: toApp('Notion'),
  r: toIDE('Rider'),
  s: toApp('Slack'),
  t: toApp('Warp'), // Terminal
  w: toIDE('WebStorm'),
  x: toApp('Xcode'),
  z: toApp('zoom.us'),
  ',': toApp('System Settings'),
}

// `open -a` sometimes gets confused by the non-standard path
function toIDE(name: string) {
  return to$(`open ~/Applications/${name}.app`)
}
