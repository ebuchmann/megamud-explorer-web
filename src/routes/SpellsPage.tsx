import { createSignal } from 'solid-js';
import { DataTable } from '../components/DataTable';
import { TextSearch } from '../components/TextSearch';
import { MainPanel } from '../components/layout/MainPanel';
import { ScrollContainer } from '../components/layout/ScrollContainer';
import { SidePanel } from '../components/layout/SidePanel';
import { spellData } from '../data';
import { Spell } from '../types';
import {
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { useNavigate } from '@solidjs/router';
import { MageryTypes } from '../utils/data-types';
import { formatSpell } from '../utils/formatting';

const columnHelper = createColumnHelper<Spell>();

const columns = [
  columnHelper.accessor('Name', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Short', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Magery', {
    cell: (info) => {
      if (info.getValue() === 0) return MageryTypes[info.getValue()];

      return `${MageryTypes[info.getValue()]}-${info.row.original.MageryLVL}`;
    },
  }),
  columnHelper.accessor('ReqLevel', {
    header: 'Lvl',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('ManaCost', {
    header: 'Mana',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: 'Detail',
    cell: (info) => formatSpell(info.row.original.Number),
  }),
];

export function SpellsPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = createSignal<string>('');

  const table = createSolidTable({
    get data() {
      return spellData;
    },
    columns,
    // onColumnFiltersChange: setColumnFilters,
    getRowId: (row) => String(row.Number),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: (select) => {
      if (typeof select !== 'function') return;
      const val = Object.keys(select({}))[0];
      navigate(val, { replace: true });
    },
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
        <p>Spell panel...</p>
      </SidePanel>
    </div>
  );
}
