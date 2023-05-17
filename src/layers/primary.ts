import { map, toKey, withCondition, withMapper } from 'karabiner.ts'
import { arc, ifArc } from '../apps/arc'
import { ide, ifIde } from '../apps/jetbrains-ide'
import { system } from '../apps/system'

export const leftSideAllKeys = [
  ...(['`', '⇥', '⎋'] as const),
  ...([1, 2, 3, 4, 5] as const),
  ...(['q', 'w', 'e', 'r', 't'] as const),
  ...(['a', 's', 'd', 'f', 'g'] as const),
  ...(['z', 'x', 'c', 'v', 'b'] as const),
  ...(['-', '='] as const),
]
export const rightSideAllKeys = [
  ...([6, 7, 8, 9, 0] as const),
  ...(['y', 'u', 'i', 'o', 'p'] as const),
  ...(['h', 'j', 'k', 'l', ';'] as const),
  ...(['n', 'm', ',', '.', '/'] as const),
  ...(['[', ']'] as const),
]
export const rightSideNoArrowKeys = [6, 7, 8, 9, 0, 'p', '/', '[', ']'] as const

// f,d
export const primaryLeft = [
  withCondition(ifArc)({
    p: arc.openCommandBar,
    ';': arc.addSplitView,
  }),
  withCondition(ifIde)({
    p: ide.other_runAnyThing,
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
  withMapper(rightSideNoArrowKeys)((k) => map(k).to(k, '⌘')),
]

// f,w
export const primaryLeftNoArrows = [
  withCondition(ifIde)({
    '[': ide.editorTabs_gotoPreviousSplitter,
    ']': ide.editorTabs_gotoNextSplitter,
  }),
  withCondition(ifArc)({
    '[': arc.switchToPreviousSplitView,
    ']': arc.switchToNextSplitView,
  }),

  withMapper(rightSideAllKeys)((k) => map(k).to(k, '⌘')),
]

// j,k
export const primaryRight = [
  withCondition(ifIde)({
    '⏎': ide.other_showContextActions,
  }),

  withMapper(leftSideAllKeys)((k) => map(k).to(k, '⌘')),
]
