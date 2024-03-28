import { map, toKey, withMapper } from 'karabiner.ts'

export const digitsAndDelHint = `\
0    1  2  3    4  5  6    7  8  9    +  -  /  *    .    ⌫_⌥_⌘  ⌦
N   M  ,   .     J  K  L    U  I  O    P  ;   /  ]    [      '   H   Y    \\`

export const digitsAndDel = [
  // digits keypad_{i}
  withMapper([
    'n', //             // 0
    ...['m', ',', '.'], // 1 2 3
    ...['j', 'k', 'l'], // 4 5 6
    ...['u', 'i', 'o'], // 7 8 9
  ] as const)((k, i) => map(k).to(`keypad_${i as 0}`)),

  // + - / * .
  {
    p: toKey('=', '⇧'), // +
    ';': toKey('-'), // // -
    // / stay           // /
    ']': toKey(8, '⇧'), // *

    '[': toKey('keypad_period'),
  },

  // delete ⌫ ⌦
  {
    '\\': toKey('⌦'),

    "'": toKey('⌫'),
    h: toKey('⌫', '⌥'),
    y: toKey('⌫', '⌘'),
  },

  // F1 - F9
  withMapper([1, 2, 3, 4, 5, 6, 7, 8, 9])((k) => map(k).to(`f${k}`)),
]
