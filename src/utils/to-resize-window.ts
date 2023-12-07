import { to$ } from 'karabiner.ts'

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

export function toSlackWindow() {
  // After the 1/4 width, leave some space for opening thread in new window
  // before the last 1/4 width
  return toResizeWindow('Slack', { x: 1263, y: 25 }, { w: 1760, h: 1415 })
}
