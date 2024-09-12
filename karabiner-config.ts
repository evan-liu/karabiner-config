import {
  duoLayer,
  FromKeyParam,
  ifApp,
  ifDevice,
  layer,
  map,
  mapSimultaneous,
  rule,
  to$,
  toApp,
  toKey,
  toMouseCursorPosition,
  toPaste,
  toPointingButton,
  toSleepSystem,
  withCondition,
  withMapper,
  withModifier,
  writeToProfile,
} from 'karabiner.ts'
import {
  duoModifiers,
  historyNavi,
  raycastExt,
  raycastWin,
  switcher,
  tabNavi,
  tapModifiers,
  toClearNotifications,
  toResizeWindow,
} from './utils'

writeToProfile(
  'Default',
  [
    layer_vim(),
    layer_symbol(),
    layer_digitAndDelete(),
    layer_emojiAndSnippet(),
    layer_launchApp(),
    layer_openLink(),
    layer_system(),

    app_chrome(),
    app_safari(),
    app_jetBrainsIDE(),
    app_zed(),
    app_vsCode(),
    app_cursor(),
    app_slack(),
    app_warp(),
    app_spark(),
    app_zoom(),
    app_chatGPT(),

    app_raycast(),
    app_homerow(),

    rule_duoModifiers(),

    keyboard_apple(),
    keyboard_moonlander(),
  ],
  {
    'basic.simultaneous_threshold_milliseconds': 50,
    'duo_layer.threshold_milliseconds': 50,
    'duo_layer.notification': true,
  },
)

function layer_vim() {
  let hint = `\
←  ↓  ↑  →     ⌫
H  J    K   L       '`
  let layer = duoLayer('f', ';').threshold(250).notification(hint)
  return layer.manipulators([
    withModifier('??')({
      h: toKey('←'),
      j: toKey('↓'),
      k: toKey('↑'),
      l: toKey('→'),

      ';': toKey('›⇧'),
      d: toKey('‹⌘'),
      s: toKey('‹⌃'),
      a: toKey('‹⌥'),
    }),

    { "'": toKey('⌫'), '\\': toKey('⌦') },
  ])
}

function layer_symbol() {
  let hint = `\
&   !  @ #    ^   {  [   (  $      ?  }  ]   )  %      _   +      ⌫
N  M  ,   .    H  J  K  L  ;      Y  U  I  O  P       ␣  ⏎      '`

  let toSymbol = {
    '!': toKey(1, '⇧'),
    '@': toKey(2, '⇧'),
    '#': toKey(3, '⇧'),
    $: toKey(4, '⇧'),
    '%': toKey(5, '⇧'),
    '^': toKey(6, '⇧'),
    '&': toKey(7, '⇧'),
    '*': toKey(8, '⇧'),
    '(': toKey(9, '⇧'),
    ')': toKey(0, '⇧'),

    '[': toKey('['),
    ']': toKey(']'),
    '{': toKey('[', '⇧'),
    '}': toKey(']', '⇧'),

    '-': toKey('-'),
    '=': toKey('='),
    _: toKey('-', '⇧'),
    '+': toKey('=', '⇧'),

    ';': toKey(';'),
    '/': toKey('/'),
    ':': toKey(';', '⇧'),
    '?': toKey('/', '⇧'),

    ',': toKey(','),
    '.': toKey('.'),
    '<': toKey(',', '⇧'),
    '>': toKey('.', '⇧'),
  }

  let layer = duoLayer('s', ';').threshold(250).notification(hint)
  return layer.manipulators([
    withMapper({
      // ! @ # $ % ^ & * ( )    _ +
      // 1 2 3 4 5 6 7 8 9 0    - =

      y: '?',
      u: '}',
      i: ']',
      o: ')', // 0
      p: '%', // 5

      h: '^', // 6
      j: '{',
      k: '[',
      l: '(', // 9
      ';': '$', // 4

      n: '&', // 7
      m: '!', // 1
      ',': '@', // 2
      '.': '#', // 3

      ']': '*', // 8

      '␣': '_',
      '⏎': '+',
    } as const)((k, v) => map(k).to(toSymbol[v])),

    { "'": toKey('⌫') },
  ])
}

