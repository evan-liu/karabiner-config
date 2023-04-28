import { layer, map, NumberKeyValue, withMapper } from 'karabiner.ts'

export const slashMode = layer('/', 'slash-mode').manipulators([
  //           1    2    3    4    5
  withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
    map((i + 1) as NumberKeyValue).toPaste(k),
  ),

  //           Paste the symbols instead of triggering the key
  withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪'])((k) =>
    map(k).toPaste(k),
  ),
])
