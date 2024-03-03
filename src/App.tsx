import { A } from '@solidjs/router';
import { JSX, createEffect } from 'solid-js';
import { CharacterPanel } from './components/CharacterPanel';
import {
  characters,
  selectedCharacter,
  setSelectedCharacterData,
} from './state/character-state';

type AppProps = {
  children?: JSX.Element;
};

export function App({ children }: AppProps) {
  createEffect(() => {
    setSelectedCharacterData(
      characters.find((char) => char.id === selectedCharacter()),
    );
  });

  return (
    <div class="w-full h-screen">
      <header>
        <nav class="p-4 relative gap-8 flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
          <A
            activeClass="text-blue-400"
            inactiveClass="text-neutral-100"
            href="/weapons"
          >
            Weapons
          </A>
          <A
            activeClass="text-blue-400"
            inactiveClass="text-neutral-100"
            href="/armor"
          >
            Armor
          </A>
          <A
            activeClass="text-blue-400"
            inactiveClass="text-neutral-100"
            href="/items"
          >
            Items
          </A>
          <A
            activeClass="text-blue-400"
            inactiveClass="text-neutral-100"
            href="/classes-races"
          >
            Classes / Races
          </A>
          <A
            activeClass="text-blue-400"
            inactiveClass="text-neutral-100"
            href="/monsters"
          >
            Monsters
          </A>
          <A
            activeClass="text-blue-400"
            inactiveClass="text-neutral-100"
            href="/shops"
          >
            Shops
          </A>
          <A
            activeClass="text-blue-400"
            inactiveClass="text-neutral-100"
            href="/characters"
          >
            Characters
          </A>
        </nav>
      </header>
      <div
        class="p-4 flex flex-col gap-2"
        style={{ height: 'calc(100% - 40px)' }}
      >
        {children}
      </div>
    </div>
  );
}
