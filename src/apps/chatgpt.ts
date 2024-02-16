import { ifApp, toKey } from 'karabiner.ts'

export const ifChatGPT = ifApp('^com.lencx.chatgpt$')

export const chatGPT = {
  openNewChat: toKey('o', '⌘⇧'),
  toggleSidebar: toKey('s', '⌘⇧'),

  focusChatInput: toKey('⎋', '⇧'),

  controlCenter: toKey('p', '⌘⇧'),
}
