import {
  RowSelectionState,
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
import { createEffect, createSignal } from 'solid-js';
import { DataTable } from '../components/DataTable';
import { TextSearch } from '../components/TextSearch';
import { MonsterPanel } from '../components/monsters/MonsterPanel';
import { useNavigate, useParams } from '@solidjs/router';
import { ScrollContainer } from '../components/layout/ScrollContainer';
import { MainPanel } from '../components/layout/MainPanel';
import { SidePanel } from '../components/layout/SidePanel';

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
  }),
];

const defaultColumnVisibility = {
  Number: false,
};

export function MonstersPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = createSignal<string>('');
  // const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
  //   [],
  // );
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
      get columnVisibility() {
        return columnVisibility();
      },
    },
    // onColumnFiltersChange: setColumnFilters,
    getRowId: (row) => String(row.Number),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: (select) => {
      if (typeof select !== 'function') return;
      const val = Object.keys(select({}))[0];
      navigate(val, { replace: true });
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div class="flex gap-4 h-[100%]">
      <MainPanel>
        <div class="flex">
          <TextSearch
            value={searchValue}
            setValue={setSearchValue}
            column={table.getColumn('Name')}
          />
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
