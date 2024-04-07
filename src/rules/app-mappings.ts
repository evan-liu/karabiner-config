import {
  map,
  rule,
  SideModifierAlias,
  ToEvent,
  toKey,
  withCondition,
} from 'karabiner.ts'
import { airmail, ifAirmail } from '../apps/airmail'
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

export const appMappings = rule('app mappings').manipulators([
  withCondition(ifAirmail)([
    tapModifier('‹⌘', airmail.revealHideSidebar),

    tapModifier('›⌥', airmail.gotoFirstMessage),

    map(1, 'Meh').to(toResizeWindow('Airmail')),
  ]),

  withCondition(ifSpark)([
    tapModifier('‹⌘', spark.openSidebar),

    tapModifier('‹⌥', spark.fetch),

    tapModifier('›⌥', spark.actions),

    map(1, 'Meh').to(toResizeWindow('Spark Desktop')),
  ]),

  withCondition(ifChrome)([
    tapModifier('‹⌥', chrome.refreshThePage),

    tapModifier('›⌘', chrome.developerTools),

    map(1, 'Meh').to(toResizeWindow('Google Chrome')),
  ]),

  withCondition(ifSafari)([
    tapModifier('‹⌘', safari.showHideSideBar),
    tapModifier('‹⌥', safari.reloadPage),
    tapModifier('›⌘', safari.showWebInspector),

    map('h', '⌃').to('home'),
    map('j', '⌃').to('page_down'),
    map('k', '⌃').to('page_up'),
    map('l', '⌃').to('end'),

    map(1, 'Meh').to(toResizeWindow('Safari')),
  ]),

  withCondition(ifIde)([
    tapModifier('‹⌘', ide.activeToolWindow_hideAllToolWindows),
    tapModifier('‹⌥', ide.run_run),
    tapModifier('‹⌃', ide.other_runAnyThing),

    tapModifier('›⌘', ide.toolWindows_terminal).condition(ifWebStorm),
    tapModifier('›⌘', ide.toolWindows_unitTests).condition(ifRider),
    tapModifier('›⌥', ide.aceJump),
    tapModifier('›⌃', ide.findAction),
  ]),

  withCondition(ifZed)([
    tapModifier('‹⌘', zed.leftDock),

    tapModifier('›⌘', zed.terminal),
    tapModifier('›⌥', zed.fileFinder),

    map(1, 'Meh').to(toResizeWindow('Zed')),
  ]),

  withCondition(ifSlack)([
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
