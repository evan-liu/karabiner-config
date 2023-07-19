import { join } from 'node:path'
import { toPlaySound } from 'karabiner.ts'

export function toLocalSound(name: 'pop') {
  return toPlaySound(join(__dirname, `../../assets/sounds/${name}.wav`))
}
