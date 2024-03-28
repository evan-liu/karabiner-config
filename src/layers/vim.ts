import { toKey, withModifier } from 'karabiner.ts'

export const vimHint = `\
←  ↓  ↑  →     ⌫ 
H  J    K   L       '`

export const vim = [
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

  { "'": toKey('⌫'), '\\': toKey('⌦') },
]
