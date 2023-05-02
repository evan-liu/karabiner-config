import { writeToProfile } from 'karabiner.ts'
import { emojiMode } from './layers/emoji-mode'
import { arc } from './apps/arc'
import { slack } from './apps/slack'
import { jetbrainsIde } from './apps/jetbrains-ide'
import { sourceTree } from './apps/sourcetree'
import { airmail } from './apps/airmail'
import { openApp } from './system/open-app'
import { mouseCursor } from './system/mouse-cursor'
import { appleKeyboard } from './devices/apple-keyboard'
import { moonlander } from './devices/moonlander'

writeToProfile('Default', [
  // apps
  airmail,
  arc,
  jetbrainsIde,
  slack,
  sourceTree,

  // devices
  appleKeyboard,
  moonlander,

  // layers
  emojiMode,

  // system
  mouseCursor,
  openApp,
])
