import { to$ } from 'karabiner.ts'

export function toArc(link: string) {
  return to$(`osascript -e '
tell application "Arc"
  activate

  set foundTab to false
  set windowIndex to 1
  
  repeat with win in windows
    set tabIndex to 1
    repeat with t in tabs of win
      if URL of t contains "${link}" then
        set foundTab to true
        tell window windowIndex
          tell tab tabIndex to select
        end tell
        exit repeat
      end if
      set tabIndex to tabIndex + 1
    end repeat
    if foundTab then exit repeat
    set windowIndex to windowIndex + 1
  end repeat
  if not foundTab then
    open location "${link}"
  end if
end tell'`)
}
