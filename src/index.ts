import {
  duoLayer,
  layer,
  mapSimultaneous,
  rule,
  simlayer,
  withCondition,
  writeToProfile,
} from 'karabiner.ts'
import { appleKeyboard } from './devices/apple-keyboard'
import { ifMoonlander, mouseCursor } from './devices/moonlander'
import { appModifiers } from './rules/app-modifiers'
import { emojiSymbol } from './layers/emoji-symbol'
import { launchApp } from './layers/launch-app'
import { arrowDelete, arrowMode, arrowSelect } from './layers/arrows'
import { arc, ifArc } from './apps/arc'
import { ide, ifIde } from './apps/jetbrains-ide'
import { appOverrides } from './rules/app-overrides'

writeToProfile('Default', [
  rule('sim-modifiers').manipulators([
    mapSimultaneous(['f', 'd']).to('‹⌘'),
    mapSimultaneous(['f', 's']).to('‹⌘', '⇧'),

    mapSimultaneous(['f', 'w']).to('‹⌥'),
    mapSimultaneous(['f', 'x']).to('‹⌃'),

    mapSimultaneous(['f', 'z']).to('‹⌥', '⇧'),
    mapSimultaneous(['d', 'z']).to('‹⌃', '⇧'),
    mapSimultaneous(['s', 'z']).to('‹⌃', '⌥⇧'), // Meh

    mapSimultaneous(['v', 'c']).to('‹⌘', '⌥'),
    mapSimultaneous(['v', 'x']).to('‹⌘', '⌃'),
    mapSimultaneous(['c', 'x']).to('‹⌥', '⌃'),

    mapSimultaneous(['j', 'k']).to('›⌘'),
    mapSimultaneous(['j', 'l']).to('›⌘', '⇧'),

    mapSimultaneous(['j', ';']).to('›⌥'),
    mapSimultaneous(['j', '.']).to('›⌃'),

    mapSimultaneous(['j', '/']).to('›⌥', '⇧'),
    mapSimultaneous(['k', '/']).to('›⌃', '⇧'),
    mapSimultaneous(['l', '/']).to('›⌃', '⌥⇧'), // Meh

    mapSimultaneous(['m', ',']).to('›⌘', '⌥'),
    mapSimultaneous(['m', '.']).to('›⌘', '⌃'),
    mapSimultaneous([',', '.']).to('›⌥', '⌃'),
  ]),

  simlayer('f', 'arrow-mode').manipulators(arrowMode),
  simlayer('d', 'arrow-delete').manipulators(arrowDelete),
  simlayer('s', 'arrow-select').manipulators(arrowSelect),

  layer('`', 'mouse-mode').condition(ifMoonlander).manipulators(mouseCursor),

  duoLayer('z', 'x').manipulators(emojiSymbol),
  duoLayer('l', ';').manipulators(launchApp),

  appleKeyboard,
  appModifiers,
  appOverrides,
])
