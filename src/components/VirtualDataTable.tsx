import { Table, flexRender } from '@tanstack/solid-table';
import { For } from 'solid-js';
import { selectedCharacterData } from '../state/character-state';
import { createSignal } from 'solid-js';
import { useParams } from '@solidjs/router';
import classNames from 'classnames';
import { createVirtualizer } from '@tanstack/solid-virtual';

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
  let outerRef!: HTMLDivElement;

  const virtualizer = createVirtualizer({
    count: table.getRowModel().rows.length,
    estimateSize: () => 45,
    getScrollElement: () => outerRef,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div
      ref={outerRef!}
      style={{
        overflow: 'auto', //our scrollable table container
        position: 'relative', //needed for sticky header
        height: '800px', //should be a fixed height
      }}
    >
      <table
        style={{
          display: 'grid',
        }}
        class="w-full table-auto"
      >
        <thead class="sticky top-0 bg-gray-900">
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th colSpan={header.colSpan} class="p-2 text-left">
                      <div
                        class={classNames(
                          {
                            'cursor-pointer select-none':
                              header.column.getCanSort(),
                          },
                          'whitespace-nowrap',
                        )}
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
        <tbody
          style={{
            display: 'grid',
            height: `${virtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
            position: 'relative', //needed for absolute positioning of rows
          }}
        >
          <For each={items}>
            {(item) => (
              <tr
                style={{
                  display: 'flex',
                  position: 'absolute',
                  transform: `translateY(${item.start}px)`, //this should always be a `style` as it changes on scroll
                  width: '100%',
                }}
                data-index={item.index}
                ref={(node) => virtualizer.measureElement(node)}
                onClick={table
                  .getRowModel()
                  .rows[item.index].getToggleSelectedHandler()}
                class={classNames(
                  {
                    'font-bold text-cyan-100':
                      highlightEquipment &&
                      selectedCharacterData() &&
                      Object.values(selectedCharacterData()!.worn).some(
                        (val) =>
                          val ===
                          table.getRowModel().rows[item.index].original.Number,
                      ),
                    'font-bold text-amber-100':
                      highlightRoute &&
                      Number(params.number) ===
                        table.getRowModel().rows[item.index].original.Number,
                    'cursor-pointer': table
                      .getRowModel()
                      .rows[item.index].getCanSelect(),
                  },
                  'hover:bg-gray-800',
                )}
              >
                <For
                  each={table.getRowModel().rows[item.index].getVisibleCells()}
                >
                  {(cell) => (
                    <td class="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
    </div>
  );
}
