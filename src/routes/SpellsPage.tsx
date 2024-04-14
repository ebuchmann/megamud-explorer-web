import { createSignal } from 'solid-js';
import {
  DataTable,
  globalFilter,
  levelFilter,
  setGlobalFilter,
  setLevelFilter,
} from '../components/DataTable';
import { TextSearch } from '../components/TextSearch';
import { MainPanel } from '../components/layout/MainPanel';
import { SidePanel } from '../components/layout/SidePanel';
import { classData, spellData } from '../data';
import { Spell } from '../types';
import {
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { useNavigate } from '@solidjs/router';
import { MageryTypes } from '../utils/data-types';
import { formatSpellJSX } from '../utils/formatting';
import { SpellPanel } from '../components/spells/SpellPanel';
import { LevelInput } from '../components/LevelInput';
import { ClassSelect } from '../components/ClassSelect';
import { TableScrollContainer } from '../components/layout/TableScrollContainer';

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

      return (
        <div class="whitespace-nowrap">
          {MageryTypes[info.getValue()]}-{info.row.original.MageryLVL}
        </div>
      );
    },
  }),
  columnHelper.accessor('ReqLevel', {
    header: 'Lvl',
    cell: (info) => info.getValue(),
    filterFn: ({ original }, _type, value) =>
      original.ReqLevel <= value || !original.ReqLevel,
  }),
  columnHelper.accessor('ManaCost', {
    header: 'Mana',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: 'Detail',
    cell: (info) => formatSpellJSX(info.row.original.Number),
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
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: ({ original }, _field, value) => {
      if (value === '') return true;
      if (original.Learnable === 0 && value !== 15) return false;

      const cls = classData.find((cls) => cls.Number === value);
      if (!cls) return false;

      if (cls.MageryType === 0) return false;
      if (cls.MageryType !== original.Magery) return false;
      if (original.MageryLVL > cls.MageryLVL) return false;

      return true;
    },
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  if (!!globalFilter()) table.setGlobalFilter(Number(globalFilter()));
  if (!!levelFilter())
    table.getColumn('ReqLevel')?.setFilterValue(Number(levelFilter()));

  let scroll: HTMLDivElement;

  const paginationReset = (setter?: any) => {
    return (e: any) => {
      scroll.scrollTop = 0;
      table.setPageSize(50);
      setter?.(e);
    };
  };

  return (
    <div class="flex gap-4 h-[100%]">
      <MainPanel>
        <div class="flex gap-4">
          <TextSearch
            value={searchValue}
            setValue={paginationReset(setSearchValue)}
            column={table.getColumn('Name')}
          />
          <LevelInput
            value={levelFilter}
            setValue={paginationReset(setLevelFilter)}
            column={table.getColumn('ReqLevel')!}
          />
          <ClassSelect
            value={globalFilter}
            setValue={setGlobalFilter}
            onChange={paginationReset(table.setGlobalFilter)}
          />
          <button
            onClick={() => {
              paginationReset()('');
              table.resetColumnFilters(true);
              table.resetGlobalFilter(true);
              setSearchValue('');
              setLevelFilter('');
              setGlobalFilter('');
            }}
          >
            Clear Filters
          </button>
        </div>
        <TableScrollContainer ref={scroll!} table={table}>
          <DataTable highlightRoute table={table} />
        </TableScrollContainer>
      </MainPanel>
      <SidePanel>
        <SpellPanel />
      </SidePanel>
    </div>
  );
}
