/**
 * [{ name, class, race, level, equip: { slots }  }]
 *
 */

import { For, Show } from 'solid-js';
import { CharacterBox } from './characters/CharacterBox';
import { characters, setCharacters } from '../state/character-state';

export function CharacterPanel() {
  return (
    <div class="w-1/4">
      <Show when={characters.length === 0}>No characters, add one</Show>
      <button
        onClick={() =>
          setCharacters([
            ...characters,
            {
              id: window.crypto.randomUUID(),
              name: '',
              cls: 0,
              race: 0,
              level: 0,
              str: 0,
              int: 0,
              wil: 0,
              agl: 0,
              hea: 0,
              chm: 0,
              worn: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
              },
            },
          ])
        }
      >
        Add Character
      </button>
      <For each={characters}>
        {(_, index) => <CharacterBox index={index()} />}
      </For>
    </div>
  );
}