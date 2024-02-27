import { For } from 'solid-js';
import armorData from '../../data/armor.json';
import weaponData from '../../data/weapons.json';
import { CharacterWornSlots, WornSpots } from '../../utils/data-types';
import { setCharacters } from '../../state/character-state';
import { produce } from 'solid-js/store';

type EquipmentSelectProps = {
  characterIndex: number;
  wornSlot: number;
  value: number;
};

export function EquipmentSelect({
  characterIndex,
  value,
  wornSlot,
}: EquipmentSelectProps) {
  const slot = WornSpots.findIndex(
    (value) => value === CharacterWornSlots[wornSlot],
  );
  const validEquipment =
    wornSlot === 17 ? weaponData : armorData.filter((arm) => arm.Worn === slot);

  return (
    <select
      value={String(value)}
      onChange={(e) => {
        console.log(e.target.value);
        setCharacters(
          characterIndex,
          'worn',
          produce((worn) => {
            worn[wornSlot] = Number(e.target.value);
          }),
        );
      }}
    >
      <option value="0">Nothing</option>
      <For each={validEquipment}>
        {(eq) => <option value={eq.Number}>{eq.Name}</option>}
      </For>
    </select>
  );
}
