import {
  duoLayer,
  FromKeyParam,
  ifApp,
  ifDevice,
  KeyAlias,
  layer,
  LetterKeyCode,
  map,
  mapSimultaneous,
  ModifierKeyAlias,
  modifierKeyAliases,
  MultiModifierAlias,
  multiModifierAliases,
  rule,
  SideModifierAlias,
  to$,
  toApp,
  ToEvent,
  toKey,
  toMouseCursorPosition,
  toPaste,
  toPointingButton,
  toRemoveNotificationMessage,
  toSleepSystem,
  withCondition,
  withMapper,
  withModifier,
  writeToProfile,
} from 'karabiner.ts'

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
      w: toUserApp('WebStorm'),
      z: toApp('zoom.us'),

      ',': toApp('System Settings'),
    })

  // `open -a` sometimes gets confused by the non-standard path
  function toUserApp(name: string) {
    return to$(`open ~/Applications/${name}.app`)
  }
}

function openLinkLayer() {
  return duoLayer('.', '/')
    .notification('Open Link 🔗')
    .manipulators([withMapper(links())((k, v) => map(k).to$(`open "${v}"`))])

  function links(): Partial<Record<FromKeyParam, string>> {
    try {
      return require('./links.json')
    } catch {
      return {}
    }
  }
}

function systemLayer() {
  return layer('`', 'system').manipulators({
    1: toMouseCursorPosition({ x: '25%', y: '50%', screen: 0 }),
    2: toMouseCursorPosition({ x: '50%', y: '50%', screen: 0 }),
    3: toMouseCursorPosition({ x: '75%', y: '50%', screen: 0 }),
    4: toMouseCursorPosition({ x: '99%', y: 20, screen: 0 }),

    5: toMouseCursorPosition({ x: '50%', y: '50%', screen: 1 }),

    '⏎': toPointingButton('button1'),

    n: toClearNotifications(),

    '␣': toSleepSystem(),

    j: toKey('⇥', '⌘'),
    k: toKey('⇥', '⌘⇧'),
  })

  /** @see https://gist.github.com/lancethomps/a5ac103f334b171f70ce2ff983220b4f?permalink_comment_id=4698498#gistcomment-4698498 */
  function toClearNotifications() {
    return to$(`osascript -e '\
tell application "System Events"
  try
    repeat
      set _groups to groups of UI element 1 of scroll area 1 of group 1 of window "Notification Center" of application process "NotificationCenter"
      set numGroups to number of _groups
      if numGroups = 0 then
        exit repeat
      end if
      repeat with _group in _groups
        set _actions to actions of _group
        set actionPerformed to false
        repeat with _action in _actions
          if description of _action is in {"Clear All", "Close"} then
            perform _action
            set actionPerformed to true
            exit repeat
          end if
        end repeat
        if actionPerformed then
          exit repeat
        end if
      end repeat
    end repeat
  end try
end tell'`)
  }
}

function appMappings() {
  let tapModifier = (v: SideModifierAlias, to: ToEvent) =>
    map(v).to(v).toIfAlone(to)

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
    //region Spark
    withCondition(ifApp('^com.readdle.SparkDesktop'))([
      tapModifier('‹⌘', toKey('/')), // openSidebar
      tapModifier('‹⌥', toKey('r', '⌘')), // fetch

      tapModifier('›⌘', toKey('/', '⌘')), // changeLayout
      tapModifier('›⌥', toKey('k', '⌘')), // actions

      map(1, 'Meh').to(toResizeWindow('Spark Desktop')),
    ]),
    //endregion

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

      map(1, 'Meh').to(toSlackWindow()),
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

  function toResizeWindow(
    app: string,
    position = { x: 0, y: 220 }, // First window, below widgets
    size = { w: 1262, h: 1220 }, // First 1/4 width, screen height - widgets height
  ) {
    return to$(`osascript -e '\
set windowPosition to {${position.x}, ${position.y}}
set windowSize to {${size.w}, ${size.h}}

tell application "System Events"
  tell process "${app}"
    set frontWindow to first window
    set position of frontWindow to windowPosition
    set size of frontWindow to windowSize
  end tell
end tell'`)
  }

  function toSlackWindow() {
    // After the 1/4 width, leave some space for opening thread in new window
    // before the last 1/4 width
    return toResizeWindow('Slack', { x: 1263, y: 25 }, { w: 1760, h: 1415 })
  }
}

