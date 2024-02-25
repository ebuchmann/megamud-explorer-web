import { A } from '@solidjs/router';
import { JSX } from 'solid-js';

type AppProps = {
  children?: JSX.Element;
};

export function App({ children }: AppProps) {
  return (
    <div class="w-full">
      <header>
        <nav class="p-4 relative gap-4 flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
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
            href="/classes-races"
          >
            Classes / Races
          </A>
        </nav>
      </header>
      <div class="p-4">{children}</div>
    </div>
  );
}
