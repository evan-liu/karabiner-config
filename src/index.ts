import { duoLayer, layer, rule, writeToProfile } from 'karabiner.ts'
import { appleKeyboard } from './devices/apple-keyboard'
import { ifMoonlander, mouseCursor } from './devices/moonlander'
import { appModifiers } from './rules/app-modifiers'
import { emojiSymbol } from './layers/emoji-symbol'
import { launchApp } from './layers/launch-app'
import { arrowDelete, arrowMode, arrowSelect } from './layers/arrows'
import { appOverrides } from './rules/app-overrides'
import { openLinks } from './layers/open-links'
import { numbers } from './layers/numbers'
import { duoModifier } from './utils/duo-modifier'
import { toLocalSound } from './utils/sounds'

const rules = [
  rule('duo-modifiers').manipulators([
    // ‹⌘⌥⌃ == dsa + f
    duoModifier('fd', '⌘'),
    duoModifier('fs', '⌥'),
    duoModifier('fa', '⌃'),

    duoModifier('ds', '⇧'),

    // ‹⌘⌥⌃ + ⇧ == dsa + g
    duoModifier('gd', '⌘⇧'),
    duoModifier('gs', '⌥⇧'),
    duoModifier('ga', '⌃⇧'),

    duoModifier('vc', '⌘⌥'),
    duoModifier('vx', '⌘⌃'),
    duoModifier('cx', '⌥⌃'),

    duoModifier('vz', '⌘⌥⌃'),

    // ›⌘⌥⌃ == kl; + j
    duoModifier('jk', '⌘'),
    duoModifier('jl', '⌥'),
    duoModifier('j;', '⌃'),

    duoModifier('kl', '⇧'),

    // ›⌘⌥⌃ + ⇧ == kl; + h
    duoModifier('hk', '⌘⇧'),
    duoModifier('hl', '⌥⇧'),
    duoModifier('h;', '⌃⇧'),

    duoModifier('m,', '⌘⌥'),
    duoModifier('m.', '⌘⌃'),
    duoModifier(',.', '⌥⌃'),

    duoModifier('m/', '⌘⌥⌃'),
  ]),

  // ; can be released once layer is activated
  duoLayer('f', ';').manipulators(arrowMode).notification('Arrow ← → ↑ ↓'),
  duoLayer('d', ';').manipulators(arrowDelete).notification('Delete ❌ ⌫ ⌦'),
  duoLayer('s', ';').manipulators(arrowSelect).notification('Select ⇧ ← ⇧ →'),
  duoLayer('a', ';').manipulators(numbers).notification('Numbers 0️⃣ 1️⃣ 2️⃣ 3️⃣'),

  duoLayer('z', 'x')
    .manipulators(emojiSymbol)
    .notification('Emoji 😀 ⌘ ⏎')
    .toIfActivated(toLocalSound('pop')),
  duoLayer('l', ';')
    .manipulators(launchApp)
    .notification('Launch App 🚀 📱')
    .toIfActivated(toLocalSound('pop')),
  duoLayer('.', '/')
    .manipulators(openLinks)
    .notification('Open Link 🔗')
    .toIfActivated(toLocalSound('pop')),

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
