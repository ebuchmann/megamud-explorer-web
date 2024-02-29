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
import monsters from '../data/monsters.json';
import { makePersisted } from '@solid-primitives/storage';
import { createEffect, createSignal } from 'solid-js';
import { DataTable } from '../components/DataTable';
import { TextSearch } from '../components/TextSearch';
import { MonsterPanel } from '../components/monsters/MonsterPanel';
import { useLocation, useNavigate, useParams } from '@solidjs/router';
import { ScrollContainer } from '../components/layout/ScrollContainer';

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
  const params = useParams();

  const defaultRowSelection = params.number ? { [params.number]: true } : {};

  const [searchValue, setSearchValue] = createSignal<string>('');
  // const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
  //   [],
  // );
  const [columnVisibility, setColumnVisibility] = makePersisted(
    createSignal<VisibilityState>(defaultColumnVisibility),
    { name: 'monster-table-columns' },
  );
  const [selectedRow, setSelectedRow] =
    createSignal<RowSelectionState>(defaultRowSelection);

  const table = createSolidTable({
    get data() {
      return monsters as Monster[];
    },
    columns,
    state: {
      get columnVisibility() {
        return columnVisibility();
      },
      get rowSelection() {
        return selectedRow();
      },
    },
    // onColumnFiltersChange: setColumnFilters,
    getRowId: (row) => String(row.Number),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setSelectedRow,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Navigate on row selection
  createEffect(() => {
    const row = selectedRow();
    if (row) {
      const number = Object.keys(row)[0];
      if (number) navigate(`/monsters/${number}`, { replace: true });
    }
  });

  return (
    <div class="flex gap-4 h-[100%]">
      <div class="w-9/12 h-[100%] flex flex-col gap-4">
        <div class="flex">
          <TextSearch
            value={searchValue}
            setValue={setSearchValue}
            column={table.getColumn('Name')}
          />
        </div>
        <ScrollContainer>
          <DataTable table={table} />
        </ScrollContainer>
      </div>
      <div class="w-3/12 overflow-auto">
        <MonsterPanel />
      </div>
    </div>
  );
}
