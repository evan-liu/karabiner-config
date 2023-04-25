import { map } from 'karabiner.ts'

// This is to work with Moonlander Tap Dance (https://blog.zsa.io/2101-introducing-tap-dance/)
// Moonlander modifier 'tapped' and 'double-tapped' are firstly mapped to Hyper+F-keys
// then map to other keys via Karabiner, differently for different apps.
const tapMap = {
  left: { '⌘': 'f1', '⌥': 'f3', '⌃': 'f5' },
  right: { '⌘': 'f7', '⌥': 'f9', '⌃': 'f11' },
  doubleLeft: { '⌘': 'f2', '⌥': 'f4', '⌃': 'f6' },
  doubleRight: { '⌘': 'f8', '⌥': 'f10', '⌃': 'f12' },
  double: { '⇪': 'f13' },
} as const

type TapKey = keyof (typeof tapMap)['left']

export const left = (v: TapKey) => map(tapMap.left[v], 'Hyper')
export const right = (v: TapKey) => map(tapMap.right[v], 'Hyper')
export const doubleLeft = (v: TapKey) => map(tapMap.doubleLeft[v], 'Hyper')
export const doubleRight = (v: TapKey) => map(tapMap.doubleRight[v], 'Hyper')
export const double = (v: '⇪') => map(tapMap.double[v], 'Hyper')
