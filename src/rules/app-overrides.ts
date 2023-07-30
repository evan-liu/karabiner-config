import { map, rule, withCondition } from 'karabiner.ts'
import { arc, ifArc } from '../apps/arc'
import { ide, ifIde } from '../apps/jetbrains-ide'

export const appOverrides = rule('app overrides').manipulators([
  withCondition(ifArc)([
    map('[', '⌥').to(arc.previousTab),
    map(']', '⌥').to(arc.nextTab),

    map('[', '⌃').to(arc.previousSpace),
    map(']', '⌃').to(arc.nextSpace),

    map(';', 'Meh').to(arc.addSplitView),
    map('[', 'Meh').to(arc.switchToPreviousSplitView),
    map(']', 'Meh').to(arc.switchToNextSplitView),
  ]),

  withCondition(ifIde)([
    map('h', '⌘⌥').to(ide.code_moveElementLeft),
    map('l', '⌘⌥').to(ide.code_moveElementRight),
  ]),
])
