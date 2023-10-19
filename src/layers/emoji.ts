import { map, toPaste, withMapper } from 'karabiner.ts'
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
  .map(([k, v]) => `${v} ${k}`)
  .join('    ')

export const emoji = [
  map(';').to(system.emojiPicker),

  withMapper(emojiMap)((k, v) => map(k).toPaste(v)),

  withMapper({ 4: '⇥', 5: '⎋', 6: '⌘', 7: '⌥', 8: '⌃', 9: '⇧', 0: '⇪' })(
    (k, v) => map(k).toPaste(v),
  ),
  withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⌫', '⌦'])((k) =>
    map(k).toPaste(k),
  ),
  { ',': toPaste('‹'), '.': toPaste('›') },

  // Code snippets
  map('l').toTypeSequence('console.log()←'),
  map("'").toTypeSequence('⌫"'),
  map('[').toTypeSequence('[␣]␣'),
  map(']').toTypeSequence('-␣[␣]␣'),
]
