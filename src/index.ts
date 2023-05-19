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

writeToProfile('Default', [
  appleKeyboard,
  appModifiers,

  rule('sim-modifiers').manipulators([
    mapSimultaneous(['f', 'd']).to('‹⌘'),
    mapSimultaneous(['f', 's']).to('‹⌘', '⇧'),
    mapSimultaneous(['f', 'w']).to('‹⌥'),
    mapSimultaneous(['f', 'x']).to('‹⌃'),

    mapSimultaneous(['j', 'k']).to('›⌘'),
    mapSimultaneous(['j', 'l']).to('›⌘', '⇧'),
    mapSimultaneous(['j', ';']).to('›⌥'),
    mapSimultaneous(['j', '.']).to('›⌃'),

    mapSimultaneous(['v', 'c']).to('‹⌘', '⌥'),
    mapSimultaneous(['v', 'x']).to('‹⌘', '⌃'),
    mapSimultaneous(['c', 'x']).to('‹⌥', '⌃'),

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

  // -- 🥇 Primary -- //
  duoLayer('z', 'f').manipulators([
    withCondition(ifArc)({ '[': arc.previousTab, ']': arc.nextTab }),
    withCondition(ifIde)({
      '[': ide.editorTabs_selectPreviousTab,
      ']': ide.editorTabs_selectNextTab,

      j: ide.code_moveLineUp,
      k: ide.code_moveLineDown,
    }),
  ]),
  duoLayer('/', 'j').condition(ifIde).manipulators({
    '⏎': ide.runFile,

    t: ide.navigate_byReference_typeDeclaration,
    r: ide.run_run,
    e: ide.run_editConfigurations,
    w: ide.editorTabs_closeOtherTabs,
    // q

    g: ide.find_selectAllOccurrences,
    f: ide.find_addSelectionForNextOccurrence,
    d: ide.run_debug,
    s: ide.run_stop,
    a: ide.other_runAnyThing,

    // b
    v: ide.edit_findUsages_findUsages,
    // x
    // z

    1: ide.toolWindow_stretchToLeft,
    2: ide.toolWindow_stretchToTop,
    3: ide.toolWindow_stretchToBottom,
    4: ide.toolWindow_stretchToRight,
    5: ide.find_unselectOccurrence,

    '↑': ide.navigate_byReference_superMethod,
    '↓': ide.navigate_byReference_implementations,
  }),

  // -- 🥈 Secondary -- //
  duoLayer('z', 'd').manipulators([
    withCondition(ifArc)({ '[': arc.previousSpace, ']': arc.nextSpace }),
    withCondition(ifIde)({
      '[': ide.switcherBackward,
      ']': ide.switcher,

      j: ide.code_moveStatementUp,
      k: ide.code_moveStatementDown,

      '↑': ide.edit_cloneCaret_above,
      '↓': ide.edit_cloneCaret_below,
      '⏎': ide.edit_addCaretsToEndsOfSelectedLines,
    }),
  ]),

  // -- 🥉 Tertiary -- //
  duoLayer('z', 'l').manipulators([
    withCondition(ifArc)({
      ';': arc.addSplitView,
      '[': arc.switchToPreviousSplitView,
      ']': arc.switchToNextSplitView,
    }),
    withCondition(ifIde)({
      ';': ide.editorTabs_splitAndMoveRight,
      '[': ide.editorTabs_gotoPreviousSplitter,
      ']': ide.editorTabs_gotoNextSplitter,

      j: ide.shrinkSelection,
      k: ide.expendSelection,
    }),
  ]),
])
