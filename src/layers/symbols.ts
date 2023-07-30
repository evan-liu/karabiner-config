import { map, toKey, withMapper } from 'karabiner.ts'

export const symbols = [
  withMapper({
    y: '#',
    u: '}',
    i: ']',
    o: ')',

    h: '^',
    j: '{',
    k: '[',
    l: '(',
    ';': '$',

    n: '%',
    m: '_',
    ',': '=',
    '.': '-',
    '/': '+',
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
