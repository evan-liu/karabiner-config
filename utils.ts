import {
  type KeyAlias,
  type LetterKeyCode,
  map,
  mapSimultaneous,
  type ModifierKeyAlias,
  modifierKeyAliases,
  type MultiModifierAlias,
  multiModifierAliases,
  type SideModifierAlias,
  to$,
  type ToEvent,
  toRemoveNotificationMessage,
} from 'karabiner.ts'

/** Back/Forward history in most apps. */
export function historyNavi() {
  return [
    map('h', '⌃').to('[', '⌘'), //
    map('l', '⌃').to(']', '⌘'),
  ]
}

/** Pre/Next tab in most apps. */
export function tabNavi() {
  return [
    map('h', '⌥').to('[', '⌘⇧'), //
    map('l', '⌥').to(']', '⌘⇧'),
  ]
}

/** Pre/Next switcher in most apps. */
export function switcher() {
  return [
    map('h', '⌘⌥⌃').to('⇥', '⌃⇧'), //
    map('l', '⌘⌥⌃').to('⇥', '⌃'),
  ]
}

/**
 * Map when tap a modifier key; keep as modifier when hold.
 *
 * - ‹⌘ Show/Hide UI (e.g. left sidebars, or all UI)
 * - ‹⌥ Run current task (re-run)
 * - ‹⌃ Run list
 *
 * - ›⌘ Show/Hide UI (e.g. right sidebars, or terminal)
 * - ›⌥ Command Palette (e.g. ⌘K, ⌘P)
 * - ›⌃ History (e.g. recent files)
 */
export function tapModifiers(
  v: Partial<Record<SideModifierAlias | 'fn', ToEvent>>,
) {
  return Object.entries(v).map(([k, to]) => {
    let key = k as SideModifierAlias | 'fn'
    return map(key).to(key).toIfAlone(to)
  })
}

/** Modifiers via 2 keys. e.g. f+d -> ⌘ */
export function duoModifiers(
  v: Partial<
    Record<
      '⌘' | '⌥' | '⌃' | '⇧' | MultiModifierAlias,
      `${LetterKeyCode | KeyAlias}${LetterKeyCode | KeyAlias}`[]
    >
  >,
) {
  let result = []

  for (let [m, k] of Object.entries(v)) {
    for (let keys of k) {
      let id = k + m
      let [firstMod, ...restMods] = (
        m in modifierKeyAliases
          ? [modifierKeyAliases[m as ModifierKeyAlias]]
          : multiModifierAliases[m as MultiModifierAlias]
      ) as Array<'command' | 'control' | 'option' | 'shift'>

      result.push(
        mapSimultaneous(keys.split('') as (LetterKeyCode | KeyAlias)[], {
          to_after_key_up: [toRemoveNotificationMessage(id)],
        })
          .toNotificationMessage(id, m) // Must go first or to() doesn't work
          .to(`left_${firstMod}`, restMods),
      )
    }
  }

  return result
}

export function raycastExt(name: string) {
  return to$(`open raycast://extensions/${name}`)
}

export function raycastWin(name: string) {
  return to$(`open -g raycast://extensions/raycast/window-management/${name}`)
}

export function toResizeWindow(
  app: string,
  position = { x: 0, y: 220 }, // First window, below widgets
  size = { w: 1262, h: 1220 }, // First 1/4 width, screen height - widgets height
) {
  return to$(`osascript -e '\
set windowPosition to {${position.x}, ${position.y}}
set windowSize to {${size.w}, ${size.h}}

tell application "System Events"
  tell process "${app}"
    set frontWindow to first window
    set position of frontWindow to windowPosition
    set size of frontWindow to windowSize
  end tell
end tell'`)
}

/** @see https://gist.github.com/lancethomps/a5ac103f334b171f70ce2ff983220b4f?permalink_comment_id=4698498#gistcomment-4698498 */
export let toClearNotifications = to$(`osascript -e '\
tell application "System Events"
  try
    repeat
      set _groups to groups of UI element 1 of scroll area 1 of group 1 of window "Notification Center" of application process "NotificationCenter"
      set numGroups to number of _groups
      if numGroups = 0 then
        exit repeat
      end if
      repeat with _group in _groups
        set _actions to actions of _group
        set actionPerformed to false
        repeat with _action in _actions
          if description of _action is in {"Clear All", "Close"} then
            perform _action
            set actionPerformed to true
            exit repeat
          end if
        end repeat
        if actionPerformed then
          exit repeat
        end if
      end repeat
    end repeat
  end try
end tell'`)

export function toSystemSetting(pane: string) {
  let path = `/System/Library/PreferencePanes/${pane}.prefPane`
  return to$(`open -b com.apple.systempreferences ${path}`)
}
