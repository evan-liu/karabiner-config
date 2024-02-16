import { ifApp, toKey } from 'karabiner.ts'

export const ifChatGPT = ifApp('^com.lencx.chatgpt$')

export const chatGPT = {
  controlCenter: toKey('p', '⌘⇧'),
}
