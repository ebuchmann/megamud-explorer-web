import { Column } from '@tanstack/solid-table';
import { For, onMount } from 'solid-js';
import { Dropdown, initTWE } from 'tw-elements';
import { ChevronDown } from '../icons/ChevronDown';

type ColumnVisibilityMenuProps<T> = {
  columns: Column<T>[];
};

export function ColumnVisibilityMenu<T>({
  columns,
}: ColumnVisibilityMenuProps<T>) {
  onMount(() => {
    initTWE({ Dropdown });
  });

  return (
    <>
      <button
        id="columnVisibilityMenu"
        data-twe-dropdown-toggle-ref
        data-twe-auto-close="outside"
        class="flex items-center rounded bg-primary px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        type="button"
      >
        Columns <ChevronDown />
      </button>

      <div
        aria-labelledby="columnVisibilityMenu"
        data-twe-dropdown-menu-ref
        class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
      >
        <ul
          class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownCheckboxButton"
        >
          <For each={columns}>
            {(column) => (
              <li>
                <div class="flex gap-2 items-center">
                  <input
                    id={`checkbox-${column.id}`}
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    type="checkbox"
                  />
                  <label for={`checkbox-${column.id}`}>{column.id}</label>
                </div>
              </li>
            )}
          </For>
        </ul>
      </div>
    </>
  );
}
