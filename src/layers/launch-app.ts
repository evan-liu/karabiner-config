import { to$, toApp } from 'karabiner.ts'

export const launchApp = {
  a: toApp('ChatGPT'), // AI
  b: toApp('Safari'), // Browser
  c: toApp('Calendar'),
  d: toApp('Eudb_en'), // Dictionary
  e: toApp('Zed'), // Editor
  f: toApp('Finder'),
  g: toApp('Google Chrome'),
  i: toApp('WeChat'), // IM
  m: toApp('Spark Desktop'), // Mail
  r: toUserApp('RustRover'),
  s: toApp('Slack'),
  w: toUserApp('WebStorm'),
  z: toApp('zoom.us'),

  ',': toApp('System Settings'),
}

// `open -a` sometimes gets confused by the non-standard path
function toUserApp(name: string) {
  return to$(`open ~/Applications/${name}.app`)
}
