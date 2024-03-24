import {
  ColumnFiltersState,
  VisibilityState,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { Monster } from '../types';
import { monsterData } from '../data';
import { makePersisted } from '@solid-primitives/storage';
import { createSignal, onMount } from 'solid-js';
import { DataTable } from '../components/DataTable';
import { TextSearch } from '../components/TextSearch';
import { MonsterPanel } from '../components/monsters/MonsterPanel';
import { useNavigate } from '@solidjs/router';
import { ScrollContainer } from '../components/layout/ScrollContainer';
import { MainPanel } from '../components/layout/MainPanel';
import { SidePanel } from '../components/layout/SidePanel';

import { Dropdown, initTWE } from 'tw-elements';
import { ColumnVisibilityMenu } from '../components/ColumnVisibilityMenu';
import { TextInput } from '../components/TextInput';
import { ChevronDown } from '../icons/ChevronDown';

const columnHelper = createColumnHelper<Monster>();

const columns = [
  columnHelper.accessor('Number', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Name', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('ArmourClass', {
    header: 'AC/DR',
    cell: (info) => {
      return `${info.row.original.ArmourClass}/${info.row.original.DamageResist}`;
    },
  }),
  columnHelper.accessor('MagicRes', {
    header: 'M.R.',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('EXP', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('HP', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Magical', {
    header: 'Mag',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Undead', {
    cell: (info) => info.getValue(),
    filterFn: ({ original }, _, value) => {
      return original.Undead === 1;
    },
  }),
  columnHelper.accessor('Rfir', {
    cell: (info) => info.getValue(),
    filterFn: ({ original }) => {
      return original.hasOwnProperty('Rfir');
    },
  }),
  columnHelper.accessor('Rcol', {
    cell: (info) => info.getValue(),
    filterFn: ({ original }) => {
      return original.hasOwnProperty('Rcol');
    },
  }),
  columnHelper.accessor('Rlit', {
    cell: (info) => info.getValue(),
    filterFn: ({ original }) => {
      return original.hasOwnProperty('Rlit');
    },
  }),
  columnHelper.accessor('ResistStone', {
    cell: (info) => info.getValue(),
    filterFn: ({ original }) => {
      return original.hasOwnProperty('ResistStone');
    },
  }),
  columnHelper.accessor('ResistWater', {
    cell: (info) => info.getValue(),
    filterFn: ({ original }) => {
      return original.hasOwnProperty('ResistWater');
    },
  }),
];

const defaultColumnVisibility = {
  Number: false,
  Rfir: false,
  Rlit: false,
  ResistStone: false,
  ResistWater: false,
};

const colFiltersMenu = [
  'Undead',
  'Rfir',
  'Rlit',
  'Rcol',
  'ResistStone',
  'ResistWater',
];

export function MonstersPage() {
  onMount(() => {
    initTWE({ Dropdown });
  });
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = createSignal<string>('');
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = makePersisted(
    createSignal<VisibilityState>(defaultColumnVisibility),
    { name: 'monster-table-columns' },
  );

  const table = createSolidTable({
    get data() {
      return monsterData;
    },
    columns,
    state: {
      get columnFilters() {
        return columnFilters();
      },
      get columnVisibility() {
        return columnVisibility();
      },
    },
    getRowId: (row) => String(row.Number),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: (select) => {
      if (typeof select !== 'function') return;
      const val = Object.keys(select({}))[0];
      navigate(val, { replace: true });
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div class="flex gap-4 h-[100%]">
      <MainPanel>
        <div class="flex gap-4">
          <TextSearch
            value={searchValue}
            setValue={setSearchValue}
            column={table.getColumn('Name')}
          />

          <TextInput
            class="w-20"
            debounce={200}
            label="Min HP"
            value={
              (
                table.getColumn('HP')?.getFilterValue() as [number, number]
              )?.[0] ?? ''
            }
            onInput={(e) =>
              table
                .getColumn('HP')
                ?.setFilterValue((old: [number, number]) => [
                  e.target.value,
                  old?.[1],
                ])
            }
          />
          <TextInput
            class="w-20"
            debounce={200}
            label="Max HP"
            value={
              (
                table.getColumn('HP')?.getFilterValue() as [number, number]
              )?.[1] ?? ''
            }
            onInput={(e) =>
              table
                .getColumn('HP')
                ?.setFilterValue((old: [number, number]) => [
                  old?.[0],
                  e.target.value,
                ])
            }
          />

          <ColumnVisibilityMenu columns={table.getAllLeafColumns()} />

          <button
            class="flex items-center rounded bg-primary px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            type="button"
            id="dropdownMenuButton1"
            data-twe-dropdown-toggle-ref
            data-twe-auto-close="outside"
            data-twe-dropdownAnimation="off"
            aria-expanded="false"
          >
            Filters <ChevronDown />
          </button>
          <div
            class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
            aria-labelledby="dropdownMenuButton1"
            data-twe-dropdown-menu-ref
            data-twe-dropdownAnimation="off"
          >
            <div class="flex flex-col p-2">
              <h3 class="mb-2">Has Ability</h3>
              {colFiltersMenu.map((col) => (
                <label class="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    value={!!table.getColumn(col)?.getFilterValue()}
                    onClick={(e) => {
                      e.target.checked
                        ? table.getColumn(col)?.setFilterValue(true)
                        : table.getColumn(col)?.setFilterValue('');
                    }}
                  />
                  {col}
                </label>
              ))}
            </div>
          </div>
        </div>
        <ScrollContainer>
          <DataTable highlightRoute table={table} />
        </ScrollContainer>
      </MainPanel>
      <SidePanel>
        <MonsterPanel />
      </SidePanel>
    </div>
  );
}
