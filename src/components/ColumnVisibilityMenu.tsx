import { Column } from '@tanstack/solid-table';
import { For } from 'solid-js';

type ColumnVisibilityMenuProps<T> = {
  columns: Column<T>[];
};

export function ColumnVisibilityMenu<T>({
  columns,
}: ColumnVisibilityMenuProps<T>) {
  return (
    <>
      <button
        id="dropdownCheckboxButton"
        data-dropdown-toggle="dropdownDefaultCheckbox"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Columns{' '}
        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownDefaultCheckbox"
        class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownCheckboxButton"
        >
          <For each={columns}>
            {(column) => (
              <li>
                <div class="flex items-center">
                  <input
                    id={`checkbox-${column.id}`}
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    type="checkbox"
                  />{' '}
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
