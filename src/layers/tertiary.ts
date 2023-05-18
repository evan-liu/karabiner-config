import { map, toKey, withCondition, withMapper } from 'karabiner.ts'
import { arc, ifArc } from '../apps/arc'
import { ide, ifIde } from '../apps/jetbrains-ide'
import { ifSlack, slack } from '../apps/slack'

// ------------------
// -- 🥉 f x 👈 -- //
export const tertiaryLeft = [
  withCondition(ifArc)({
    '[': arc.previousSpace,
    ']': arc.nextSpace,
  }),
  withCondition(ifIde)({
    '[': ide.switcherBackward,
    ']': ide.switcher,
    p: ide.navigate_byName_symbol,

    7: ide.expendSelection,
    8: ide.shrinkSelection,
    // ← ↑ ↓ → + ⇧
    6: ide.moveCaret_previousCamelWord_withSelection,
    9: ide.moveCaret_nextCamelWord_withSelection,
  }),

  // ← ↑ ↓ → + ⇧
  withMapper({ h: '←', j: '↑', k: '↓', l: '→' } as const)((k, v) =>
    map(k).to(v, '⇧'),
  ),
  withMapper({ n: '←', m: '↑', ',': '↓', '.': '→' } as const)((k, v) =>
    map(k).to(v, '⌘⇧'),
  ),
  withMapper({ y: '←', u: '↑', i: '↓', o: '→' } as const)((k, v) =>
    map(k).to(v, '⌥⇧'),
  ),

  { '⏎': toKey('⏎', '⌃'), '␣': toKey('␣', '⌃') },
]

// ------------------
// -- 🥉 👉 k l -- //
export const tertiaryRight = [
  withCondition(ifSlack)({
    u: slack.link,
  }),

  withCondition(ifIde)({
    t: ide.view_quickTypeDefinition,
    r: ide.run_debugPopup,
    e: ide.view_errorDescription,
    w: ide.navigate_byReference_fileStructure,
    q: ide.view_quickDefinition,

    f: ide.find_addSelectionForNextOccurrence,
    d: ide.run_debugPopup,
    s: ide.navigate_byReference_selectIn,
    a: ide.view_parameterInfo,

    c: ide.edit_copyPathReference,
    v: ide.edit_findUsages_showUsages,

    x: ide.tests_unitTestingQuickList,

    1: ide.toolWindows_pullRequests,
    2: ide.toolWindows_NuGet,
    3: ide.toolWindows_endpoints,
    4: ide.toolWindows_database,
    5: ide.toolWindows_unitTests,
  }),

  { '⇥': toKey('⇥', '⌃') },
  { '⏎': toKey('⏎', '⌃⇧'), '␣': toKey('␣', '⌃⇧') },
]

// ------------------
// -- 🥉 👉 j . -- //
// More IDE only mapping
export const tertiaryRightIde = {
  '⏎': ide.runFile,

  r: ide.run_run,
  e: ide.run_editConfigurations,
  w: ide.editorTabs_closeOtherTabs,

  f: ide.find_selectAllOccurrences,
  d: ide.run_debug,
  s: ide.run_stop,
  a: ide.other_runAnyThing,

  v: ide.edit_findUsages_findUsages,
}
