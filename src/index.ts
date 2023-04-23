import { writeToProfile } from 'karabiner-config'
import { slashMode } from './layers/slash-mode'
import { zMode } from './layers/z-mode'
import { arc } from './apps/arc'
import { slack } from './apps/slack'
import { jetbrainsIde } from './apps/jetbrains-ide'
import { sourceTree } from './apps/sourcetree'
import { airmail } from './apps/airmail'
import { openApp } from './system/open-app'
import { mouseCursor } from './system/mouse-cursor'
import { universal } from './system/universal'
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
  slashMode,
  zMode,

  // system
  mouseCursor,
  openApp,
  universal,
])
