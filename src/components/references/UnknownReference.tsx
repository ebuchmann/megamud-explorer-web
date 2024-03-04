import { itemData, armorData, weaponData } from '../../data';
import { WeaponReference, ItemReference, ArmorReference } from './';

type UnknownReferenceProps = {
  number: number;
};

export function UnknownReference({ number }: UnknownReferenceProps) {
  const item =
    armorData.find((armor) => armor.Number === number) ||
    weaponData.find((weapon) => weapon.Number === number) ||
    itemData.find((item) => item.Number === number);

  if (!item) return <div>Unknown item ({number})</div>;
  if (item.ItemType === 0) return <ArmorReference number={item.Number} />;
  if (item.ItemType === 1) return <WeaponReference number={item.Number} />;

  return <ItemReference number={item.Number} />;
}
