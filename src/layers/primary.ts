import { map, toKey, withCondition, withMapper } from 'karabiner.ts'
import { arc, ifArc } from '../apps/arc'
import { ide, ifIde } from '../apps/jetbrains-ide'
import { system } from '../apps/system'

export const primaryLeft = [
  withCondition(ifArc)({
    p: arc.openCommandBar,
    ';': arc.addSplitView,
  }),
  withCondition(ifIde)({
    p: ide.findAction,
    ';': ide.editorTabs_splitAndMoveRight,

    // ← ↑ ↓ →
    6: ide.moveCaret_previousCamelWord,
    9: ide.moveCaret_nextCamelWord,
    7: ide.scrollUp,
    8: ide.scrollDown,
  }),
  withMapper({ h: '←', j: '↑', k: '↓', l: '→' } as const)((k, v) =>
    map(k).to(v),
  ),
  withMapper({ n: '←', m: '↑', ',': '↓', '.': '→' } as const)((k, v) =>
    map(k).to(v, '⌘'),
  ),
  withMapper({ y: '←', u: '↑', i: '↓', o: '→' } as const)((k, v) =>
    map(k).to(v, '⌥'),
  ),

  { '⏎': toKey('⏎', '⌘'), '␣': system.selectNextSourceInInputMenu },
  { w: toKey('w', '⌘') },
  withMapper([6, 7, 8, 9, 0, 'p', '/', '[', ']'])((k) => map(k).to(k, '⌘')),
]

export const primaryRight = [
  withCondition(ifIde)({
    '⏎': ide.other_showContextActions,
  }),

  { '⇥': toKey('⇥', '⌘') },
  withMapper([
    ...([1, 2, 3, 4, 5] as const),
    ...(['q', 'w', 'e', 'r', 't'] as const),
    ...(['a', 's', 'd', 'f', 'g'] as const),
    ...(['z', 'x', 'c', 'v', 'b'] as const),
  ])((k) => map(k).to(k, '⌘')),
]

export const primaryLeftNoArrows = [
  withCondition(ifIde)({
    '[': ide.editorTabs_gotoPreviousSplitter,
    ']': ide.editorTabs_gotoNextSplitter,
  }),
  withCondition(ifArc)({
    '[': arc.switchToPreviousSplitView,
    ']': arc.switchToNextSplitView,
  }),

  withMapper([
    ...([6, 7, 8, 9] as const),
    ...(['y', 'u', 'i', 'o'] as const),
    ...(['h', 'j', 'k', 'l'] as const),
    ...(['n', 'm', ',', '.'] as const),
  ])((k) => map(k).to(k, '⌘')),
]
