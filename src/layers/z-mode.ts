import { layer, map, withMapper } from 'karabiner.ts'

// See https://gitmoji.dev/
export const zMode = layer('z', 'z-mode').manipulators([
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
])
