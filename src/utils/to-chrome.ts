import { to$ } from 'karabiner.ts'

export function toChrome(link: string, check = link) {
  return to$(`osascript -e '
tell application "Google Chrome"
  activate

  set foundTab to false
  set windowIndex to 1
  
  repeat with win in windows
    set tabIndex to 1
    repeat with t in tabs of win
      if URL of t contains "${check}" then
        set foundTab to true
        tell window windowIndex
          set active tab index to tabIndex
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
