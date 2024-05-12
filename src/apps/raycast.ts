import { to$ } from 'karabiner.ts'

export const raycast = {
  confetti: to$('open raycast://confetti'),

  quickOpen: cmd('evan-liu/quick-open/index'),

  easydict: cmd('isfeng/easydict/easydict'),
  gitmoji: cmd('ricoberger/gitmoji/gitmoji'),

  searchEmojiSymbols: cmd('raycast/emoji-symbols/search-emoji-symbols'),
  searchMenuItems: cmd('raycast/navigation/search-menu-items'),
  switchWindows: cmd('raycast/navigation/switch-windows'),
  searchSnippets: cmd('raycast/snippets/search-snippets'),
  clipboardHistory: cmd('raycast/clipboard-history/clipboard-history'),
  githubNotifications: cmd('raycast/github/notifications'),

  win: {
    firstThird: win('first-third'),
    centerThird: win('center-third'),
    lastThird: win('last-third'),
    firstTwoThirds: win('first-two-thirds'),
    lastTwoThirds: win('last-two-thirds'),
    leftHalf: win('left-half'),
    rightHalf: win('right-half'),

    firstFourth: win('first-fourth'),
    secondFourth: win('second-fourth'),
    thirdFourth: win('third-fourth'),
    lastFourth: win('last-fourth'),
    center: win('center'),
    centerHalf: win('center-half'),
    centerTwoThirds: win('center-two-thirds'),
    maximize: win('maximize'),

    previousDisplay: win('previous-display'),
    nextDisplay: win('next-display'),
    previousDesktop: win('previous-desktop'),
    nextDesktop: win('next-desktop'),
  },
}

function cmd(name: string) {
  return to$(`open raycast://extensions/${name}`)
}

function win(name: string) {
  return to$(`open -g raycast://extensions/raycast/window-management/${name}`)
}
