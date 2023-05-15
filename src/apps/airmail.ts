import { ifApp, toKey } from 'karabiner.ts'

export const ifAirmail = ifApp('^it.bloop.airmail2$')

export const airmail = {
  revealHideSidebar: toKey('↓', '⌘⌥'),
  gotoFirstMessage: toKey('↑', '⌥'),
}
