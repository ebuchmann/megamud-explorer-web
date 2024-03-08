import { Table, flexRender } from '@tanstack/solid-table';
import { For } from 'solid-js';
import { selectedCharacterData } from '../state/character-state';
import { createSignal } from 'solid-js';
import { useParams } from '@solidjs/router';
import classNames from 'classnames';

export const [levelFilter, setLevelFilter] = createSignal<string>('');
export const [globalFilter, setGlobalFilter] = createSignal<string>('');

type TableProps<T> = {
  table: Table<T>;
  highlightEquipment?: boolean;
  highlightRoute?: boolean;
};

export function DataTable<T extends { Number: number }>({
  highlightEquipment = false,
  highlightRoute = false,
  table,
}: TableProps<T>) {
  const params = useParams();

  return (
    <table class="w-full table-auto">
      <thead class="sticky top-0 bg-gray-900">
        <For each={table.getHeaderGroups()}>
          {(headerGroup) => (
            <tr>
              <For each={headerGroup.headers}>
                {(header) => (
                  <th colSpan={header.colSpan} class="p-2 text-left">
                    <div
                      class={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : undefined
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                )}
              </For>
            </tr>
          )}
        </For>
      </thead>
      <tbody>
        <For each={table.getRowModel().rows}>
          {(row) => (
            <tr
              onClick={row.getToggleSelectedHandler()}
              class={classNames({
                'font-bold text-cyan-100':
                  highlightEquipment &&
                  selectedCharacterData() &&
                  Object.values(selectedCharacterData()!.worn).some(
                    (val) => val === row.original.Number,
                  ),
                'font-bold text-amber-100':
                  highlightRoute &&
                  Number(params.number) === row.original.Number,
              })}
            >
              <For each={row.getVisibleCells()}>
                {(cell) => (
                  <td class="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )}
              </For>
            </tr>
          )}
        </For>
      </tbody>
      <tfoot>
        <For each={table.getFooterGroups()}>
          {(footerGroup) => (
            <tr>
              <For each={footerGroup.headers}>
                {(header) => (
                  <th>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext(),
                        )}
                  </th>
                )}
              </For>
            </tr>
          )}
        </For>
      </tfoot>
    </table>
  );
}
