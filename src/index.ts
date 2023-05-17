import { duoLayer, writeToProfile } from 'karabiner.ts'
import { ifIde } from './apps/jetbrains-ide'
import { appleKeyboard } from './devices/apple'
import { moonlander } from './devices/moonlander'
import { appModifier } from './apps/app-modifier'
import {
  primaryLeft,
  primaryLeftNoArrows,
  primaryRight,
} from './layers/primary'
import { secondaryLeft, secondaryRight } from './layers/secondary'
import {
  tertiaryLeft,
  tertiaryRight,
  tertiaryRightIde,
} from './layers/tertiary'
import {
  versionControlLeft,
  versionControlRight,
} from './layers/ide-version-control'
import { refactorLeft, refactorRight } from './layers/ide-refactor'
import { switchCaseLeft, switchCaseRight } from './layers/ide-switch-case'
import { emojiSymbol } from './layers/emoji-symbol'
import { launchApp } from './layers/launch-app'

writeToProfile('Default', [
  // =========================
  // == 🏠  home row  🏠 == //
  // =========================

  // -- 🥇 Primary f,d  j,k -- //
  duoLayer('f', 'd').manipulators(primaryLeft),
  duoLayer('j', 'k').manipulators(primaryRight),
  duoLayer('f', 'w').manipulators(primaryLeftNoArrows),

  // -- 🥈 Secondary f,s  j,l -- //
  duoLayer('f', 's').manipulators(secondaryLeft),
  duoLayer('j', 'l').manipulators(secondaryRight),

  // -- 🥉 Tertiary f,x  k,l -- //
  // d,s are used together in words
  duoLayer('f', 'x').manipulators(tertiaryLeft),
  duoLayer('k', 'l').manipulators(tertiaryRight),
  duoLayer('j', '.').condition(ifIde).manipulators(tertiaryRightIde),

  // =========================
  // == ⬇️ bottom row ⬇️ == //
  // =========================

  // -- 🔖 Version Control -- //
  duoLayer('v', 'c').condition(ifIde).manipulators(versionControlLeft),
  duoLayer('m', ',').condition(ifIde).manipulators(versionControlRight),

  // -- ♻️ Refactor -- //
  duoLayer('v', 'x').condition(ifIde).manipulators(refactorLeft),
  duoLayer('m', '.').condition(ifIde).manipulators(refactorRight),

  // -- 🔠 Switch Case -- //
  duoLayer('c', 'x').condition(ifIde).manipulators(switchCaseLeft),
  duoLayer(',', '.').condition(ifIde).manipulators(switchCaseRight),

  // =========================
  // ==  ✨  Others  ✨  == //
  // =========================
  duoLayer('z', 'x').manipulators(emojiSymbol),
  duoLayer('l', ';').manipulators(launchApp),

  appModifier,

  appleKeyboard,
  moonlander,
])
