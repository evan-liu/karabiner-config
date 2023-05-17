import { ide } from '../apps/jetbrains-ide'

export const versionControlLeft = {
  '⏎': ide.versionControl_popup,

  j: ide.navigateInFile_previousChange,
  k: ide.navigateInFile_nextChange,

  h: ide.versionControl_commitMessageHistory,
  n: ide.versionControl_newBranch,
  u: ide.versionControl_updateProject,
  p: ide.versionControl_push,
}
export const versionControlRight = {
  f: ide.versionControl_showAllAffectedFiles,
  a: ide.versionControl_amendCommit,
  b: ide.versionControl_branches,
  c: ide.versionControl_commit,
  z: ide.versionControl_rollBack,
}
