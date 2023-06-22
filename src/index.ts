import {
  duoLayer,
  layer,
  mapSimultaneous,
  rule,
  simlayer,
  writeToProfile,
} from 'karabiner.ts'
import { appleKeyboard } from './devices/apple-keyboard'
import { ifMoonlander, mouseCursor } from './devices/moonlander'
import { appModifiers } from './rules/app-modifiers'
import { emojiSymbol } from './layers/emoji-symbol'
import { launchApp } from './layers/launch-app'
import { arrowDelete, arrowMode, arrowSelect } from './layers/arrows'
import { appOverrides } from './rules/app-overrides'

const rules = [
  rule('sim-modifiers').manipulators([
    // ‹⌘⌥⌃ == dsa + f
    mapSimultaneous(['f', 'd']).to('‹⌘'),
    mapSimultaneous(['f', 's']).to('‹⌥'),
    mapSimultaneous(['f', 'a']).to('‹⌃'),

    mapSimultaneous(['d', 's']).to('‹⇧'),

    // ‹⌘⌥⌃ + ⇧ == dsa + g
    mapSimultaneous(['g', 'd']).to('‹⌘', '⇧'),
    mapSimultaneous(['g', 's']).to('‹⌥', '⇧'),
    mapSimultaneous(['g', 'a']).to('‹⌃', '⇧'),

    mapSimultaneous(['f', 'x']).to('‹⌃', '⌥⇧'), // Meh ⌥⌃⇧
    mapSimultaneous(['f', 'z']).to('‹⌃', '⌘⌥⇧'), // Hyper ⌘⌥⌃⇧
    mapSimultaneous(['v', 'z']).to('‹⌃', '⌘⌥'), // ⌘⌥⌃

    mapSimultaneous(['v', 'c']).to('‹⌘', '⌥'),
    mapSimultaneous(['v', 'x']).to('‹⌘', '⌃'),
    mapSimultaneous(['c', 'x']).to('‹⌥', '⌃'),

    // ›⌘⌥⌃ == kl; + j
    mapSimultaneous(['j', 'k']).to('›⌘'),
    mapSimultaneous(['j', 'l']).to('›⌥'),
    mapSimultaneous(['j', ';']).to('›⌃'),

    mapSimultaneous(['k', 'l']).to('›⇧'),

    // ›⌘⌥⌃ + ⇧ == kl; + h
    mapSimultaneous(['h', 'k']).to('›⌘', '⇧'),
    mapSimultaneous(['h', 'l']).to('›⌥', '⇧'),
    mapSimultaneous(['h', ';']).to('›⌃', '⇧'),

    mapSimultaneous(['j', '.']).to('›⌃', '⌥⇧'), // Meh
    mapSimultaneous(['j', '/']).to('›⌃', '⌘⌥⇧'), // Hyper
    mapSimultaneous(['m', '/']).to('›⌃', '⌘⌥'), // Hyper

    mapSimultaneous(['m', ',']).to('›⌘', '⌥'), // Meh ⌥⌃⇧
    mapSimultaneous(['m', '.']).to('›⌘', '⌃'), // Hyper ⌘⌥⌃⇧
    mapSimultaneous([',', '.']).to('›⌥', '⌃'), // ⌘⌥⌃
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
]

writeToProfile('Default', rules, {
  'basic.simultaneous_threshold_milliseconds': 40,
  'simlayer.threshold_milliseconds': 120,
})
