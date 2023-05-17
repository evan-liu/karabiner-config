import { ide } from '../apps/jetbrains-ide'

export const switchCaseLeft = {
  '⏎': ide.switchCase_popup,

  k: ide.switchCase_kebabCase,
  l: ide.switchCase_lowerCase,
  p: ide.switchCase_pascalCase,
  u: ide.switchCase_upperCase,
}
export const switchCaseRight = {
  c: ide.switchCase_camelCase,
  s: ide.switchCase_snakeCase,
  t: ide.switchCase_capitalizedWords,
  w: ide.switchCase_firstWordCapitalized,
}
