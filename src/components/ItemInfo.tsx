import { itemData, armorData, weaponData } from '../data';
import { WeaponReference, ItemReference, ArmorReference } from './references';

type ItemInfoProps = {
  Number: number;
};

export function ItemInfo({ Number }: ItemInfoProps) {
  const item =
    armorData.find((armor) => armor.Number === Number) ||
    weaponData.find((weapon) => weapon.Number === Number) ||
    itemData.find((item) => item.Number === Number);

  if (!item) return null;
  if (item.ItemType === 0) return <ArmorReference number={item.Number} />;
  if (item.ItemType === 1) return <WeaponReference number={item.Number} />;

  return <ItemReference number={item.Number} />;

  return null;
}
