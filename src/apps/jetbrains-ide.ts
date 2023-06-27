import { ifApp, toKey } from 'karabiner.ts'

export const ifJetBrainsIde = ifApp('^com.jetbrains.[\\w-]+$')
export const ifWebStorm = ifApp('^com.jetbrains.WebStorm.*$')
export const ifRider = ifApp('^com.jetbrains.rider.*$')

export const jetBrainsIde = {
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

  moveCaret_matchingBrace: toKey('m', '⌘'),
  moveCaret_codeBlockStart: toKey('[', '⌘⌥'),
  moveCaret_codeBlockEnd: toKey(']', '⌘⌥'),
  moveCaret_codeBlockStartWithSelection: toKey('[', '⌘⌥⇧'),
  moveCaret_codeBlockEndWithSelection: toKey('[', '⌘⌥⇧'),

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
  navigate_back: toKey('[', '⌘'),
  navigate_forward: toKey(']', '⌘'),
  navigate_byReference_declarationAndUsage: toKey('b', '⌘'),
  navigate_byReference_implementations: toKey('b', '⌥'),
  navigate_byReference_relatedSymbol: toKey('b', '⌃'),
  navigate_byReference_typeDeclaration: toKey('b', '⌘⇧'),
  navigate_byReference_superMethod: toKey('b', '⌥⇧'),
  navigate_byReference_test: toKey('b', '⌃⇧'),
  navigate_byReference_selectIn: toKey('s', '⌃'),
  navigate_byReference_fileStructure: toKey(7, '⌃'),
  navigate_byReference_jumpToNavigationBar: toKey('n', '⌥⇧'),
  navigate_byName_symbol: toKey('o', '⌘'),
  navigate_byName_file: toKey('o', '⌥'),
  navigate_byName_class: toKey('o', '⌃'),

  editorTabs_closeTab: toKey('w', '⌘'),
  editorTabs_closeOtherTabs: toKey('w', '⌥'),
  editorTabs_selectPreviousTab: toKey('[', '⌥'),
  editorTabs_selectNextTab: toKey(']', '⌥'),
  editorTabs_reopenClosedTab: toKey('w', '⌘⇧'),

  editorTabs_gotoPreviousSplitter: toKey('[', '⌃'),
  editorTabs_gotoNextSplitter: toKey(']', '⌃'),
  editorTabs_splitAndMoveRight: toKey('→', '⌘⌥⌃'),

  editorActions_duplicateLineOrSelection: toKey('d', '⌘'),
  editorActions_duplicateEntireLines: toKey('d', '⌥'),
  editorActions_joinLines: toKey('j', '⌘'),
  editorActions_splitLine: toKey('⏎', '⌃'),
  editorActions_startNewLine: toKey('⏎', '⇧'),
  editorActions_startNewLineBeforeCurrent: toKey('⏎', '⌃⇧'),

  edit_copy: toKey('c', '⌘'),
  edit_copyPathReference: toKey('c', '⌃'),
  edit_paste: toKey('v', '⌘'),
  edit_pasteFromHistory: toKey('v', '⌘⇧'),
  edit_cut: toKey('x', '⌘'),
  edit_undo: toKey('z', '⌘'),
  edit_redo: toKey('z', '⌘⇧'),

  edit_findUsages_showUsages: toKey('u', '⌃'),
  edit_findUsages_findUsages: toKey('u', '⌃⇧'),
  edit_findUsages_previousHighlightedUsages: toKey('↑', '⌘⌥⌃'),
  edit_findUsages_nextHighlightedUsages: toKey('↓', '⌘⌥⌃'),

  edit_cloneCaret_above: toKey('↑', '⌘⌥⇧'),
  edit_cloneCaret_below: toKey('↓', '⌘⌥⇧'),
  edit_addCaretsToEndsOfSelectedLines: toKey('⏎', '⌘⌥⇧'),

  fileOpenActions_saveAs: toKey('s', '⌘⇧'),
  fileOpenActions_createNewDirectoryOrPackage: toKey('n', '⌘⇧'),
  fileOpenActions_newScratchFile: toKey('n', '⌃⇧'),
  fileOpenActions_closeProject: toKey('w', 'Hyper'),

  findAction: toKey('a', '⌘⇧'),

  find_find: toKey('f', '⌘'),
  find_replace: toKey('r', '⌘'),
  find_findInPath: toKey('f', '⌘⇧'),
  find_replaceInPath: toKey('r', '⌘⇧'),

  find_addSelectionForNextOccurrence: toKey('f', '⌥'),
  find_unselectOccurrence: toKey('f', '⌥⇧'),
  find_selectAllOccurrences: toKey('f', '⌃'),

  run_debugPopup: toKey('d', '⌃'),
  run_runPopup: toKey('r', '⌃'),
  run_editConfigurations: toKey('r', '⌥'),
  run_run: toKey('r', '⌥⇧'),
  run_debug: toKey('d', '⌥⇧'),
  run_stop: toKey('.', '⌃⇧'),
  runFile: toKey('r', '⌃⇧'),

  view_compareFiles: toKey('d', '⌘'),
  view_showSource: toKey('⏎', '⌘'),
  view_jumpToSource: toKey('s', '⌥'),

  view_recentFiles: toKey('e', '⌘'),
  view_recentLocations: toKey('e', '⌘⇧'),
  view_recentChanges: toKey('e', '⌥⇧'),

  view_errorDescription: toKey('e', '⌃'),
  view_documentation: toKey('i', '⌃'),
  view_parameterInfo: toKey('p', '⌃'),
  view_quickTypeDefinition: toKey('t', '⌃'),
  view_quickDefinition: toKey('i', '⌃⇧'),

  other_showContextActions: toKey('⏎', '⌥'),
  other_selectFileInProjectView: toKey(1, '⌘⇧'),
  other_runAnyThing: toKey('f5', 'Hyper'),

  aceJump: toKey(';', '⌃'),
  switcher: toKey('⇥', '⌃'),
  switcherBackward: toKey('⇥', '⌃⇧'),

  code_optimizeImports: toKey('i', '⌘'),
  code_reformatCode: toKey('l', '⌘'),
  code_generate: toKey('n', '⌘'),
  code_insertLiveTemplate: toKey('t', '⌘'),
  code_implementMethods: toKey('i', '⌥⇧'),
  code_overrideMethods: toKey('o', '⌥⇧'),

  code_folding_collapse: toKey('-', '⌘'),
  code_folding_expand: toKey('=', '⌘'),
  code_folding_collapseRecursively: toKey('-', '⌥'),
  code_folding_expandRecursively: toKey('=', '⌥'),
  code_folding_collapseAll: toKey('-', '⌃'),
  code_folding_expandAll: toKey('=', '⌃'),

  code_commentWithLineComment: toKey('/', '⌘'),
  code_commentWithBlockComment: toKey('/', '⌘'),

  code_completion_basic: toKey('␣', '⌃'),
  code_completion_typeMatching: toKey('␣', '⌃⇧'),

  toolWindows_commit: toKey(0, '⌘'),
  toolWindows_project: toKey(1, '⌘'),
  toolWindows_bookmarks: toKey(2, '⌘'),
  toolWindows_find: toKey(3, '⌘'),
  toolWindows_run: toKey(4, '⌘'),
  toolWindows_debug: toKey(5, '⌘'),
  toolWindows_problems: toKey(6, '⌘'),
  toolWindows_structure: toKey(7, '⌘'),
  toolWindows_services: toKey(8, '⌘'),
  toolWindows_git: toKey(9, '⌘'),
  toolWindows_database: toKey(1, '⌥'),
  toolWindows_endpoints: toKey(2, '⌥'),
  toolWindows_terminal: toKey(4, '⌥'),
  toolWindows_NuGet: toKey(7, '⌘⌥'),
  toolWindows_unitTests: toKey(8, '⌘⌥'),
  toolWindows_pullRequests: toKey(9, '⌥'),

  activeToolWindow_hideAllToolWindows: toKey('h', '⌥'),

  tests_unitTestingQuickList: toKey('u', '⌥⇧'),

  refactor_introduceConstant: toKey('c', '⌘⌥'),
  refactor_introduceField: toKey('f', '⌘⌥'),
  refactor_inline: toKey('i', '⌘⌥'),
  refactor_move: toKey('m', '⌘⌥'),
  refactor_introduceParameter: toKey('p', '⌘⌥'),
  refactor_rename: toKey('r', '⌘⌥'),
  refactor_changeSignature: toKey('s', '⌘⌥'),
  refactor_introduceVariable: toKey('v', '⌘⌥'),
  refactor_popup: toKey('⏎', '⌘⌥'),

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
  versionControl_showDiff: toKey('d', '⌘'),
  versionControl_diff_previousDifferences: toKey('[', '⌘'),
  versionControl_diff_nextDifferences: toKey(']', '⌘'),
  versionControl_diff_comparePreviousFile: toKey('[', '⌥'),
  versionControl_diff_compareNextFile: toKey(']', '⌥'),

  switchCase_camelCase: toKey('c', '⌥⌃'),
  switchCase_kebabCase: toKey('k', '⌥⌃'),
  switchCase_lowerCase: toKey('l', '⌥⌃'),
  switchCase_pascalCase: toKey('p', '⌥⌃'),
  switchCase_snakeCase: toKey('s', '⌥⌃'),
  switchCase_capitalizedWords: toKey('t', '⌥⌃'),
  switchCase_upperCase: toKey('u', '⌥⌃'),
  switchCase_firstWordCapitalized: toKey('w', '⌥⌃'),
  switchCase_popup: toKey('⏎', '⌥⌃'),
}

export const ifIde = ifJetBrainsIde
export const ide = jetBrainsIde
