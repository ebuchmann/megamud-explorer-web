import { debounce } from '@solid-primitives/scheduled';
import { Character, Class, Race } from '../../types';
import { characters, setCharacters } from '../../state/character-state';
import { For, createEffect, createSignal } from 'solid-js';
import { classData, raceData } from '../../data';
import { CharacterWornSlots } from '../../utils/data-types';
import { EquipmentSelect } from './EquipmentSelect';
import { useNavigate, useParams } from '@solidjs/router';
import { StatInput } from './StatInput';
import { PasteModal } from './PasteModal';

export function CharacterBox() {
  const params = useParams();
  const navigate = useNavigate();
  const character = characters.find((char) => char.id === params.id);

  if (!character) return <p>No character found</p>;

  const [selectedCharacter, setSelectedCharacter] = createSignal<Character>(
    characters.find((char) => char.id === params.id) as Character,
  );
  const [selectedIndex, setSelectedIndex] = createSignal<number>(
    characters.findIndex((char) => char.id === params.id),
  );

  const [selectedClass, setSelectedClass] = createSignal<Class | undefined>(
    classData.find((cl) => cl.Number === character.cls),
  );
  const [selectedRace, setSelectedRace] = createSignal<Race | undefined>(
    raceData.find((cl) => cl.Number === character.race),
  );

  createEffect(() => {
    setSelectedClass(
      classData.find((cl) => cl.Number === selectedCharacter().cls),
    );
  });
  createEffect(() => {
    setSelectedRace(
      raceData.find((cl) => cl.Number === selectedCharacter().race),
    );
  });
  createEffect(() => {
    setSelectedCharacter(
      characters.find((char) => char.id === params.id) as Character,
    );
    setSelectedIndex(characters.findIndex((char) => char.id === params.id));
  });

  return (
    <div class="p-2 flex gap-2">
      <div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>
              Name
              <input
                class="p-2"
                type="text"
                value={selectedCharacter().name}
                onInput={debounce((e) => {
                  setCharacters(selectedIndex(), 'name', e.target.value);
                }, 500)}
              />
            </label>
          </div>
          <div>
            <label>
              Level
              <input
                class="p-2"
                type="number"
                value={selectedCharacter().level}
                onInput={debounce((e) => {
                  setCharacters(
                    selectedIndex(),
                    'level',
                    Number(e.target.value),
                  );
                }, 500)}
              />
            </label>
          </div>
          <div>
            <label>
              Race
              <select
                class="p-2"
                value={Number(selectedCharacter().race)}
                onChange={(e) =>
                  setCharacters(selectedIndex(), 'race', Number(e.target.value))
                }
              >
                <option value="0">Any</option>
                <For each={raceData}>
                  {(race) => <option value={race.Number}>{race.Name}</option>}
                </For>
              </select>
            </label>
          </div>
          <div>
            <label>
              Class
              <select
                class="p-2"
                value={Number(selectedCharacter().cls)}
                onChange={(e) =>
                  setCharacters(selectedIndex(), 'cls', Number(e.target.value))
                }
              >
                <option value="0">Any</option>
                <For each={classData}>
                  {(cls) => <option value={cls.Number}>{cls.Name}</option>}
                </For>
              </select>
            </label>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 grid-flow-col grid-rows-3">
          <StatInput
            label="Strength"
            race={selectedRace}
            character={selectedCharacter}
            index={selectedIndex}
            stat="str"
          />
          <StatInput
            label="Intellect"
            race={selectedRace}
            character={selectedCharacter}
            index={selectedIndex}
            stat="int"
          />
          <StatInput
            label="Willpower"
            race={selectedRace}
            character={selectedCharacter}
            index={selectedIndex}
            stat="wil"
          />
          <StatInput
            label="Agility"
            race={selectedRace}
            character={selectedCharacter}
            index={selectedIndex}
            stat="agl"
          />
          <StatInput
            label="Health"
            race={selectedRace}
            character={selectedCharacter}
            index={selectedIndex}
            stat="hea"
          />
          <StatInput
            label="Charm"
            race={selectedRace}
            character={selectedCharacter}
            index={selectedIndex}
            stat="chm"
          />
        </div>
      </div>
      <div>
        <h3>Equipment</h3>
        <div class="grid  gap-2 grid-cols-2 auto-cols-min">
          <For each={CharacterWornSlots}>
            {(name, idx) => (
              <>
                {name}
                <EquipmentSelect
                  characterIndex={selectedIndex}
                  character={selectedCharacter}
                  wornSlot={idx()}
                  index={idx}
                />
              </>
            )}
          </For>
        </div>

        <PasteModal />

        <button
          onClick={() => {
            navigate('/characters', { replace: true });
            setTimeout(() => {
              setCharacters((state) =>
                state.filter((char) => char.id !== selectedCharacter().id),
              );
            }, 10);
          }}
        >
          Remove Character
        </button>
      </div>
    </div>
  );
}
