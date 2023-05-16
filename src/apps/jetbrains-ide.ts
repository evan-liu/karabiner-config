import { ifApp, toKey } from 'karabiner.ts'

export const ifJetBrainsIde = ifApp('^com.jetbrains.\\w+$')

export const jetBrainsIde = {
  hideAllToolWindows: toKey('h', '⌥'),
  run: toKey('r', '⌥⇧'),
  terminal: toKey(4, '⌥'),
  aceJump: toKey(';', '⌃'),
  //

  // ←
  moveCaret_lineStart: toKey('←', '⌘'),
  moveCaret_previousWord: toKey('←', '⌥'),
  moveCaret_previousCamelWord: toKey('←', '⌃'),
  moveCaret_lineStart_withSelection: toKey('←', '⌘⇧'),
  moveCaret_previousWord_withSelection: toKey('←', '⌥⇧'),
  moveCaret_previousCamelWord_withSelection: toKey('←', '⌃⇧'),

  code_moveElementLeft: toKey('←', '⌘⌥'),

  toolWindow_stretchToLeft: toKey('←', '⌘⌃⇧'),

  // →
  moveCaret_lineEnd: toKey('→', '⌘'),
  moveCaret_nextWord: toKey('→', '⌥'),
  moveCaret_nextCamelWord: toKey('→', '⌃'),
  moveCaret_lineEnd_withSelection: toKey('→', '⌘⇧'),
  moveCaret_nextWord_withSelection: toKey('→', '⌥⇧'),
  moveCaret_nextCamelWord_withSelection: toKey('→', '⌃⇧'),

  code_moveElementRight: toKey('→', '⌘⌥'),

  toolWindow_stretchToRight: toKey('→', '⌘⌃⇧'),

  editorTabs_splitAndMoveRight: toKey('→', '⌘⌥⌃'),

  // ↑

  moveCaret_textStart: toKey('↑', '⌘'),
  expendSelection: toKey('↑', '⌥'),
  scrollUp: toKey('↑', '⌃'),
  moveCaret_textStart_withSelection: toKey('↑', '⌘⇧'),
  code_moveLineUp: toKey('↑', '⌥⇧'),
  code_moveStatementUp: toKey('↑', '⌃⇧'),

  navigateInFile_previousMethod: toKey('↑', '⌘⌥'),
  navigateInFile_previousChange: toKey('↑', '⌘⌃'),
  navigateInFile_previousHighlightedError: toKey('↑', '⌥⌃'),
  findUsages_previousHighlightedUsage: toKey('↑', '⌘⌥⌃'),

  toolWindow_stretchToTop: toKey('↑', '⌘⌃⇧'),

  cloneCaret_above: toKey('↑', '⌘⌥⇧'),

  // ↓

  moveCaret_textEnd: toKey('↓', '⌘'),
  shrinkSelection: toKey('↓', '⌥'),
  scrollDown: toKey('↓', '⌃'),
  moveCaret_textEnd_withSelection: toKey('↓', '⌘⇧'),
  code_moveLineDown: toKey('↓', '⌥⇧'),
  code_moveStatementDown: toKey('↓', '⌃⇧'),

  navigateInFile_nextMethod: toKey('↓', '⌘⌥'),
  navigateInFile_nextChange: toKey('↓', '⌘⌃'),
  navigateInFile_nextHighlightedError: toKey('↓', '⌥⌃'),
  findUsages_nextHighlightedUsage: toKey('↓', '⌘⌥⌃'),

  toolWindow_stretchToBottom: toKey('↓', '⌘⌃⇧'),

  cloneCaret_below: toKey('↓', '⌘⌥⇧'),

  // ⌫
  delete_line: toKey('⌫', '⌘⌥'),
  delete_toLineStart: toKey('⌫', '⌘'),
  delete_toWordStart: toKey('⌫', '⌥'),
  delete_toCamelWordStart: toKey('⌫', '⌃'),

  // ⌦
  delete_toLineEnd: toKey('⌦', '⌘'),
  delete_toWordEnd: toKey('⌦', '⌥'),
  delete_toCamelWordEnd: toKey('⌦', '⌃'),

  //
  refactor_introduceConstant: toKey('c', '⌘⌥'),
  refactor_introduceField: toKey('f', '⌘⌥'),
  refactor_inline: toKey('i', '⌘⌥'),
  refactor_move: toKey('m', '⌘⌥'),
  refactor_introduceParameter: toKey('p', '⌘⌥'),
  refactor_rename: toKey('r', '⌘⌥'),
  refactor_changeSignature: toKey('s', '⌘⌥'),
  refactor_introduceVariable: toKey('v', '⌘⌥'),
  refactor_popup: toKey('⏎', '⌘⌥'),

  //
  versionControl_amendCommit: toKey('a', '⌘⌃'),
  versionControl_branches: toKey('b', '⌘⌃'),
  versionControl_commit: toKey('c', '⌘⌃'),
  versionControl_showAllAffectedFiles: toKey('f', '⌘⌃'),
  versionControl_commitMessageHistory: toKey('h', '⌘⌃'),
  versionControl_newBranch: toKey('n', '⌘⌃'),
  versionControl_push: toKey('p', '⌘⌃'),
  versionControl_updateProject: toKey('u', '⌘⌃'),
  versionControl_rollBack: toKey('z', '⌘⌃'),
  versionControl_popup: toKey('⏎', '⌘⌃'),

  //
  switchCase_popup: toKey('⏎', '⌥⌃'),
}
