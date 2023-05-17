import { map, toPaste, withMapper } from 'karabiner.ts'

export const emojiSymbol = [
  // See https://gitmoji.dev/
  withMapper({
    b: '👷', // add or update ci Build system
    c: '🔧', // Add or update Configuration files
    d: '📝', // add or update Documentation
    f: '🐛', // Fix a bug
    h: '💯', // _hundred
    j: '😂', // _joy
    m: '🔀', // Merge branches
    n: '✨', // introduce New features
    p: '👍', // _plus_one +1
    r: '♻️', // Refactor code
    s: '😅', // _sweat_smile
    t: '🧪', // _test
    u: '⬆️', // Upgrade dependencies
    v: '🔖', // release / Version tags
  })((k, v) => map(k).toPaste(v)),

  withMapper({ 4: '⇥', 5: '⎋', 6: '⌘', 7: '⌥', 8: '⌃', 9: '⇧', 0: '⇪' })(
    (k, v) => map(k).toPaste(v),
  ),
  withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⌫', '⌦'])((k) =>
    map(k).toPaste(k),
  ),
  { ',': toPaste('‹'), '.': toPaste('›') },

  // Code snippets
  map('l').toTypeSequence('console.log()←'),
]
