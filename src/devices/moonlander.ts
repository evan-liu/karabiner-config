import { ifDevice, map, rule } from "karabiner.ts";
import { system } from "../apps/system";

export const ifMoonlander = ifDevice({ vendor_id: 12951, product_id: 6505 })

export const moonlander = rule('Moonlander', ifMoonlander).manipulators([
  map('⎋', '⇧').to('⇪'),
  map('⎋', '⇪').to('⇪'),

  map('‹⌃').to(system.selectNextSourceInInputMenu),
])