function layer_digitAndDelete() {
  let hint = `\
0    1  2  3    4  5  6    7  8  9    +  -  /  *    .    ⌫_⌥_⌘  ⌦
N   M  ,   .     J  K  L    U  I  O    P  ;   /  ]    [      '   H   Y    \\`
  let layer = duoLayer('d', ';').threshold(250).notification(hint)
  return layer.manipulators([
    // digits keypad_{i}
    withMapper([
      'n', //             // 0
      ...['m', ',', '.'], // 1 2 3
      ...['j', 'k', 'l'], // 4 5 6
      ...['u', 'i', 'o'], // 7 8 9
    ] as const)((k, i) => map(k).to(`keypad_${i as 0}`)),

    // + - / * .
    {
      p: toKey('=', '⇧'), // +
      ';': toKey('-'), // // -
      // / stay           // /
      ']': toKey(8, '⇧'), // *

      '[': toKey('keypad_period'),
    },

    // delete ⌫ ⌦
    {
      '\\': toKey('⌦'),

      "'": toKey('⌫'),
      h: toKey('⌫', '⌥'),
      y: toKey('⌫', '⌘'),
    },

    // F1 - F9
    withMapper([1, 2, 3, 4, 5, 6, 7, 8, 9])((k) => map(k).to(`f${k}`)),
  ])
}

function layer_emojiAndSnippet() {
  // See https://gitmoji.dev/
  let emojiMap = {
    b: '🐛', // Fix a bug
    c: '🔧', // add or update Configuration files
    d: '📝', // add or update Documentation
    f: '🚩', // add, update, or remove Feature Flags
    h: '💯', // _hundred
    j: '😂', // _joy
    m: '🔀', // Merge branches
    n: '✨', // introduce New features
    p: '👍', // _plus_one +1
    r: '♻️', // Refactor code
    s: '😅', // _sweat_smile
    u: '⬆️', // Upgrade dependencies
    v: '🔖', // release / Version tags

    o: '💭', // Opinions and thoughts
    i: '👨‍💻', // Experiences and stories
  }

  let emojiHint = Object.entries(emojiMap)
    .slice(0, 15)
    .reduce(
      (r, [k, v]) => [r[0].concat(v), r[1].concat(k.toUpperCase())],
      [[] as string[], [] as string[]],
    )
    .map((v, i) => v.join(i === 0 ? ' ' : '    '))
    .join('\n')

  let layer = duoLayer('z', 'x').notification(emojiHint)
  return layer.manipulators([
    map(';').to(raycastExt('raycast/emoji-symbols/search-emoji-symbols')),

    withMapper(emojiMap)((k, v) => map(k).toPaste(v)),

    { 2: toPaste('⌫'), 3: toPaste('⌦'), 4: toPaste('⇥'), 5: toPaste('⎋') },
    { 6: toPaste('⌘'), 7: toPaste('⌥'), 8: toPaste('⌃'), 9: toPaste('⇧') },
    { 0: toPaste('⇪'), ',': toPaste('‹'), '.': toPaste('›') },

    withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⌫', '⌦'])((k) =>
      map(k).toPaste(k),
    ),

    // Code snippets
    withCondition(ifApp('^com.microsoft.VSCode$'))([
      map('k').to('f20').to('k'),
      map('l').to('f20').to('l'),
    ]),
    withCondition(ifApp('^com.jetbrains.WebStorm$'))([
      map('k').toTypeSequence('afun'),
    ]),
    map('k').toTypeSequence('()␣=>␣'),
    map('l').toTypeSequence('console.log()←'),
    map('/').toTypeSequence('console.assert()←'),

    map("'").toTypeSequence('⌫"'),
    map('[').toTypeSequence('[␣]␣'),
    map(']').toTypeSequence('-␣[␣]␣'),

    { "'": toKey('⌫'), '\\': toKey('⌦') },
  ])
}

