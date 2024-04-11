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
import { ifNotion, notion } from '../apps/notion'
import { ifObsidian, obsidian } from '../apps/obsidian'
import { ifSafari, safari } from '../apps/safari'
import { ifSlack, slack } from '../apps/slack'
import { ifSourceTree, sourceTree } from '../apps/source-tree'
import { ifSpark, spark } from '../apps/spark'
import { ifWarp, warp } from '../apps/warp'
import { ifZed, zed } from '../apps/zed'
import { ifZoom, zoom } from '../apps/zoom'
import { toResizeWindow, toSlackWindow } from '../utils/to-resize-window'

const tapModifier = (v: SideModifierAlias, to: ToEvent) =>
  map(v).to(v).toIfAlone(to)

const tabNavi = [
  // Pre/Next tab in most apps
  map('h', '⌥').to('[', '⌘⇧'),
  map('l', '⌥').to(']', '⌘⇧'),
]
const historyNavi = [
  // Back/Forward history in most apps
  map('h', '⌃').to('[', '⌘'),
  map('l', '⌃').to(']', '⌘'),
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
    ...tabNavi,
    ...historyNavi,

    tapModifier('‹⌥', chrome.refreshThePage),

    tapModifier('›⌘', chrome.developerTools),

    map(1, 'Meh').to(toResizeWindow('Google Chrome')),
  ]),

  withCondition(ifSafari)([
    ...tabNavi,
    ...historyNavi,

    tapModifier('‹⌘', safari.showHideSideBar),
    tapModifier('‹⌥', safari.reloadPage),

    tapModifier('›⌘', safari.showWebInspector),

    map(1, 'Meh').to(toResizeWindow('Safari')),
  ]),

  withCondition(ifIde)([
    ...tabNavi,

    tapModifier('‹⌘', ide.activeToolWindow_hideAllToolWindows),
    tapModifier('‹⌥', ide.run_run),
    tapModifier('‹⌃', ide.other_runAnyThing),

    tapModifier('›⌘', ide.toolWindows_terminal).condition(ifWebStorm),
    tapModifier('›⌘', ide.toolWindows_unitTests).condition(ifRider),
    tapModifier('›⌥', ide.aceJump),
    tapModifier('›⌃', ide.findAction),
  ]),

  withCondition(ifZed)([
    ...tabNavi,

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

  withCondition(ifSourceTree)([
    tapModifier('‹⌥', sourceTree.commit),

    tapModifier('›⌥', sourceTree.fetch),

    map(1, 'Meh').to(toResizeWindow('Sourcetree')),
  ]),

  withCondition(ifZoom)([
    tapModifier('‹⌘', zoom.muteUnmuteMyAudio),
    tapModifier('‹⌥', zoom.startStopScreenSharing),

    tapModifier('›⌘', zoom.startStopVideo),
    tapModifier('›⌥', zoom.showHideChatPanel),
  ]),

  withCondition(ifNotion)([
    tapModifier('‹⌘', notion.openCloseSidebar),
    tapModifier('›⌥', notion.openSearch),
  ]),

  withCondition(ifObsidian)([
    tapModifier('›⌥', obsidian.quickSwitcher),
    //
  ]),

  withCondition(ifWarp)([
    tapModifier('‹⌘', toKey('h', '⌘')),

    tapModifier('›⌥', warp.toggleCommandPalette),
    tapModifier('›⌃', warp.toggleNavigationPalette),
    tapModifier('›⌘', warp.toggleWarpAI),

    map(1, 'Meh').to(toResizeWindow('Warp')),
  ]),

  withCondition(ifChatGPT)([
    tapModifier('‹⌘', chatGPT.toggleSidebar),
    tapModifier('‹⌥', chatGPT.openNewChat),

    tapModifier('›⌥', chatGPT.focusChatInput),

    map(',', '⌘').to(chatGPT.controlCenter),

    map(1, 'Meh').to(toResizeWindow('ChatGPT')),
  ]),
])
