import { toKey, withCondition } from 'karabiner.ts'
import { arc, ifArc } from '../apps/arc'
import { ide, ifIde } from '../apps/jetbrains-ide'
import { system } from '../apps/system'

export const secondaryLeft = [
  withCondition(ifArc)({
    '[': arc.previousTab,
    ']': arc.nextTab,
  }),
  withCondition(ifIde)({
    '[': ide.editorTabs_selectPreviousTab,
    ']': ide.editorTabs_selectNextTab,

    7: ide.navigateInFile_previousHighlightedError,
    8: ide.navigateInFile_nextHighlightedError,
    u: ide.navigateInFile_previousMethod,
    i: ide.navigateInFile_nextMethod,

    j: ide.code_moveLineUp,
    k: ide.code_moveLineDown,
    m: ide.code_moveStatementUp,
    ',': ide.code_moveStatementDown,

    ';': ide.delete_line,
    6: ide.delete_toCamelWordStart,
    9: ide.delete_toCamelWordEnd,
  }),

  { h: toKey('⌫'), l: toKey('⌦') },
  { n: toKey('⌫', '⌘'), '.': toKey('⌦', '⌘') },
  { y: toKey('⌫', '⌥'), o: toKey('⌦', '⌥') },

  { z: toKey('z', '⌘⇧') },
  { '⏎': toKey('⏎', '⌃'), '␣': system.emojiPicker },
]

export const secondaryRight = [
  withCondition(ifIde)({
    '⏎': ide.editorActions_startNewLineBeforeCurrent,
    f: ide.find_addSelectionForNextOccurrence,
  }),
  withCondition(ifArc)({
    c: arc.copyPageUrl,
  }),

  { '⇥': toKey('`', '⌘') },
]
