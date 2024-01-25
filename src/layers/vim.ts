import {
  ifVar,
  map,
  rule,
  toKey,
  toNotificationMessage,
  toRemoveNotificationMessage,
  toSetVar,
  withCondition,
  withModifier,
} from 'karabiner.ts'
import { toLocalSound } from '../utils/sounds'

export const vimHint = `\
←  ↓  ↑  →     ⌫ 
H  J    K   L       '`

export const vimNormalMode = [
  withModifier('??')({
    h: toKey('←'),
    j: toKey('↓'),
    k: toKey('↑'),
    l: toKey('→'),

    ';': toKey('›⇧'),
    d: toKey('‹⌘'),
    s: toKey('‹⌃'),
    a: toKey('‹⌥'),
  }),

  {
    b: toKey('←', '⌥'),
    e: toKey('→', '⌥'),

    y: toKey('c', '⌘'),
    p: toKey('v', '⌘'),
    x: toKey('x', '⌘'),
    u: toKey('z', '⌘'),
  },

  { "'": toKey('⌫'), '\\': toKey('⌦') },
]

export const toVimNormalMode = [
  toNotificationMessage('vim', 'Vim - Normal Mode'),
  toSetVar('vim', 1),
  toSetVar('vim-mode', 'normal'),
  toLocalSound('pop'),
]

export const toVimVisualMode = [
  toNotificationMessage('vim', 'Vim - Visual Mode'),
  toSetVar('vim', 1),
  toSetVar('vim-mode', 'visual'),
  toLocalSound('pop'),
]

export const toDisableVim = [
  toRemoveNotificationMessage('vim'),
  toSetVar('vim', 0),
  toSetVar('vim-mode', ''),
]

export const vimModes = rule('vim-modes', ifVar('vim')).manipulators([
  withCondition(ifVar('vim-mode', 'normal'))([
    map('⎋').to(toDisableVim),
    map('⇪').to(toDisableVim),
    map('i').to(toDisableVim),
    map('v').to(toVimVisualMode),
  ]),

  withCondition(ifVar('vim-mode', 'visual'))([
    map('⎋').to(toVimNormalMode),
    map('⇪').to(toDisableVim),

    map('y').to('c', '⌘').to(toVimNormalMode),
    map('x').to('x', '⌘').to(toVimNormalMode),

    {
      h: toKey('←', '⇧'),
      j: toKey('↓', '⇧'),
      k: toKey('↑', '⇧'),
      l: toKey('→', '⇧'),

      b: toKey('←', '⌥⇧'),
      e: toKey('→', '⌥⇧'),
    },
  ]),
])
