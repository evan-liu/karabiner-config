import { to$, toApp } from 'karabiner.ts'

export const launchApp = {
  a: toApp('ChatGPT'), // AI
  b: toApp('Safari'), // Browser
  c: toApp('Calendar'),
  d: toIDE('DataGrip'),
  f: toApp('Finder'),
  g: toApp('Google Chrome'),
  i: toApp('WeChat'), // IM
  k: toApp('Lens'), // K8s
  m: toApp('Airmail'), // Mail
  n: toApp('Obsidian'), // Notes
  r: toIDE('RustRover'),
  s: toApp('Slack'),
  t: toApp('Warp'), // Terminal
  w: toIDE('WebStorm'),
  x: toApp('Xcode'),
  y: toIDE('PyCharm\\ Professional\\ Edition'),
  z: toApp('zoom.us'),
  ',': toApp('System Settings'),

  3: toIDE('Rider'),
}

// `open -a` sometimes gets confused by the non-standard path
function toIDE(name: string) {
  return to$(`open ~/Applications/${name}.app`)
}