function layer_launchApp() {
  let layer = duoLayer('l', ';').notification('Launch App 🚀 📱')
  return layer.manipulators({
    a: toApp('ChatGPT'), // AI
    b: toApp('Safari'), // Browser
    c: toApp('Calendar'),
    d: toApp('Eudb_en'), // Dictionary
    e: toApp('Zed'), // Editor
    f: toApp('Finder'),
    g: toApp('Google Chrome'),
    i: toApp('WeChat'), // IM
    m: toApp('Spark Desktop'), // Mail
    r: to$(`open ~/Applications/Rider.app`),
    s: toApp('Slack'),
    t: toApp('Warp'), // Terminal
    u: toApp('Cursor'), // cUrsor
    v: toApp('Visual Studio Code'),
    w: to$(`open ~/Applications/WebStorm.app`),
    z: toApp('zoom.us'),

    ',': toApp('System Settings'),
  })
}

function layer_openLink() {
  let links = require('./links.json') as Record<FromKeyParam, string>
  let layer = duoLayer('.', '/').notification('Open Link 🔗')
  return layer.manipulators([
    withMapper(links)((k, v) => map(k).to$(`open "${v}"`)),
  ])
}

function layer_system() {
  return layer('`', 'system').manipulators({
    1: toMouseCursorPosition({ x: '25%', y: '50%', screen: 0 }),
    2: toMouseCursorPosition({ x: '50%', y: '50%', screen: 0 }),
    3: toMouseCursorPosition({ x: '75%', y: '50%', screen: 0 }),
    4: toMouseCursorPosition({ x: '99%', y: 20, screen: 0 }),

    5: toMouseCursorPosition({ x: '50%', y: '50%', screen: 1 }),

    '⏎': toPointingButton('button1'),

    n: toClearNotifications,

    '␣': toSleepSystem(),

    j: toKey('⇥', '⌘'),
    k: toKey('⇥', '⌘⇧'),
  })
}

function app_chrome() {
  return rule('Chrome', ifApp('^com.google.Chrome$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      '‹⌥': toKey('r', '⌘'), // refreshThePage

      '›⌘': toKey('i', '⌘⌥'), // developerTools
      '›⌥': toKey('a', '⌘⇧'), // searchTabs
    }),

    map(1, 'Meh').to(toResizeWindow('Google Chrome')),
  ])
}

function app_safari() {
  return rule('Safari', ifApp('^com.apple.Safari$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      '‹⌘': toKey('l', '⌘⇧'), // showHideSideBar
      '‹⌥': toKey('r', '⌘'), // reloadPage

      '›⌘': toKey('i', '⌘⌥'), // showWebInspector
    }),

    map(1, 'Meh').to(toResizeWindow('Safari')),
  ])
}

function app_jetBrainsIDE() {
  return rule('JetBrains IDE', ifApp('^com.jetbrains.[\\w-]+$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      '‹⌘': toKey('⎋', '⌘⇧'), // hideAllToolWindows
      '‹⌥': toKey('r', '⌥⇧'), // Run
      '‹⌃': toKey('r', '⌥⌃'), // Run...

      '›⌘': toKey(4, '⌥'), // toolWindows_terminal
      '›⌥': toKey('a', '⌘⇧'), // findAction
      '›⌃': toKey('e', '⌘'), // recentFiles
    }),

    map(1, 'Meh').to(toResizeWindow('WebStorm')),
  ])
}

