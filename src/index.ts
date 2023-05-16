import {
  duoLayer,
  map,
  NumberKeyValue,
  rule,
  SideModifierAlias,
  ToEvent,
  toKey,
  withCondition,
  withMapper,
  writeToProfile,
} from 'karabiner.ts'
import { ifJetBrainsIde, jetBrainsIde } from './apps/jetbrains-ide'
import { arc, ifArc } from './apps/arc'
import { ifSlack, slack } from './apps/slack'
import { ifSourceTree, sourceTree } from './apps/source-tree'
import { airmail, ifAirmail } from './apps/airmail'
import { system } from './apps/system'

const ifIde = ifJetBrainsIde
const ide = jetBrainsIde

const tapModifier = (v: SideModifierAlias, to: ToEvent) =>
  map(v).to(v).toIfAlone(to)

writeToProfile('Default', [
  rule('Hyper').manipulators([map('⇪').toHyper().toIfAlone('⎋')]),

  // =========================
  // == 🏠  home row  🏠 == //
  // =========================

  // -----------------
  // -- ⌘, Caret -- //
  duoLayer('f', 'd').manipulators([
    // ← ↑ ↓ →
    withMapper({ h: '←', j: '↑', k: '↓', l: '→' } as const)((k, v) =>
      map(k).to(v),
    ),
    withMapper({ n: '←', m: '↑', ',': '↓', '.': '→' } as const)((k, v) =>
      map(k).to(v, '⌘'),
    ),
    withMapper({ y: '←', u: '↑', i: '↓', o: '→' } as const)((k, v) =>
      map(k).to(v, '⌥'),
    ),
    withCondition(ifIde)({
      6: ide.moveCaret_previousCamelWord,
      9: ide.moveCaret_nextCamelWord,
      7: ide.scrollUp,
      8: ide.scrollDown,
    }),

    // ⌘
    withMapper(['p', '/', '[', ']'])((k) => map(k).to(k, '⌘')),
  ]),
  duoLayer('j', 'k').manipulators([
    // ⌘
    withMapper([
      ...([1, 2, 3, 4, 5] as const),
      ...(['q', 'w', 'e', 'r', 't'] as const),
      ...(['a', 's', 'd', 'f', 'g'] as const),
      ...(['z', 'x', 'c', 'v', 'b'] as const),
    ])((k) => map(k).to(k, '⌘')),
  ]),

  // ---------------------------------
  // -- ⌥, Selection, Navigation -- //
  duoLayer('f', 's').manipulators([
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
    withCondition(ifIde)({
      6: ide.moveCaret_previousCamelWord_withSelection,
      9: ide.moveCaret_nextCamelWord_withSelection,
      7: ide.navigateInFile_previousHighlightedError,
      8: ide.navigateInFile_nextHighlightedError,
    }),

    // ⌥
    withCondition(ifArc)({
      '[': arc.previousTab,
      ']': arc.nextTab,
    }),

    map('␣').to(system.emojiPicker),
  ]),
  duoLayer('j', 'l').manipulators([
    withCondition(ifArc)({
      c: arc.copyPageUrl,
    }),
  ]),

  // ----------------
  // -- ⌃, Edit -- //
  duoLayer('d', 's').manipulators([
    // delete
    { h: toKey('⌫'), l: toKey('⌦') },
    { n: toKey('⌫', '⌘'), '.': toKey('⌦', '⌘') },
    { y: toKey('⌫', '⌥'), o: toKey('⌦', '⌥') },
    withCondition(ifIde)({
      ';': ide.delete_line,
      6: ide.delete_toCamelWordStart,
      9: ide.delete_toCamelWordEnd,

      // Move
      j: ide.code_moveLineUp,
      k: ide.code_moveLineDown,
      m: ide.code_moveStatementUp,
      ',': ide.code_moveStatementDown,
    }),

    // ⌃
    { '⏎': toKey('⏎', '⌃') },
    withCondition(ifArc)({
      '[': arc.previousSpace,
      ']': arc.nextSpace,
    }),

    map('␣').to(system.selectNextSourceInInputMenu),
  ]),
  duoLayer('k', 'l').manipulators([
    // ⌃
    { '⇥': toKey('⇥', '⌃') },
  ]),

  // =========================
  // == 🚇 bottom row 🚇 == //
  // =========================

  // ------------------------
  // -- Version Control -- //
  duoLayer('v', 'c').condition(ifIde).manipulators({
    j: ide.navigateInFile_previousChange,
    k: ide.navigateInFile_nextChange,

    h: ide.versionControl_commitMessageHistory,
    n: ide.versionControl_newBranch,
    u: ide.versionControl_updateProject,
    p: ide.versionControl_push,
    '⏎': ide.versionControl_popup,
  }),
  duoLayer('m', ',').condition(ifIde).manipulators({
    f: ide.versionControl_showAllAffectedFiles,
    a: ide.versionControl_amendCommit,
    b: ide.versionControl_branches,
    c: ide.versionControl_commit,
    z: ide.versionControl_rollBack,
  }),

  // -----------------
  // -- Refactor -- //
  duoLayer('v', 'x').condition(ifIde).manipulators({
    m: ide.refactor_move,
    i: ide.refactor_inline,
    p: ide.refactor_introduceParameter,
    '⏎': ide.refactor_popup,
  }),
  duoLayer('m', '.').condition(ifIde).manipulators({
    s: ide.refactor_changeSignature,
    f: ide.refactor_introduceField,
    v: ide.refactor_introduceVariable,
    c: ide.refactor_introduceConstant,
    r: ide.refactor_rename,
  }),

  // --------------------
  // -- Switch Case -- //
  duoLayer('c', 'x').condition(ifIde).manipulators({
    k: ide.switchCase_kebabCase,
    l: ide.switchCase_lowerCase,
    p: ide.switchCase_pascalCase,
    u: ide.switchCase_upperCase,
  }),
  duoLayer(',', '.').condition(ifIde).manipulators({
    c: ide.switchCase_camelCase,
    s: ide.switchCase_snakeCase,
    t: ide.switchCase_capitalizedWords,
    w: ide.switchCase_firstWordCapitalized,
  }),

  // =========================
  // ==  ✨  Others  ✨  == //
  // =========================

  // -----------------------
  // -- Emoji & Symbol -- //
  duoLayer('z', 'x').manipulators([
    // See https://gitmoji.dev/
    withMapper({
      b: '👷', // add or update ci Build system
      c: '🔧', // Add or update Configuration files
      d: '📝', // add or update Documentation
      f: '🐛', // Fix a bug
      h: '💯', // _hundred
      j: '😂', // _joy
      m: '🔀', // Merge branches
      n: '✨', // introduce New features
      p: '👍', // _plus_one +1
      r: '♻️', // Refactor code
      s: '😅', // _sweat_smile
      t: '🧪', // _test
      u: '⬆️', // Upgrade dependencies
      v: '🔖', // release / Version tags
    })((k, v) => map(k).toPaste(v)),

    withMapper(['⌘', '⌥', '⌃', '⇧', '⇪'])((k, i) =>
      map((i + 1) as NumberKeyValue).toPaste(k),
    ),
    withMapper(['⌘', '⌥', '⌃', '⇧'])((k, i) =>
      map((i + 6) as NumberKeyValue).toPaste(k),
    ),
    map(0).toPaste('⇥'),

    //           Paste the symbols instead of triggering the key
    withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪'])((k) =>
      map(k).toPaste(k),
    ),
    map(',').toPaste('‹'),
    map('.').toPaste('›'),

    // Code snippets
    map('l').toTypeSequence('console.log()←'),
  ]),

  // ---------------
  // -- launch -- //
  duoLayer('l', ';').manipulators([
    withMapper({
      a: 'Arc',
      c: 'Calendar',
      f: 'Finder',
      i: 'WeChat', // IM
      k: 'Lens', // K8s
      m: 'Airmail', // Mail
      n: 'Notion',
      r: 'Rider',
      s: 'Slack',
      t: 'Warp', // Terminal
      w: 'WebStorm',
      x: 'Xcode',
      z: 'zoom.us',
      ',': 'System Settings',
    })((k, v) => map(k).toApp(v)),
  ]),

  // -------------
  // -- apps -- //
  rule('apps and modifiers').manipulators([
    withCondition(ifAirmail)([
      tapModifier('‹⌘', airmail.revealHideSidebar),
      tapModifier('›⌥', airmail.gotoFirstMessage),
    ]),

    withCondition(ifArc)([
      tapModifier('‹⌘', arc.revealHideSidebar),
      tapModifier('‹⌥', arc.refreshThePage),

      tapModifier('›⌘', arc.javaScriptConsole),
      tapModifier('›⌥', arc.openCommandBar),
    ]),

    withCondition(ifIde)([
      tapModifier('‹⌘', ide.hideAllToolWindows),
      tapModifier('‹⌥', ide.run),

      tapModifier('›⌘', ide.terminal),
      tapModifier('›⌥', ide.aceJump),
    ]),

    withCondition(ifSlack)([
      tapModifier('‹⌘', slack.showHideSideBar),
      tapModifier('‹⌥', slack.moveFocusToTheNextSection),
      tapModifier('›⌘', slack.hideRightBar),
      tapModifier('›⌥', slack.open),
    ]),

    withCondition(ifSourceTree)([
      tapModifier('‹⌥', sourceTree.commit),
      tapModifier('›⌥', sourceTree.fetch),
    ]),
  ]),

  // ---------------
  // -- system -- //
  rule('Mouse Cursor Position').manipulators([
    map('←', 'Meh').toMouseCursorPosition({ x: '25%', y: '50%' }),
    map('→', 'Meh').toMouseCursorPosition({ x: '75%', y: '50%' }),
    map('↓', 'Meh').toMouseCursorPosition({ x: '50%', y: '50%' }),
    map('↑', 'Meh').toMouseCursorPosition({ x: '100%', y: 0 }),
  ]),
])
