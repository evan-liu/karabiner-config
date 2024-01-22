import { map, toKey, withMapper } from 'karabiner.ts'

// ! @ # $ % ^ & * ( )
// 1 2 3 4 5 6 7 8 9 0
export const symbols = [
  withMapper({
    y: '&', // 7
    u: '}',
    i: ']',
    o: ')', // 0

    h: '^', // 6
    j: '{',
    k: '[',
    l: '(', // 9
    ';': '$', // 4

    n: '%', // 5
    m: '!', // 1
    ',': '@', // 2
    '.': '#', // 3
    '/': '*', // 8

    '␣': '_',
  } as const)((k, v) => map(k).to(toSymbol[v])),
]

export const toSymbol = {
  '!': toKey(1, '⇧'),
  '@': toKey(2, '⇧'),
  '#': toKey(3, '⇧'),
  $: toKey(4, '⇧'),
  '%': toKey(5, '⇧'),
  '^': toKey(6, '⇧'),
  '&': toKey(7, '⇧'),
  '*': toKey(8, '⇧'),
  '(': toKey(9, '⇧'),
  ')': toKey(0, '⇧'),

  '[': toKey('['),
  ']': toKey(']'),
  '{': toKey('[', '⇧'),
  '}': toKey(']', '⇧'),

  '-': toKey('-'),
  '=': toKey('='),
  _: toKey('-', '⇧'),
  '+': toKey('=', '⇧'),

  ';': toKey(';'),
  '/': toKey('/'),
  ':': toKey(';', '⇧'),
  '?': toKey('/', '⇧'),

  ',': toKey(','),
  '.': toKey('.'),
  '<': toKey(',', '⇧'),
  '>': toKey('.', '⇧'),
}