function app_zed() {
  return rule('Zed', ifApp('^dev.zed.Zed$')).manipulators([
    ...historyNavi(),
    ...tabNavi(),
    ...switcher(),

    ...tapModifiers({
      '‹⌘': toKey('y', '⌘⌥'), // closeAllDocks
      '‹⌥': toKey('t', '⌥'), // task::Rerun
      '‹⌃': toKey('t', '⌥⇧'), // task::Spawn

      '›⌘': toKey('`', '⌃'), // terminal
      '›⌥': toKey('a', '⌘⇧'), // command
      '›⌃': toKey('p', '⌘'), // fileFinder
    }),

    map(1, 'Meh').to(toResizeWindow('Zed')),
  ])
}

function app_vsCode() {
  return rule('VSCode', ifApp('^com.microsoft.VSCode$')).manipulators([
    ...tabNavi(),
    ...switcher(),
    map('h', '⌃').to('-', '⌃'),
    map('l', '⌃').to('-', '⌃⇧'),

    ...tapModifiers({
      '‹⌘': toKey('⎋', '⌘'), // Tobble Sidebar visibility
      '‹⌥': toKey('r', '⌥⇧'), // Run

      '›⌘': toKey('`', '⌃'), // terminal
      '›⌥': toKey('p', '⌘⇧'), // Show Command Palette
      '›⌃': toKey('p', '⌘'), // Quick Open, Go to File...
    }),

    map(1, 'Meh').to(toResizeWindow('Code')),
  ])
}

function app_cursor() {
  return rule('Cursor', ifApp('^com.todesktop.230313mzl4w4u92$')).manipulators([
    ...tabNavi(),
    ...switcher(),
    map('h', '⌃').to('-', '⌃'),
    map('l', '⌃').to('-', '⌃⇧'),

    ...tapModifiers({
      '‹⌘': toKey('⎋', '⌘'), // Tobble Sidebar visibility
      '‹⌥': toKey('r', '⌥⇧'), // Run

      '›⌘': toKey('`', '⌃'), // terminal
      '›⌥': toKey('p', '⌘⇧'), // Show Command Palette
      '›⌃': toKey('p', '⌘'), // Quick Open, Go to File...
    }),
  ])
}

function app_warp() {
  return rule('Warp', ifApp('^dev.warp.Warp')).manipulators([
    ...tabNavi(),
    map(1, 'Meh').to(toResizeWindow('Warp')),
  ])
}

function app_slack() {
  return rule('Slack', ifApp('^com.tinyspeck.slackmacgap$')).manipulators([
    ...historyNavi(),

    ...tapModifiers({
      '‹⌘': toKey('d', '⌘⇧'), // showHideSideBar
      '‹⌥': toKey('f6'), // moveFocusToTheNextSection

      '›⌘': toKey('.', '⌘'), // hideRightBar
      '›⌥': toKey('k', '⌘'), // open
    }),

    map(1, 'Meh').to(
      // After the 1/4 width, leave some space for opening thread in a new window
      // before the last 1/4 width
      toResizeWindow('Slack', { x: 1263, y: 25 }, { w: 1760, h: 1415 }),
    ),
  ])
}

function app_spark() {
  return rule('Spark', ifApp('^com.readdle.SparkDesktop')).manipulators([
    ...tapModifiers({
      '‹⌘': toKey('/'), // openSidebar
      '‹⌥': toKey('r', '⌘'), // fetch

      '›⌘': toKey('/', '⌘'), // changeLayout
      '›⌥': toKey('k', '⌘'), // actions
    }),

    map(1, 'Meh').to(
      toResizeWindow('Spark Desktop', undefined, { w: 1644, h: 1220 }),
    ),
  ])
}

function app_zoom() {
  return rule('Zoom', ifApp('^us.zoom.xos$')).manipulators(
    tapModifiers({
      '‹⌘': toKey('a', '⌘⇧'), // muteUnmuteMyAudio
      '‹⌥': toKey('s', '⌘⇧'), // startStopScreenSharing

      '›⌘': toKey('v', '⌘⇧'), // startStopVideo
      '›⌥': toKey('h', '⌘⇧'), // showHideChatPanel
    }),
  )
}

