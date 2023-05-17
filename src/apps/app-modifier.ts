import {
  map,
  rule,
  SideModifierAlias,
  ToEvent,
  withCondition,
} from 'karabiner.ts'
import { airmail, ifAirmail } from './airmail'
import { arc, ifArc } from './arc'
import { ifSlack, slack } from './slack'
import { ifSourceTree, sourceTree } from './source-tree'
import { ide, ifIde } from './jetbrains-ide'

const tapModifier = (v: SideModifierAlias, to: ToEvent) =>
  map(v).to(v).toIfAlone(to)

export const appModifier = rule('apps and modifiers').manipulators([
  withCondition(ifAirmail)([
    tapModifier('‹⌘', airmail.revealHideSidebar),
    tapModifier('›⌥', airmail.gotoFirstMessage),
  ]),

  withCondition(ifArc)([
    tapModifier('‹⌘', arc.revealHideSidebar),
    tapModifier('‹⌥', arc.refreshThePage),

    tapModifier('›⌘', arc.javaScriptConsole),
    tapModifier('›⌥', arc.openCommandBar),
  ]),

  withCondition(ifIde)([
    tapModifier('‹⌘', ide.activeToolWindow_hideAllToolWindows),
    tapModifier('‹⌥', ide.run_run),

    tapModifier('›⌘', ide.toolWindows_terminal),
    tapModifier('›⌥', ide.aceJump),
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
])
