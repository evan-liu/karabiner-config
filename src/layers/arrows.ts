import { ToEvent, toKey } from 'karabiner.ts'

export const arrowMode = {
  h: toKey('←'),
  j: toKey('↓'),
  k: toKey('↑'),
  l: toKey('→'),

  n: toKey('←', '⌘'),
  m: toKey('↓', '⌘'),
  ',': toKey('↑', '⌘'),
  '.': toKey('→', '⌘'),

  y: toKey('←', '⌥'),
  u: toKey('↓', '⌥'),
  i: toKey('↑', '⌥'),
  o: toKey('→', '⌥'),

  6: toKey('←', '⌃'),
  7: toKey('↓', '⌃'),
  8: toKey('↑', '⌃'),
  9: toKey('→', '⌃'),
}

const withShift = (e: ToEvent) => ({
  ...e,
  modifiers: [...(e.modifiers || []), 'shift'],
})
export const arrowShift = Object.entries(arrowMode).reduce(
  (r, [k, v]) => ({ ...r, [k]: withShift(v) }),
  {},
)

export const deleteMode = {
  j: toKey('⌫'),
  k: toKey('⌦'),

  m: toKey('⌫', '⌘'),
  ',': toKey('⌦', '⌘'),

  u: toKey('⌫', '⌥'),
  i: toKey('⌦', '⌥'),

  7: toKey('⌫', '⌃'),
  8: toKey('⌦', '⌃'),
}
