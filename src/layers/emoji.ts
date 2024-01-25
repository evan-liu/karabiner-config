import { map, toKey, toPaste, withMapper } from 'karabiner.ts'
import { system } from '../apps/system'

// See https://gitmoji.dev/
const emojiMap = {
  b: '🐛', // Fix a bug
  c: '🔧', // add or update Configuration files
  d: '📝', // add or update Documentation
  f: '🚩', // add, update, or remove Feature Flags
  h: '💯', // _hundred
  j: '😂', // _joy
  m: '🔀', // Merge branches
  n: '✨', // introduce New features
  p: '👍', // _plus_one +1
  r: '♻️', // Refactor code
  s: '😅', // _sweat_smile
  t: '🤔', // _thinking_face
  u: '⬆️', // Upgrade dependencies
  v: '🔖', // release / Version tags
}

export const emojiHint = Object.entries(emojiMap)
  .reduce(
    (r, [k, v]) => [r[0].concat(v), r[1].concat(k.toUpperCase())],
    [[] as string[], [] as string[]],
  )
  .map((v, i) => v.join(i === 0 ? ' ' : '    '))
  .join('\n')

export const emoji = [
  map(';').to(system.emojiPicker),

  withMapper(emojiMap)((k, v) => map(k).toPaste(v)),

  { 2: toPaste('⌫'), 3: toPaste('⌦'), 4: toPaste('⇥'), 5: toPaste('⎋') },
  { 6: toPaste('⌘'), 7: toPaste('⌥'), 8: toPaste('⌃'), 9: toPaste('⇧') },
  { 0: toPaste('⇪'), ',': toPaste('‹'), '.': toPaste('›') },

  withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⌫', '⌦'])((k) =>
    map(k).toPaste(k),
  ),

  // Code snippets
  map('l').toTypeSequence('console.log()←'),
  map("'").toTypeSequence('⌫"'),
  map('[').toTypeSequence('[␣]␣'),
  map(']').toTypeSequence('-␣[␣]␣'),

  { "'": toKey('⌫'), '\\': toKey('⌦') },
]