function app_raycast() {
  return rule('Raycast').manipulators([
    map('␣', '⌥').to(raycastExt('evan-liu/quick-open/index')),

    withModifier('Hyper')({
      c: raycastExt('raycast/calendar/my-schedule'),
      d: raycastExt('isfeng/easydict/easydict'),
      e: raycastExt('raycast/emoji-symbols/search-emoji-symbols'),
      f: raycastExt('ratoru/google-maps-search/find'),
      g: raycastExt('ricoberger/gitmoji/gitmoji'),
      m: raycastExt('raycast/navigation/search-menu-items'),
      n: raycastExt('raycast/github/notifications'),
      s: raycastExt('raycast/snippets/search-snippets'),
      v: raycastExt('raycast/clipboard-history/clipboard-history'),
      w: raycastExt('raycast/navigation/switch-windows'),
    }),
    withModifier('Hyper')({
      '↑': raycastWin('previous-isplay'),
      '↓': raycastWin('next-display'),
      '←': raycastWin('previous-desktop'),
      '→': raycastWin('next-desktop'),
    }),
    withModifier('Hyper')({
      1: raycastWin('first-third'),
      2: raycastWin('center-third'),
      3: raycastWin('last-third'),
      4: raycastWin('first-two-thirds'),
      5: raycastWin('last-two-thirds'),
      9: raycastWin('left-half'),
      0: raycastWin('right-half'),
    }),
    withModifier('Meh')({
      1: raycastWin('first-fourth'),
      2: raycastWin('second-fourth'),
      3: raycastWin('third-fourth'),
      4: raycastWin('last-fourth'),
      5: raycastWin('center'),
      6: raycastWin('center-half'),
      7: raycastWin('center-two-thirds'),
      8: raycastWin('maximize'),
    }),
  ])
}

function app_homerow() {
  return rule('Homerow').manipulators([
    mapSimultaneous(['f', 'j']).to('␣', 'Hyper'), // Click
    mapSimultaneous(['f', 'k']).to('⏎', 'Hyper'), // Scroll
  ])
}

function app_chatGPT() {
  return rule('ChatGPT', ifApp('^com.openai.chat$')).manipulators([
    map(1, 'Meh').to(toResizeWindow('ChatGPT')),
  ])
}

function rule_duoModifiers() {
  return rule('duo-modifiers').manipulators(
    duoModifiers({
      '⌘': ['fd', 'jk'], // ⌘ first as used the most
      '⌃': ['fs', 'jl'], // ⌃ second as Vim uses it
      '⌥': ['fa', 'j;'], // ⌥ last as used the least

      '⇧': ['ds', 'kl'],

      '⌘⇧': ['gd', 'hk'],
      '⌃⇧': ['gs', 'hl'],
      '⌥⇧': ['ga', 'h;'],

      '⌘⌥': ['vc', 'm,'],
      '⌘⌃': ['vx', 'm.'],
      '⌥⌃': ['cx', ',.'],

      '⌘⌥⌃': ['vz', 'm/'],
    }),
  )
}

function keyboard_apple() {
  let ifAppleKeyboard = ifDevice({ vendor_id: 12951 }).unless() // Not Moonlander
  return rule('Apple Keyboard', ifAppleKeyboard).manipulators([
    map('⇪', '?⌘⌃').to('⎋'),
    map('⇪', '⇧').to('⇪'),

    map('›⌘', '⌥').toHyper(),
    map('›⌥', '⇧').toMeh(),

    ...tapModifiers({
      fn: toKey('␣', '⌘⇧'), // selectNextSourceInInputMenu
    }),
  ])
}

function keyboard_moonlander() {
  let ifMoonlander = ifDevice({ vendor_id: 12951, product_id: 6505 })
  return rule('Moonlander', ifMoonlander).manipulators([
    map('⎋', '⇧').to('⇪'),
    map('⎋', '⇪').to('⇪'),

    ...tapModifiers({
      '‹⌃': toKey('␣', '⌘⇧'), // selectNextSourceInInputMenu
    }),
  ])
}
