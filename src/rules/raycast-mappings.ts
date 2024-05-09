import { map, rule, withModifier } from 'karabiner.ts'
import { raycast } from '../apps/raycast'

export const raycastMappings = rule('Raycast').manipulators([
  map('␣', '⌥').to(raycast.quickOpen),

  withModifier('Hyper')({
    d: raycast.easydict,
    e: raycast.searchEmojiSymbols,
    g: raycast.gitmoji,
    m: raycast.searchMenuItems,
    s: raycast.searchSnippets,
    v: raycast.clipboardHistory,
    w: raycast.switchWindows,
  }),
  withModifier('Hyper')({
    '↑': raycast.win.previousDisplay,
    '↓': raycast.win.nextDisplay,
    '←': raycast.win.previousDesktop,
    '→': raycast.win.nextDesktop,
  }),
  withModifier('Hyper')({
    1: raycast.win.firstThird,
    2: raycast.win.centerThird,
    3: raycast.win.lastThird,
    4: raycast.win.firstTwoThirds,
    5: raycast.win.lastTwoThirds,
    9: raycast.win.leftHalf,
    0: raycast.win.rightHalf,
  }),
  withModifier('Meh')({
    1: raycast.win.firstFourth,
    2: raycast.win.secondFourth,
    3: raycast.win.thirdFourth,
    4: raycast.win.lastFourth,
    5: raycast.win.center,
    6: raycast.win.centerHalf,
    7: raycast.win.centerTwoThirds,
    8: raycast.win.maximize,
  }),
])
