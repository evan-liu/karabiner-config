import {
  duoLayer,
  ifVar,
  layer,
  mapSimultaneous,
  rule,
  writeToProfile,
} from 'karabiner.ts'
import { appleKeyboard } from './devices/apple-keyboard'
import { ifMoonlander, mouseCursor } from './devices/moonlander'
import { appModifiers } from './rules/app-modifiers'
import { emoji, emojiHint } from './layers/emoji'
import { launchApp } from './layers/launch-app'
import { appOverrides } from './rules/app-overrides'
import { openLinks } from './layers/open-links'
import { digitsAndDelete } from './layers/digits-delete'
import { toLocalSound } from './utils/sounds'
import { symbols } from './layers/symbols'
import { duoModifier } from './utils/duo-modifier'
import {
  toVimNormalMode,
  toVimVisualMode,
  vimNormalMode,
  vimModes,
} from './layers/vim'

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

  rule('to vim modes', ifVar('vim').unless()).manipulators([
    mapSimultaneous(['a', ';']).to(toVimNormalMode),
    mapSimultaneous(['v', ';']).to(toVimVisualMode),
  ]),

  // ; can be released once layer is activated
  duoLayer('f', ';', 'vim')
    .condition(ifVar('vim-mode', 'visual').unless())
    .manipulators(vimNormalMode)
    .notification('vim - h ← j ↓ k ↑ l →')
    .toIfActivated(toLocalSound('pop')),
  duoLayer('s', ';')
    .manipulators(symbols)
    .notification('^ { [ ( $,    _ } ] ),\n% _ = - +')
    .toIfActivated(toLocalSound('pop')),
  duoLayer('d', ';')
    .manipulators(digitsAndDelete)
    .notification('_ 4 5 6 ⌫,   _ 7 8 9,\n0 1 2 3')
    .toIfActivated(toLocalSound('pop')),

  duoLayer('z', 'x')
    .manipulators(emoji)
    .notification(emojiHint)
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

  vimModes,
  appleKeyboard,
  appModifiers,
  appOverrides,
]

writeToProfile('Default', rules, {
  'basic.simultaneous_threshold_milliseconds': 100,
  'duo_layer.threshold_milliseconds': 200,
  'duo_layer.notification': true,
})
