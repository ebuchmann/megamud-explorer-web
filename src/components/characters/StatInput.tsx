import { Accessor } from 'solid-js';
import { Character, Race } from '../../types';
import { debounce } from '@solid-primitives/scheduled';
import { setCharacters } from '../../state/character-state';

type StatInputProps = {
  label: string;
  stat: 'str' | 'int' | 'wil' | 'agl' | 'chm' | 'hea';
  race: Accessor<Race | undefined>;
  character: Accessor<Character>;
  index: Accessor<number>;
};

export function StatInput({
  label,
  index,
  character,
  race,
  stat,
}: StatInputProps) {
  if (!character()) return null;

  return (
    <div>
      <label>
        {label}
        <br />
        <span class="text-sm">
          ({race()?.[`m${stat.toUpperCase()}` as keyof Race]} -{' '}
          {race()?.[`x${stat.toUpperCase()}` as keyof Race]})
        </span>
        <br />
        <div>
          <input
            class="w-24 p-2"
            type="number"
            value={character()[stat]}
            onInput={debounce((e) => {
              setCharacters(index(), stat, Number(e.target.value));
            }, 500)}
          />
        </div>
      </label>
    </div>
  );
}
