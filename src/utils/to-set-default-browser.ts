import { to$ } from 'karabiner.ts'

export function toSetDefaultBrowser(browser: 'chrome' | 'safari') {
  return to$(`/opt/homebrew/bin/defaultbrowser ${browser}`)
}

export function toConfirmDefaultBrowser() {
  return to$(`osascript -e '
tell application "System Events"
  tell application process "CoreServicesUIAgent"
    tell window 1
      tell (first button whose name starts with "use")
        perform action "AXPress"
      end tell
    end tell
  end tell
end tell'`)
}
