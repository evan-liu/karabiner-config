import { toKey } from 'karabiner.ts'

export const system = {
  showNotificationCenter: toKey('n', 'Hyper'),

  moveFocusToTheMenuBar: toKey('m', 'Hyper'),
  moveFocusToNextWindow: toKey('`', '⌘'),

  selectNextSourceInInputMenu: toKey('␣', '⌘⇧'),

  screenshotAndRecordingOptions: toKey('`', 'Meh'),

  emojiPicker: toKey('␣', '⌘⌃'),

  forceQuitApp: toKey('⎋', '⌘⌥'),

  lockScreen: toKey('q', '⌘⌥'),
}
