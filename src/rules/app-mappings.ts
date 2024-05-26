import {
  map,
  rule,
  SideModifierAlias,
  ToEvent,
  toKey,
  withCondition,
} from 'karabiner.ts'
import { chatGPT, ifChatGPT } from '../apps/chatgpt'
import { chrome, ifChrome } from '../apps/chrome'
import { ide, ifIde, ifRider, ifWebStorm } from '../apps/jetbrains-ide'
import { ifSafari, safari } from '../apps/safari'
import { ifSlack, slack } from '../apps/slack'
import { ifSpark, spark } from '../apps/spark'
import { ifZed, zed } from '../apps/zed'
import { ifZoom, zoom } from '../apps/zoom'
import { toResizeWindow, toSlackWindow } from '../utils/to-resize-window'

const tapModifier = (v: SideModifierAlias, to: ToEvent) =>
  map(v).to(v).toIfAlone(to)

const historyNavi = [
  // Back/Forward history in most apps
  map('h', '⌃').to('[', '⌘'),
  map('l', '⌃').to(']', '⌘'),
]
const tabNavi = [
  // Pre/Next tab in most apps
  map('h', '⌥').to('[', '⌘⇧'),
  map('l', '⌥').to(']', '⌘⇧'),
]
const switcher = [
  // Pre/Next switcher in most apps
  map('h', '⌘⌥⌃').to('⇥', '⌃⇧'),
  map('l', '⌘⌥⌃').to('⇥', '⌃'),
]

export const appMappings = rule('app mappings').manipulators([
  withCondition(ifSpark)([
    tapModifier('‹⌘', spark.openSidebar),
    tapModifier('‹⌥', spark.fetch),

    tapModifier('›⌘', spark.changeLayout),
    tapModifier('›⌥', spark.actions),

    map(1, 'Meh').to(toResizeWindow('Spark Desktop')),
  ]),

  withCondition(ifChrome)([
    ...historyNavi,
    ...tabNavi,
    ...switcher,

    tapModifier('‹⌥', chrome.refreshThePage),

    tapModifier('›⌘', chrome.developerTools),
    tapModifier('›⌥', chrome.searchTabs),

    map(1, 'Meh').to(toResizeWindow('Google Chrome')),
  ]),

  withCondition(ifSafari)([
    ...historyNavi,
    ...tabNavi,
    ...switcher,

    tapModifier('‹⌘', safari.showHideSideBar),
    tapModifier('‹⌥', safari.reloadPage),

    tapModifier('›⌘', safari.showWebInspector),

    map(1, 'Meh').to(toResizeWindow('Safari')),
  ]),

  withCondition(ifIde)([
    ...historyNavi,
    ...tabNavi,
    ...switcher,

    tapModifier('‹⌘', ide.activeToolWindow_hideAllToolWindows),
    tapModifier('‹⌥', ide.run_run),

    tapModifier('›⌘', ide.toolWindows_terminal),
    tapModifier('›⌥', ide.findAction),
  ]),

  withCondition(ifZed)([
    ...historyNavi,
    ...tabNavi,
    ...switcher,

    tapModifier('‹⌘', zed.closeAllDocks),
    tapModifier('‹⌥', zed.taskRerun),

    tapModifier('›⌘', zed.terminal),
    tapModifier('›⌥', zed.fileFinder),

    map(1, 'Meh').to(toResizeWindow('Zed')),
  ]),

  withCondition(ifSlack)([
    ...historyNavi,

    tapModifier('‹⌘', slack.showHideSideBar),
    tapModifier('‹⌥', slack.moveFocusToTheNextSection),

    tapModifier('›⌘', slack.hideRightBar),
    tapModifier('›⌥', slack.open),

    map(1, 'Meh').to(toSlackWindow()),
  ]),

  withCondition(ifZoom)([
    tapModifier('‹⌘', zoom.muteUnmuteMyAudio),
    tapModifier('‹⌥', zoom.startStopScreenSharing),

    tapModifier('›⌘', zoom.startStopVideo),
    tapModifier('›⌥', zoom.showHideChatPanel),
  ]),

  withCondition(ifChatGPT)([
    tapModifier('‹⌘', chatGPT.toggleSidebar),
    tapModifier('‹⌥', chatGPT.openNewChat),

    tapModifier('›⌥', chatGPT.focusChatInput),

    map(',', '⌘').to(chatGPT.controlCenter),

    map(1, 'Meh').to(toResizeWindow('ChatGPT')),
  ]),
])
