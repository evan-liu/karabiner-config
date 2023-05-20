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
    mapSimultaneous(['f', 'w']).to('‹⌥'),
    mapSimultaneous(['f', 'x']).to('‹⌃'),

    mapSimultaneous(['f', 's']).to('‹⌘', '⇧'),
    mapSimultaneous(['f', 'z']).to('‹⌥', '⇧'),
    mapSimultaneous(['d', 'z']).to('‹⌃', '⇧'),

    mapSimultaneous(['v', 'c']).to('‹⌘', '⌥'),
    mapSimultaneous(['v', 'x']).to('‹⌘', '⌃'),
    mapSimultaneous(['c', 'x']).to('‹⌥', '⌃'),

    mapSimultaneous(['j', 'k']).to('›⌘'),
    mapSimultaneous(['j', ';']).to('›⌥'),
    mapSimultaneous(['j', '.']).to('›⌃'),

    mapSimultaneous(['j', 'l']).to('›⌘', '⇧'),
    mapSimultaneous(['j', '/']).to('›⌥', '⇧'),
    mapSimultaneous(['k', '/']).to('›⌃', '⇧'),

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

  duoLayer('z', 's').manipulators([
    withCondition(ifArc)({
      ';': arc.addSplitView,
      '[': arc.switchToPreviousSplitView,
      ']': arc.switchToNextSplitView,
    }),
    withCondition(ifIde)({
      ';': ide.editorTabs_splitAndMoveRight,
      '[': ide.editorTabs_gotoPreviousSplitter,
      ']': ide.editorTabs_gotoNextSplitter,

      '↑': ide.edit_cloneCaret_above,
      '↓': ide.edit_cloneCaret_below,
      '⏎': ide.edit_addCaretsToEndsOfSelectedLines,

      j: ide.toolWindow_stretchToLeft,
      i: ide.toolWindow_stretchToTop,
      k: ide.toolWindow_stretchToBottom,
      l: ide.toolWindow_stretchToRight,
    }),
  ]),

  appleKeyboard,
  appModifiers,
  appOverrides,
])
