import { Accessor, For } from 'solid-js';
import { armorData, weaponData } from '../../data';
import { CharacterWornSlots, WornSpots } from '../../utils/data-types';
import { setCharacters } from '../../state/character-state';
import { produce } from 'solid-js/store';
import { Character } from '../../types';

type EquipmentSelectProps = {
  characterIndex: Accessor<number>;
  character: Accessor<Character>;
  wornSlot: number;
  index: Accessor<number>;
};

export function EquipmentSelect({
  characterIndex,
  character,
  index,
  wornSlot,
}: EquipmentSelectProps) {
  const slot = WornSpots.findIndex(
    (value) => value === CharacterWornSlots[wornSlot],
  );
  const validEquipment =
    wornSlot === 17 ? weaponData : armorData.filter((arm) => arm.Worn === slot);
  const sortedEquipment = validEquipment.sort((a, b) =>
    a.Name.localeCompare(b.Name),
  );

  return (
    <select
      value={String(character().worn[index()])}
      onChange={(e) => {
        setCharacters(
          characterIndex(),
          'worn',
          produce((worn) => {
            worn[wornSlot] = Number(e.target.value);
          }),
        );
      }}
    >
      <option value="0">Nothing</option>
      <For each={sortedEquipment}>
        {(eq) => <option value={eq.Number}>{eq.Name}</option>}
      </For>
    </select>
  );
}