function raycast() {
  return rule('Raycast').manipulators([
    map('␣', '⌥').to(cmd('evan-liu/quick-open/index')),

    withModifier('Hyper')({
      c: cmd('raycast/calendar/my-schedule'),
      d: cmd('isfeng/easydict/easydict'),
      e: cmd('raycast/emoji-symbols/search-emoji-symbols'),
      f: cmd('ratoru/google-maps-search/find'),
      g: cmd('ricoberger/gitmoji/gitmoji'),
      m: cmd('raycast/navigation/search-menu-items'),
      n: cmd('raycast/github/notifications'),
      s: cmd('raycast/snippets/search-snippets'),
      v: cmd('raycast/clipboard-history/clipboard-history'),
      w: cmd('raycast/navigation/switch-windows'),
    }),
    withModifier('Hyper')({
      '↑': win('previous-display'),
      '↓': win('next-display'),
      '←': win('previous-desktop'),
      '→': win('next-desktop'),
    }),
    withModifier('Hyper')({
      1: win('first-third'),
      2: win('center-third'),
      3: win('last-third'),
      4: win('first-two-thirds'),
      5: win('last-two-thirds'),
      9: win('left-half'),
      0: win('right-half'),
    }),
    withModifier('Meh')({
      1: win('first-fourth'),
      2: win('second-fourth'),
      3: win('third-fourth'),
      4: win('last-fourth'),
      5: win('center'),
      6: win('center-half'),
      7: win('center-two-thirds'),
      8: win('maximize'),
    }),
  ])

  function cmd(name: string) {
    return to$(`open raycast://extensions/${name}`)
  }

  function win(name: string) {
    return to$(`open -g raycast://extensions/raycast/window-management/${name}`)
  }
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

  function duoModifier(
    keys: `${LetterKeyCode | KeyAlias}${LetterKeyCode | KeyAlias}`,
    modifier: '⌘' | '⌥' | '⌃' | '⇧' | MultiModifierAlias,
  ) {
    let id = keys + modifier
    let [firstMod, ...restMods] = (
      modifier in modifierKeyAliases
        ? [modifierKeyAliases[modifier as ModifierKeyAlias]]
        : multiModifierAliases[modifier as MultiModifierAlias]
    ) as Array<'command' | 'control' | 'option' | 'shift'>
    let to_after_key_up = [toRemoveNotificationMessage(id)]
    return mapSimultaneous(keys.split('') as (LetterKeyCode | KeyAlias)[], {
      to_after_key_up,
    })
      .toNotificationMessage(id, modifier) // Must go first or to() doesn't work
      .to(`left_${firstMod}`, restMods)
  }
}

function appleKeyboard() {
  let ifAppleKeyboard = ifDevice({ vendor_id: 1452, product_id: 835 })
  return rule('Apple Keyboard', ifAppleKeyboard).manipulators([
    map('⇪').to('⎋'),
    map('⇪', '⇧').to('⇪'),

    map('›⌘', '⌥').toHyper(),
    map('›⌥', '⇧').toMeh(),

    map('fn').to(toKey('␣', '⌘⇧')), // selectNextSourceInInputMenu
  ])
}

function moonlanderKeyboard() {
  let ifMoonlander = ifDevice({ vendor_id: 12951, product_id: 6505 })
  return rule('Moonlander', ifMoonlander).manipulators([
    map('⎋', '⇧').to('⇪'),
    map('⎋', '⇪').to('⇪'),

    map('‹⌃').to(toKey('␣', '⌘⇧')), // selectNextSourceInInputMenu
  ])
}
