import { layer, map } from 'karabiner.ts'

export const slashMode = layer('/', 'slash-mode').manipulators([
  map(1).toPaste('⌘'),
  map(2).toPaste('⌥'),
  map(3).toPaste('⌃'),
  map(4).toPaste('⇧'),
  map(5).toPaste('⇪'),

  map('←').toPaste('←'),
  map('→').toPaste('→'),
  map('↑').toPaste('↑'),
  map('↓').toPaste('↓'),
  map('␣').toPaste('␣'),
  map('⏎').toPaste('⏎'),
  map('⇥').toPaste('⇥'),
  map('⎋').toPaste('⎋'),
  map('⌫').toPaste('⌫'),
  map('⌦').toPaste('⌦'),
  map('-').toPaste('⎽'),
  map('⇪').toPaste('⇪'),
])
