import { to$ } from 'karabiner.ts'

export function toSafari(space: string, link: string, check = link) {
  // key code for space 1 is 18 (2 -> 19, etc.)
  return to$(`osascript -e '
tell application "System Events"
  key code ${+space + 17} using (control down)
  delay 0.2
end tell 

tell application "Safari"
  activate
  
  set win to front window
  set foundTab to false
  repeat with i from 1 to count (tabs of win)
    if URL of tab i of win contains "${check}" then
      tell win to set current tab to tab i
      set foundTab to true
      exit repeat
    end if
  end repeat
    
  if not foundTab then
    open location "${link}"
  end if
  
end tell'`)
}
