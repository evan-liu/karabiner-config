import { map, withMapper } from 'karabiner.ts'

export const numbers = [
  withMapper([
    'n', //             // 0
    ...['m', ',', '.'], // 1 2 3
    ...['j', 'k', 'l'], // 4 5 6
    ...['u', 'i', 'o'], // 7 8 9
  ] as const)((k, i) => map(k).to(`keypad_${i as 0}`)),
]
