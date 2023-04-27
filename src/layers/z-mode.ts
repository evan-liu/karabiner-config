import { layer, map } from 'karabiner.ts'

// See https://gitmoji.dev/
export const zMode = layer('z', 'z-mode').manipulators([
  map('b').toPaste('👷'), // add or update ci Build system
  map('c').toPaste('✅'), // _check
  map('d').toPaste('📝'), // add or update Documentation
  map('f').toPaste('🐛'), // Fix a bug
  map('h').toPaste('💯'), // _hundred
  map('j').toPaste('😂'), // _joy
  map('m').toPaste('🔀'), // Merge branches
  map('n').toPaste('✨'), // introduce New features
  map('p').toPaste('👍'), // _plus_one +1
  map('r').toPaste('♻️'), // Refactor code
  map('s').toPaste('😅'), // _sweat_smile
  map('t').toPaste('🧪'), // _test
  map('u').toPaste('⬆️'), // Upgrade dependencies
  map('v').toPaste('🔖'), // release / Version tags
])
