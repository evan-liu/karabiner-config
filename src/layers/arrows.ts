import { toKey, withCondition } from 'karabiner.ts'
import { ide, ifIde } from '../apps/jetbrains-ide'

export const arrowMode = {
  j: toKey('←'),
  i: toKey('↑'),
  k: toKey('↓'),
  l: toKey('→'),

  h: toKey('←', '⌘'),
  8: toKey('↑', '⌘'),
  ',': toKey('↓', '⌘'),
  ';': toKey('→', '⌘'),

  m: toKey('←', '⌥'),
  '.': toKey('→', '⌥'),

  n: toKey('←', '⌃'),
  '/': toKey('→', '⌃'),
}

export const arrowDelete = [
  withCondition(ifIde)({ ';': ide.delete_line }),

  {
    j: toKey('⌫'),
    l: toKey('⌦'),

    h: toKey('⌫', '⌘'),
    ';': toKey('⌦', '⌘'),

    m: toKey('⌫', '⌥'),
    '.': toKey('⌦', '⌥'),

    n: toKey('⌫', '⌃'),
    '/': toKey('⌦', '⌃'),
  },
]

export const arrowSelect = [
  withCondition(ifIde)({
    '↑': ide.expendSelection,
    '↓': ide.shrinkSelection,
  }),

  {
    j: toKey('←', '⇧'),
    i: toKey('↑', '⇧'),
    k: toKey('↓', '⇧'),
    l: toKey('→', '⇧'),

    h: toKey('←', '⌘⇧'),
    8: toKey('↑', '⌘⇧'),
    ',': toKey('↓', '⌘⇧'),
    ';': toKey('→', '⌘⇧'),

    m: toKey('←', '⌥⇧'),
    '.': toKey('→', '⌥⇧'),

    n: toKey('←', '⌃⇧'),
    '/': toKey('→', '⌃⇧'),
  },
]
