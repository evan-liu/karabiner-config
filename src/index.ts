import {
  duoLayer,
  ifApp,
  ifDevice,
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

// Devices
export const ifMoonlander = ifDevice({ vendor_id: 12951, product_id: 6505 })
export const ifAppleKeyboard = ifDevice({ vendor_id: 1452, product_id: 835 })

// Apps
export const ifAirmail = ifApp('^it.bloop.airmail2$')
export const ifArc = ifApp('^company.thebrowser.Browser$')
export const ifJetBrainsIde = ifApp('^com.jetbrains.(WebStorm|rider)$')
export const ifSlack = ifApp('^com.tinyspeck.slackmacgap$')
export const ifSourceTree = ifApp('^com.torusknot.SourceTree')

const hjklArrows = { h: '←', j: '↑', k: '↓', l: '→' } as const

const tapModifier = (v: SideModifierAlias, to: ToEvent) =>
  map(v).to(v).toIfAlone(to)

writeToProfile('Default', [
  rule('Hyper').manipulators([map('⇪').toHyper().toIfAlone('⎋')]),

  //// 🏠‹ home row - left side
  duoLayer('f', 'd').manipulators([
    // ← ↑ ↓ →
    withMapper(hjklArrows)((k, v) => map(k).to(v)),
    map('n').to('←', '⌥'),
    map('.').to('→', '⌥'),
    map('m').to('←', '⌃'),
    map(',').to('→', '⌃'),
  ]),
  duoLayer('f', 's').manipulators([
    // ← ↑ ↓ → + ⇧
    withMapper(hjklArrows)((k, v) => map(k).to(v, '⇧')),
    map('n').to('←', '⌥⇧'),
    map('.').to('→', '⌥⇧'),
    map('m').to('←', '⌃⇧'),
    map(',').to('→', '⌃⇧'),
  ]),
  duoLayer('d', 's').manipulators([
    // delete
    map('h').to('⌫'),
    map('l').to('⌦'),
    map('j').to('⌫', '⌘'),
    map('n').to('⌫', '⌥'),
    map('.').to('⌦', '⌥'),
    map('m').to('⌫', '⌃'),
    map(',').to('⌦', '⌃'),
  ]),

  //// 🏠› home row - right side
  duoLayer('j', 'k').manipulators([
    // ⌘ + letter
    withMapper([
      ...(['q', 'w', 'e', 'r', 't'] as const),
      ...(['a', 's', 'd', 'f', 'g'] as const),
      ...(['z', 'x', 'c', 'v', 'b'] as const),
    ])((k) => map(k).to(k, '⌘')),
  ]),

  duoLayer('z', 'x').manipulators([
    map('⏎').to('␣', '⌘⌃'),

    // See https://gitmoji.dev/
    withMapper({
      b: '👷', // add or update ci Build system
      c: '✅', // _check
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

    //           Paste the symbols instead of triggering the key
    withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⇥', '⎋', '⌫', '⌦', '⇪'])((k) =>
      map(k).toPaste(k),
    ),
    map(',').toPaste('‹'),
    map('.').toPaste('›'),

    // Code snippets
    map('l').toTypeSequence('console.log()←'),
    map('`').toTypeSequence('```⏎⏎↑'),
  ]),

  duoLayer('l', ';').manipulators([
    // Launch apps
    withMapper({
      a: 'Arc', // Browser
      c: 'Calendar',
      f: 'Finder',
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

  rule('apps and modifiers').manipulators([
    withCondition(ifAirmail)([
      map('‹⌘').to('‹⌘').toIfAlone('↓', '⌘⌥'), // Reveal/Hide Sidebar
      map('›⌥').to('›⌥').toIfAlone('↑', '⌥'), // Goto the first message
    ]),

    withCondition(ifArc)([
      tapModifier('‹⌘', toKey('s', '⌘⌥')), // Reveal/Hide Sidebar

      tapModifier('‹⌘', toKey('s', '⌘⌥')), // Reveal/Hide Sidebar
      tapModifier('‹⌥', toKey('r', '⌘')), // Refresh
      tapModifier('‹⌃', toKey('=', '⌃⇧')), // Add Split View

      tapModifier('›⌘', toKey('i', '⌘⌥')), // Developer Tools
      tapModifier('›⌥', toKey('l', '⌘')), // Open Command Bar
      tapModifier('›⌃', toKey('t', '⌘')), // New Tab

      map('[', '⌥').to('↑', '⌘⌥'), // Pre Tab
      map(']', '⌥').to('↓', '⌘⌥'), // Next Tab
      map('[', '⌃').to('←', '⌘⌥'), // Pre Space
      map(']', '⌃').to('→', '⌘⌥'), // Next Space
    ]),

    withCondition(ifJetBrainsIde)([
      tapModifier('‹⌘', toKey('h', '⌥')), // Hide all tool windows
      tapModifier('‹⌥', toKey('r', '⌥⇧')), // Run

      tapModifier('›⌘', toKey(4, '⌥')), // Terminal
      tapModifier('›⌥', toKey(';', '⌃')), // AceJump
    ]),

    withCondition(ifSlack)([
      tapModifier('‹⌘', toKey('d', '⌘⇧')), // Show/Hide SideBar
      tapModifier('‹⌥', toKey('f6')), // Move focus to the next section
      tapModifier('›⌘', toKey('.', '⌘')), // Hide right bar
      tapModifier('›⌥', toKey('k', '⌘')), // Open
    ]),

    withCondition(ifSourceTree)([
      tapModifier('‹⌥', toKey('c', '⌘⇧')), // Commit
      tapModifier('‹⌃', toKey('p', '⌘⇧')), // Push
      tapModifier('›⌥', toKey('f', '⌘⇧')), // fetch
      tapModifier('›⌃', toKey('l', '⌘⇧')), // pull
    ]),
  ]),

  // system
  rule('Mouse Cursor Position').manipulators([
    map('←', 'Meh').toMouseCursorPosition({ x: '25%', y: '50%' }),
    map('→', 'Meh').toMouseCursorPosition({ x: '75%', y: '50%' }),
    map('↓', 'Meh').toMouseCursorPosition({ x: '50%', y: '50%' }),
    map('↑', 'Meh').toMouseCursorPosition({ x: '100%', y: 0 }),
  ]),
])
