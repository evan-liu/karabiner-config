import { layer, map, NumberKeyValue, withMapper } from 'karabiner.ts'

export const emojiMode = layer(['z', '/'], 'emoji-mode').manipulators([
  // See https://gitmoji.dev/
  withMapper({
    b: '👷', // add or update ci Build system
    c: '✅', // _check
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

  //           1    2    3    4    5
  withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
    map((i + 1) as NumberKeyValue).toPaste(k),
  ),

  //           Paste the symbols instead of triggering the key
  withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪'])((k) =>
    map(k).toPaste(k),
  ),
  map(',').toPaste('‹'),
  map('.').toPaste('›'),
])
