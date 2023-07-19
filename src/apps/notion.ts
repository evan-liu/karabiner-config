import { ifApp, toKey } from 'karabiner.ts'

export const ifNotion = ifApp('^notion.id$')

export const notion = {
  openCloseSidebar: toKey('\\', '⌘'),
  openSearch: toKey('p', '⌘'),
}
