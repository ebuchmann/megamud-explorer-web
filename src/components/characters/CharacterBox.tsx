import { debounce } from '@solid-primitives/scheduled';
import { Character, Class, Race } from '../../types';
import { characters, setCharacters } from '../../state/character-state';
import { For, createEffect, createSignal } from 'solid-js';
import raceData from '../../data/races.json';
import classData from '../../data/classes.json';
import { CharacterWornSlots } from '../../utils/data-types';
import { EquipmentSelect } from './EquipmentSelect';

type CharacterBoxProps = {
  index: number;
};

export function CharacterBox({ index }: CharacterBoxProps) {
  const character = characters[index];
  const [selectedClass, setSelectedClass] = createSignal<Class | undefined>(
    classData.find((cl) => cl.Number === character.cls),
  );
  const [selectedRace, setSelectedRace] = createSignal<Race | undefined>(
    raceData.find((cl) => cl.Number === character.race),
  );

  createEffect(() => {
    setSelectedClass(classData.find((cl) => cl.Number === character.cls));
  });
  createEffect(() => {
    setSelectedRace(raceData.find((cl) => cl.Number === character.race));
  });

  const statMapping = [
    {
      name: 'Strength',
      value: character.str,
      key: 'str',
    },
    {
      name: 'Intellect',
      value: character.int,
      key: 'int',
    },
    {
      name: 'Willpower',
      value: character.wil,
      key: 'wil',
    },
    {
      name: 'Agility',
      value: character.agl,
      key: 'agl',
    },
    {
      name: 'Health',
      value: character.hea,
      key: 'hea',
    },
    {
      name: 'Charm',
      value: character.chm,
      key: 'chm',
    },
  ];

  return (
    <div class="p-2 flex flex-col gap-2">
      {character.cls} -- {selectedClass()?.Name}
      <div>
        <label>
          Name
          <input
            class="p-2"
            type="text"
            value={character.name}
            onInput={debounce((e) => {
              setCharacters(index, 'name', e.target.value);
              console.log(e.target.value);
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
            value={character.level}
            onInput={debounce((e) => {
              setCharacters(index, 'level', Number(e.target.value));
            }, 500)}
          />
        </label>
      </div>
      <div>
        <label>
          Race
          <select
            class="p-2"
            value={Number(character.race)}
            onChange={(e) =>
              setCharacters(index, 'race', Number(e.target.value))
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
            value={Number(character.cls)}
            onChange={(e) =>
              setCharacters(index, 'cls', Number(e.target.value))
            }
          >
            <option value="0">Any</option>
            <For each={classData}>
              {(cls) => <option value={cls.Number}>{cls.Name}</option>}
            </For>
          </select>
        </label>
      </div>
      <h3>Stats</h3>
      <div class="grid grid-cols-2 gap-4">
        {statMapping.map((stat) => (
          <div>
            <label>
              {stat.name}{' '}
              <span>
                ({selectedRace()?.[`m${stat.key.toUpperCase()}` as keyof Race]}{' '}
                - {selectedRace()?.[`x${stat.key.toUpperCase()}` as keyof Race]}
                )
              </span>
              <input
                class="w-24 p-2"
                type="number"
                value={stat.value}
                onInput={debounce((e) => {
                  setCharacters(
                    index,
                    stat.key as keyof Character,
                    Number(e.target.value),
                  );
                }, 500)}
              />
            </label>
          </div>
        ))}
      </div>
      <h3>Equipment</h3>
      <div class="grid  gap-2 grid-cols-2 auto-cols-min">
        <For each={CharacterWornSlots}>
          {(name, idx) => (
            <>
              {name}
              <EquipmentSelect
                characterIndex={index}
                value={character.worn[idx()]}
                wornSlot={idx()}
              />
            </>
          )}
        </For>
      </div>
      <button
        onClick={() =>
          setCharacters(characters.filter((_, idx) => idx !== index))
        }
      >
        Remove Character
      </button>
    </div>
  );
}
