import { onMount } from 'solid-js';
import { Dropdown, initTWE } from 'tw-elements';
import { characters, setCharacters } from '../state/character-state';
import { produce } from 'solid-js/store';

type ColumnMenuProps = {
  number: number;
  worn: number;
};

export function ColumnMenu({ number, worn: wornAt }: ColumnMenuProps) {
  onMount(() => {
    initTWE({ Dropdown });
  });

  return (
    <>
      <button
        class="flex items-center rounded bg-primary px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        type="button"
        id="dropdownMenuButton1"
        data-twe-dropdown-toggle-ref
        data-twe-auto-close="outside"
        data-twe-dropdownAnimation="off"
        aria-expanded="false"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {wornAt}
      </button>
      <div
        class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
        aria-labelledby="dropdownMenuButton1"
        data-twe-dropdown-menu-ref
        data-twe-dropdownAnimation="off"
      >
        <div class="flex flex-col p-2">
          <h3 class="mb-2">Equip on:</h3>
          <ul>
            {characters.map((char, index) => (
              <li>
                <a
                  class="block w-full whitespace-nowrap bg-white px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-zinc-200/60 focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
                  href="#"
                  data-twe-dropdown-item-ref
                  onClick={(e) =>
                    setCharacters(
                      index,
                      'worn',
                      produce((worn) => {
                        worn[wornAt] = Number(number);
                      }),
                    )
                  }
                >
                  {char.name} - {wornAt}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
