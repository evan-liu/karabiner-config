import { ifApp, toKey } from 'karabiner.ts'

export const ifZoom = ifApp('^us.zoom.xos$')

export const zoom = {
  muteUnmuteMyAudio: toKey('a', '⌘⇧'),
  startStopVideo: toKey('v', '⌘⇧'),
  startStopScreenSharing: toKey('s', '⌘⇧'),
  showHideChatPanel: toKey('h', '⌘⇧'),
}
