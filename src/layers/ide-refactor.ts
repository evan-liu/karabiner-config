import { ide } from '../apps/jetbrains-ide'

export const refactorLeft = {
  '⏎': ide.refactor_popup,

  j: ide.navigate_byReference_superMethod,
  k: ide.navigate_byReference_implementations,

  m: ide.refactor_move,
  i: ide.refactor_inline,
  p: ide.refactor_introduceParameter,
}
export const refactorRight = {
  s: ide.refactor_changeSignature,
  f: ide.refactor_introduceField,
  v: ide.refactor_introduceVariable,
  c: ide.refactor_introduceConstant,
  r: ide.refactor_rename,
}
