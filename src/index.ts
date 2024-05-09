import {
  duoLayer,
  layer,
  mapSimultaneous,
  rule,
  writeToProfile,
} from 'karabiner.ts'
import { appleKeyboard } from './devices/apple-keyboard'
import { digitsAndDel, digitsAndDelHint } from './layers/digits-delete'
import { emoji, emojiHint } from './layers/emoji'
import { launchApp } from './layers/launch-app'
import { openLinks } from './layers/open-links'
import { symbols, symbolsHint } from './layers/symbols'
import { system } from './layers/system'
import { vim, vimHint } from './layers/vim'
import { appMappings } from './rules/app-mappings'
import { raycastMappings } from './rules/raycast-mappings'
import { duoModifier } from './utils/duo-modifier'

const rules = [
  rule('duo-modifiers').manipulators([
    duoModifier('fd', '⌘'),
    duoModifier('fs', '⌃'),
    duoModifier('fa', '⌥'),

    duoModifier('ds', '⇧'),

    duoModifier('gd', '⌘⇧'),
    duoModifier('gs', '⌃⇧'),
    duoModifier('ga', '⌥⇧'),

    duoModifier('vc', '⌘⌥'),
    duoModifier('vx', '⌘⌃'),
    duoModifier('cx', '⌥⌃'),

    duoModifier('vz', '⌘⌥⌃'),

    duoModifier('jk', '⌘'),
    duoModifier('jl', '⌃'),
    duoModifier('j;', '⌥'),

    duoModifier('kl', '⇧'),

    duoModifier('hk', '⌘⇧'),
    duoModifier('hl', '⌃⇧'),
    duoModifier('h;', '⌥⇧'),

    duoModifier('m,', '⌘⌥'),
    duoModifier('m.', '⌘⌃'),
    duoModifier(',.', '⌥⌃'),

    duoModifier('m/', '⌘⌥⌃'),
  ]),

  // ; can be released once layer is activated
  duoLayer('f', ';').manipulators(vim).notification(vimHint),
  duoLayer('s', ';').manipulators(symbols).notification(symbolsHint),
  duoLayer('d', ';').manipulators(digitsAndDel).notification(digitsAndDelHint),

  duoLayer('z', 'x').manipulators(emoji).notification(emojiHint),
  duoLayer('l', ';').manipulators(launchApp).notification('Launch App 🚀 📱'),
  duoLayer('.', '/').manipulators(openLinks).notification('Open Link 🔗'),

  layer('`', 'system').manipulators(system),

  rule('Homerow').manipulators([
    mapSimultaneous(['f', 'j']).to('␣', 'Hyper'), // Click
    mapSimultaneous(['f', 'k']).to('⏎', 'Hyper'), // Scroll
  ]),

  appleKeyboard,
  appMappings,
  raycastMappings,
]

writeToProfile('Default', rules, {
  'basic.simultaneous_threshold_milliseconds': 50,
  'duo_layer.threshold_milliseconds': 100,
  'duo_layer.notification': true,
})
