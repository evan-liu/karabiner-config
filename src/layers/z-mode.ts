import { layer, map } from 'karabiner.ts'

export const zMode = layer('z', 'z-mode').manipulators([
  map('m').toPaste('🔀'), // Merge branches
  map('n').toPaste('✨'), // Introduce New features
  map('v').toPaste('🔖'), // Release / Version tags

  map('j').toPaste('😂'), // (j)oy
  map('i').toPaste('😅'), // sweat_sm(i)le
  map('u').toPaste('👍'), // thumbs(u)p

  map('c').toPaste('✅'), // Check
  map('e').toPaste('❗️'), // Exclamation
  map('k').toPaste('❓'), // (k)question
])
