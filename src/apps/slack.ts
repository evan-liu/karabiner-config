import { ifApp, toKey } from 'karabiner.ts'

export const ifSlack = ifApp('^com.tinyspeck.slackmacgap$')

export const slack = {
  showHideSideBar: toKey('d', '⌘⇧'),
  moveFocusToTheNextSection: toKey('f6'),
  hideRightBar: toKey('.', '⌘'),
  open: toKey('k', '⌘'),
}
