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
  duoModifier,
  raycastExt,
  raycastWin,
  tapModifier,
  toClearNotifications,
  toResizeWindow,
} from './utils'

writeToProfile(
  'Default',
  [
    vimLayer(),
    symbolsLayer(),
    digitsAndDelLayer(),
    emojiLayer(),
    launchAppLayer(),
    openLinkLayer(),
    systemLayer(),

    appMappings(),
    raycast(),
    homerow(),

    duoModifiers(),
    appleKeyboard(),
    moonlanderKeyboard(),
  ],
  {
    'basic.simultaneous_threshold_milliseconds': 50,
    'duo_layer.threshold_milliseconds': 100,
    'duo_layer.notification': true,
  },
)

function vimLayer() {
  let hint = `\
←  ↓  ↑  →     ⌫
H  J    K   L       '`
  return duoLayer('f', ';')
    .notification(hint)
    .manipulators([
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

function symbolsLayer() {
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

  return duoLayer('s', ';')
    .notification(hint)
    .manipulators([
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

function digitsAndDelLayer() {
  let hint = `\
0    1  2  3    4  5  6    7  8  9    +  -  /  *    .    ⌫_⌥_⌘  ⌦
N   M  ,   .     J  K  L    U  I  O    P  ;   /  ]    [      '   H   Y    \\`
  return duoLayer('d', ';')
    .notification(hint)
    .manipulators([
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

function emojiLayer() {
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
    t: '🤔', // _thinking_face
    u: '⬆️', // Upgrade dependencies
    v: '🔖', // release / Version tags

    k: '🛠️', // Tools
    o: '💭', // Opinions and thoughts
    i: '👨‍💻', // Experiences and stories
  }

  let emojiHint = Object.entries(emojiMap)
    .reduce(
      (r, [k, v]) => [r[0].concat(v), r[1].concat(k.toUpperCase())],
      [[] as string[], [] as string[]],
    )
    .map((v, i) => v.join(i === 0 ? ' ' : '    '))
    .join('\n')

  return duoLayer('z', 'x')
    .notification(emojiHint)
    .manipulators([
      map(';').to(toKey('␣', '⌘⌃')), // emojiPicker

      withMapper(emojiMap)((k, v) => map(k).toPaste(v)),

      { 2: toPaste('⌫'), 3: toPaste('⌦'), 4: toPaste('⇥'), 5: toPaste('⎋') },
      { 6: toPaste('⌘'), 7: toPaste('⌥'), 8: toPaste('⌃'), 9: toPaste('⇧') },
      { 0: toPaste('⇪'), ',': toPaste('‹'), '.': toPaste('›') },

      withMapper(['←', '→', '↑', '↓', '␣', '⏎', '⌫', '⌦'])((k) =>
        map(k).toPaste(k),
      ),

      // Code snippets
      map('l').toTypeSequence('console.log()←'),
      map("'").toTypeSequence('⌫"'),
      map('[').toTypeSequence('[␣]␣'),
      map(']').toTypeSequence('-␣[␣]␣'),

      { "'": toKey('⌫'), '\\': toKey('⌦') },
    ])
}

function launchAppLayer() {
  return duoLayer('l', ';')
    .notification('Launch App 🚀 📱')
    .manipulators({
      b: toApp('Safari'), // Browser
      c: toApp('Calendar'),
      d: toApp('Eudb_en'), // Dictionary
      e: toApp('Zed'), // Editor
      f: toApp('Finder'),
      g: toApp('Google Chrome'),
      i: toApp('WeChat'), // IM
      m: toApp('Spark Desktop'), // Mail
      s: toApp('Slack'),
      w: to$(`open ~/Applications/WebStorm.app`),
      z: toApp('zoom.us'),

      ',': toApp('System Settings'),
    })
}

function openLinkLayer() {
  let links = require('./links.json') as Record<FromKeyParam, string>
  return duoLayer('.', '/')
    .notification('Open Link 🔗')
    .manipulators([withMapper(links)((k, v) => map(k).to$(`open "${v}"`))])
}

function systemLayer() {
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

function appMappings() {
  let historyNavi = [
    // Back/Forward history in most apps
    map('h', '⌃').to('[', '⌘'),
    map('l', '⌃').to(']', '⌘'),
  ]
  let tabNavi = [
    // Pre/Next tab in most apps
    map('h', '⌥').to('[', '⌘⇧'),
    map('l', '⌥').to(']', '⌘⇧'),
  ]
  let switcher = [
    // Pre/Next switcher in most apps
    map('h', '⌘⌥⌃').to('⇥', '⌃⇧'),
    map('l', '⌘⌥⌃').to('⇥', '⌃'),
  ]

  return rule('app mappings').manipulators([
    //region Chrome
    withCondition(ifApp('^com.google.Chrome$'))([
      ...historyNavi,
      ...tabNavi,
      ...switcher,

      tapModifier('‹⌥', toKey('r', '⌘')), // refreshThePage

      tapModifier('›⌘', toKey('i', '⌘⌥')), // developerTools
      tapModifier('›⌥', toKey('a', '⌘⇧')), // searchTabs

      map(1, 'Meh').to(toResizeWindow('Google Chrome')),
    ]),
    //endregion

    //region Safari
    withCondition(ifApp('^com.apple.Safari$'))([
      ...historyNavi,
      ...tabNavi,
      ...switcher,

      tapModifier('‹⌘', toKey('l', '⌘⇧')), // showHideSideBar
      tapModifier('‹⌥', toKey('r', '⌘')), // reloadPage

      tapModifier('›⌘', toKey('i', '⌘⌥')), // showWebInspector

      map(1, 'Meh').to(toResizeWindow('Safari')),
    ]),
    //endregion

    //region JetBrains IDE
    withCondition(ifApp('^com.jetbrains.[\\w-]+$'))([
      ...historyNavi,
      ...tabNavi,
      ...switcher,

      tapModifier('‹⌘', toKey('⎋', '⌘⇧')), // hideAllToolWindows
      tapModifier('‹⌥', toKey('r', '⌥⇧')), // run

      tapModifier('›⌘', toKey(4, '⌥')), // toolWindows_terminal
      tapModifier('›⌥', toKey('a', '⌘⇧')), // findAction
    ]),
    //endregion

    //region Zed
    withCondition(ifApp('^dev.zed.Zed$'))([
      ...historyNavi,
      ...tabNavi,
      ...switcher,

      tapModifier('‹⌘', toKey('y', '⌘⌥')), // closeAllDocks
      tapModifier('‹⌥', toKey('t', '⌥')), // taskRerun

      tapModifier('›⌘', toKey('`', '⌃')), // terminal
      tapModifier('›⌥', toKey('p', '⌘')), // fileFinder

      map(1, 'Meh').to(toResizeWindow('Zed')),
    ]),
    //endregion

    //region Slack
    withCondition(ifApp('^com.tinyspeck.slackmacgap$'))([
      ...historyNavi,

      tapModifier('‹⌘', toKey('d', '⌘⇧')), // showHideSideBar
      tapModifier('‹⌥', toKey('f6')), // moveFocusToTheNextSection

      tapModifier('›⌘', toKey('.', '⌘')), // hideRightBar
      tapModifier('›⌥', toKey('k', '⌘')), // open

      map(1, 'Meh').to(
        // After the 1/4 width, leave some space for opening thread in a new window
        // before the last 1/4 width
        toResizeWindow('Slack', { x: 1263, y: 25 }, { w: 1760, h: 1415 }),
      ),
    ]),
    //endregion

    //region Spark
    withCondition(ifApp('^com.readdle.SparkDesktop'))([
      tapModifier('‹⌘', toKey('/')), // openSidebar
      tapModifier('‹⌥', toKey('r', '⌘')), // fetch

      tapModifier('›⌘', toKey('/', '⌘')), // changeLayout
      tapModifier('›⌥', toKey('k', '⌘')), // actions

      map(1, 'Meh').to(toResizeWindow('Spark Desktop')),
    ]),
    //endregion

    //region Zoom
    withCondition(ifApp('^us.zoom.xos$'))([
      tapModifier('‹⌘', toKey('a', '⌘⇧')), // muteUnmuteMyAudio
      tapModifier('‹⌥', toKey('s', '⌘⇧')), // startStopScreenSharing

      tapModifier('›⌘', toKey('v', '⌘⇧')), // startStopVideo
      tapModifier('›⌥', toKey('h', '⌘⇧')), // showHideChatPanel
    ]),
    //endregion
  ])
}

function raycast() {
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

function homerow() {
  return rule('Homerow').manipulators([
    mapSimultaneous(['f', 'j']).to('␣', 'Hyper'), // Click
    mapSimultaneous(['f', 'k']).to('⏎', 'Hyper'), // Scroll
  ])
}

function duoModifiers() {
  return rule('duo-modifiers').manipulators([
    duoModifier('fd', '⌘'),
    duoModifier('fs', '⌃'),
    duoModifier('fa', '⌥'),

    duoModifier('ds', '⇧'),

    duoModifier('gd', '⌘⇧'),
    duoModifier('gs', '⌃⇧'),
    duoModifier('ga', '⌥⇧'),

    duoModifier('vc', '⌘⌥'),
    duoModifier('vx', '⌘⌃'),
    duoModifier('cx', '⌥⌃'),

    duoModifier('vz', '⌘⌥⌃'),

    duoModifier('jk', '⌘'),
    duoModifier('jl', '⌃'),
    duoModifier('j;', '⌥'),

    duoModifier('kl', '⇧'),

    duoModifier('hk', '⌘⇧'),
    duoModifier('hl', '⌃⇧'),
    duoModifier('h;', '⌥⇧'),

    duoModifier('m,', '⌘⌥'),
    duoModifier('m.', '⌘⌃'),
    duoModifier(',.', '⌥⌃'),

    duoModifier('m/', '⌘⌥⌃'),
  ])
}

function appleKeyboard() {
  let ifAppleKeyboard = ifDevice({ vendor_id: 1452, product_id: 835 })
  return rule('Apple Keyboard', ifAppleKeyboard).manipulators([
    map('⇪').to('⎋'),
    map('⇪', '⇧').to('⇪'),

    map('›⌘', '⌥').toHyper(),
    map('›⌥', '⇧').toMeh(),

    tapModifier('fn', toKey('␣', '⌘⇧')), // selectNextSourceInInputMenu
  ])
}

function moonlanderKeyboard() {
  let ifMoonlander = ifDevice({ vendor_id: 12951, product_id: 6505 })
  return rule('Moonlander', ifMoonlander).manipulators([
    map('⎋', '⇧').to('⇪'),
    map('⎋', '⇪').to('⇪'),

    tapModifier('‹⌃', toKey('␣', '⌘⇧')), // selectNextSourceInInputMenu
  ])
}
