import { map, toKey, withMapper } from 'karabiner.ts'

export const digitsAndDelete = [
  // digits keypad_{i}
  withMapper([
    'n', //             // 0
    ...['m', ',', '.'], // 1 2 3
    ...['j', 'k', 'l'], // 4 5 6
    ...['u', 'i', 'o'], // 7 8 9
  ] as const)((k, i) => map(k).to(`keypad_${i as 0}`)),
  map('/').to('keypad_period'), // 0 1 2 3 .

  // delete ⌫ ⌦
  {
    "'": toKey('⌦'),
    ';': toKey('⌫'),
    h: toKey('⌫', '⌥'),
    y: toKey('⌫', '⌘'),
    p: toKey('⌦', '⌘'),
  },
]
