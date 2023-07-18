import {
  duoLayer,
  layer,
  mapSimultaneous,
  rule,
  writeToProfile,
} from 'karabiner.ts'
import { appleKeyboard } from './devices/apple-keyboard'
import { ifMoonlander, mouseCursor } from './devices/moonlander'
import { appModifiers } from './rules/app-modifiers'
import { emojiSymbol } from './layers/emoji-symbol'
import { launchApp } from './layers/launch-app'
import { arrowDelete, arrowMode, arrowSelect } from './layers/arrows'
import { appOverrides } from './rules/app-overrides'
import { openLinks } from './layers/open-links'
import { numbers } from './layers/numbers'

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

    mapSimultaneous(['v', 'c']).to('‹⌘', '⌥'),
    mapSimultaneous(['v', 'x']).to('‹⌘', '⌃'),
    mapSimultaneous(['c', 'x']).to('‹⌥', '⌃'),

    mapSimultaneous(['v', 'z']).to('‹⌃', '⌘⌥'), // ⌘⌥⌃

    // ›⌘⌥⌃ == kl; + j
    mapSimultaneous(['j', 'k']).to('›⌘'),
    mapSimultaneous(['j', 'l']).to('›⌥'),
    mapSimultaneous(['j', ';']).to('›⌃'),

    mapSimultaneous(['k', 'l']).to('›⇧'),

    // ›⌘⌥⌃ + ⇧ == kl; + h
    mapSimultaneous(['h', 'k']).to('›⌘', '⇧'),
    mapSimultaneous(['h', 'l']).to('›⌥', '⇧'),
    mapSimultaneous(['h', ';']).to('›⌃', '⇧'),

    mapSimultaneous(['m', ',']).to('›⌘', '⌥'),
    mapSimultaneous(['m', '.']).to('›⌘', '⌃'),
    mapSimultaneous([',', '.']).to('›⌥', '⌃'),

    mapSimultaneous(['m', '/']).to('›⌃', '⌘⌥'), // ⌘⌥⌃
  ]),

  // ; can be released once layer is activated
  duoLayer('f', ';').manipulators(arrowMode).notification('Arrow ← → ↑ ↓'),
  duoLayer('d', ';').manipulators(arrowDelete).notification('Delete ❌ ⌫ ⌦'),
  duoLayer('s', ';').manipulators(arrowSelect).notification('Select ⇧ ← ⇧ →'),
  duoLayer('a', ';').manipulators(numbers).notification('Numbers 0️⃣ 1️⃣ 2️⃣ 3️⃣'),

  duoLayer('z', 'x').manipulators(emojiSymbol).notification('Emoji 😀 ⌘ ⏎'),
  duoLayer('l', ';').manipulators(launchApp).notification('Launch App 🚀 📱'),
  duoLayer('.', '/').manipulators(openLinks).notification('Open Link 🔗'),

  layer('`', 'mouse').condition(ifMoonlander).manipulators(mouseCursor),

  appleKeyboard,
  appModifiers,
  appOverrides,
]

writeToProfile('Default', rules, {
  'basic.simultaneous_threshold_milliseconds': 50,
  'duo_layer.threshold_milliseconds': 200,
  'duo_layer.notification': true,
})
