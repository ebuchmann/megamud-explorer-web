import weaponsJSON from '../data/weapons.json';
import armorJSON from '../data/armor.json';
import itemJSON from '../data/items.json';
import { Armor, Weapon, Item } from '../types';

type ItemInfoProps = {
  Number: number;
};

export function ItemInfo({ Number }: ItemInfoProps) {
  return (
    <>
      {(
        armorJSON.find((armor: Armor) => armor.Number === Number) ||
        weaponsJSON.find((weapon: Weapon) => weapon.Number === Number) ||
        itemJSON.find((item: Item) => item.Number === Number)
      )?.Name || Number}
    </>
  );
}
