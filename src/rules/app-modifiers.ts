import {
  map,
  rule,
  SideModifierAlias,
  ToEvent,
  withCondition,
} from 'karabiner.ts'
import { airmail, ifAirmail } from '../apps/airmail'
import { arc, ifArc } from '../apps/arc'
import { ifSlack, slack } from '../apps/slack'
import { ifSourceTree, sourceTree } from '../apps/source-tree'
import { ide, ifIde, ifRider, ifWebStorm } from '../apps/jetbrains-ide'
import { ifZoom, zoom } from '../apps/zoom'

const tapModifier = (v: SideModifierAlias, to: ToEvent) =>
  map(v).to(v).toIfAlone(to)

export const appModifiers = rule('apps and modifiers').manipulators([
  withCondition(ifAirmail)([
    tapModifier('‹⌘', airmail.revealHideSidebar),

    tapModifier('›⌥', airmail.gotoFirstMessage),
  ]),

  withCondition(ifArc)([
    tapModifier('‹⌘', arc.revealHideSidebar),
    tapModifier('‹⌥', arc.refreshThePage),

    tapModifier('›⌘', arc.developerTools),
    tapModifier('›⌥', arc.openCommandBar),
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

  withCondition(ifSlack)([
    tapModifier('‹⌘', slack.showHideSideBar),
    tapModifier('‹⌥', slack.moveFocusToTheNextSection),

    tapModifier('›⌘', slack.hideRightBar),
    tapModifier('›⌥', slack.open),
  ]),

  withCondition(ifSourceTree)([
    tapModifier('‹⌥', sourceTree.commit),

    tapModifier('›⌥', sourceTree.fetch),
  ]),

  withCondition(ifZoom)([
    tapModifier('‹⌘', zoom.muteUnmuteMyAudio),
    tapModifier('‹⌥', zoom.startStopScreenSharing),

    tapModifier('›⌘', zoom.startStopVideo),
    tapModifier('›⌥', zoom.showHideChatPanel),
  ]),
])
