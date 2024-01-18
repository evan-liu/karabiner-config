import { to$ } from 'karabiner.ts'

export function toSafari(link: string, check = link) {
  return to$(`osascript -e '
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
