import {
  KeyAlias,
  LetterKeyCode,
  mapSimultaneous,
  ModifierKeyAlias,
  modifierKeyAliases,
  MultiModifierAlias,
  multiModifierAliases,
  toRemoveNotificationMessage,
} from 'karabiner.ts'

type Key = LetterKeyCode | KeyAlias
type Mod = 'command' | 'control' | 'option' | 'shift'

export function duoModifier(
  keys: `${Key}${Key}`,
  modifier: '⌘' | '⌥' | '⌃' | '⇧' | MultiModifierAlias,
) {
  const id = keys + modifier

  const parsedModifiers =
    modifier in modifierKeyAliases
      ? ([modifierKeyAliases[modifier as ModifierKeyAlias]] as Mod[])
      : (multiModifierAliases[modifier as MultiModifierAlias] as Mod[])
  const to_after_key_up = [toRemoveNotificationMessage(id)]
  return mapSimultaneous(keys.split('') as Key[], { to_after_key_up })
    .toNotificationMessage(id, modifier) // Must go first or to() doesn't work
    .to(`left_${parsedModifiers[0]}`, parsedModifiers.slice(1))
}
