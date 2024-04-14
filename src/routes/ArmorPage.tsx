import {
  ColumnFiltersState,
  VisibilityState,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { armorData, classData } from '../data';
import { For, createSignal } from 'solid-js';
import {
  DataTable,
  globalFilter,
  levelFilter,
  setGlobalFilter,
  setLevelFilter,
} from '../components/DataTable';
import { ClassSelect } from '../components/ClassSelect';
import { LevelInput } from '../components/LevelInput';
import { makePersisted } from '@solid-primitives/storage';
import { ArmorTypes, WornSpots } from '../utils/data-types';
import {
  armorTableSkipKeys,
  getRemainingPropertiesTable,
} from '../utils/formatting';
import { GlobalFilterMenu } from '../components/GlobalFilterMenu';
import { Armor } from '../types';
import { TextSearch } from '../components/TextSearch';
import { useNavigate } from '@solidjs/router';
import { MainPanel } from '../components/layout/MainPanel';
import { SidePanel } from '../components/layout/SidePanel';
import { ArmorPanel } from '../components/armor/ArmorPanel';
import { TableScrollContainer } from '../components/layout/TableScrollContainer';

const defaultArmorTypeFilter = [0, 1, 2, 6, 7, 8, 9];

const columnHelper = createColumnHelper<Armor>();

const columns = [
  columnHelper.accessor('Number', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Name', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Worn', {
    cell: (info) => (
      <div class="whitespace-nowrap">
        {WornSpots[info.getValue()] || info.getValue()}
      </div>
    ),
    filterFn: ({ original }, _type, value) => {
      return original.Worn === Number(value);
    },
  }),
  columnHelper.accessor('ArmourType', {
    header: 'Type',
    cell: (info) => ArmorTypes[info.getValue()],
    filterFn: ({ original }, _type, value) => {
      return value.includes(original.ArmourType);
    },
  }),
  columnHelper.accessor('MinLevel', {
    header: 'Lvl',
    cell: (info) => info.getValue(),
    filterFn: ({ original }, _type, value) => {
      return original.MinLevel <= value || !original.MinLevel;
    },
  }),
  columnHelper.accessor('Encum', {
    header: 'Enc',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('ArmourClass', {
    header: 'AC/DR',
    cell: (info) => {
      return `${info.row.original.ArmourClass / 10}/${
        info.row.original.DamageResist / 10
      }`;
    },
  }),
  columnHelper.accessor('Accy', {
    header: 'Acc',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Crits', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Magical', {
    header: 'Mag',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: 'Abilities',
    cell: (info) =>
      getRemainingPropertiesTable(info.row.original, armorTableSkipKeys),
  }),
];

const defaultColumnVisibility = {
  Number: false,
};

export function ArmorPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = createSignal<string>('');
  const [wornValue, setWornValue] = createSignal<string>('Anywhere');
  const [armorTypes, setArmorTypes] = createSignal<number[]>(
    defaultArmorTypeFilter,
  );
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = makePersisted(
    createSignal<VisibilityState>(defaultColumnVisibility),
    { name: 'armor-table-columns' },
  );

  const table = createSolidTable({
    get data() {
      return armorData;
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
    globalFilterFn: ({ original }, _field, value) => {
      if (value === '') return true;

      const cls = classData.find((cls) => cls.Number === value);
      if (!cls) return false;
      const classArmorType = cls?.ArmourType;

      if (original?.ClassOk?.includes(cls.Number)) return true;
      if (original?.Classes?.includes(cls.Number)) return true;
      if (original.Classes && !original.Classes.includes(cls.Number))
        return false;

      // Ninja
      if (classArmorType === 2 && classArmorType >= original.ArmourType)
        return true;
      // Others
      if (classArmorType >= original.ArmourType && original.ArmourType !== 2) {
        if (cls?.AntiMagic === 0 && (original?.Magical ?? 0) > 0) return false;
        return true;
      }

      return false;
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: (select) => {
      if (typeof select !== 'function') return;
      const val = Object.keys(select({}))[0];
      navigate(val, { replace: true });
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getRowId: (row) => String(row.Number),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  if (!!globalFilter()) table.setGlobalFilter(Number(globalFilter()));
  if (!!levelFilter())
    table.getColumn('MinLevel')?.setFilterValue(Number(levelFilter()));

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
        {/* <ColumnVisibilityMenu<Armor> columns={table.getAllLeafColumns()} /> */}
        <div class="flex gap-4">
          <TextSearch
            value={searchValue}
            setValue={paginationReset(setSearchValue)}
            column={table.getColumn('Name')}
          />
          <LevelInput
            value={levelFilter}
            setValue={paginationReset(setLevelFilter)}
            column={table.getColumn('MinLevel')!}
          />
          <select
            value={wornValue()}
            onChange={(e) => {
              const value = e.target.value;
              const column = table.getColumn('Worn');

              value === 'Anywhere'
                ? column?.setFilterValue('')
                : column?.setFilterValue(value);

              paginationReset()('');
              setWornValue(value);
            }}
          >
            <option value="Anywhere">Anywhere</option>
            <For each={WornSpots}>
              {(slot, index) => {
                if (slot === '') return null;
                return <option value={index()}>{slot}</option>;
              }}
            </For>
          </select>
          <ClassSelect
            value={globalFilter}
            setValue={paginationReset(setGlobalFilter)}
            onChange={(val) => table.setGlobalFilter(val)}
          />
          <button
            onClick={() => {
              table.resetColumnFilters(true);
              table.resetGlobalFilter(true);
              paginationReset()('');
              setSearchValue('');
              setLevelFilter('');
              setGlobalFilter('');
              setWornValue('Anywhere');
              setArmorTypes(defaultArmorTypeFilter);
            }}
          >
            Clear Filters
          </button>
          <GlobalFilterMenu />
        </div>
        <div class="grid grid-cols-4 gap-1">
          <For each={ArmorTypes}>
            {(type, index) => {
              if (type === 'Unused (Leather)') return null;

              return (
                <label>
                  <input
                    type="checkbox"
                    value={index()}
                    onChange={(e) => {
                      const column = table.getColumn('ArmourType');
                      e.target.checked
                        ? setArmorTypes([
                            ...armorTypes(),
                            Number(e.target.value),
                          ])
                        : setArmorTypes(
                            armorTypes().filter(
                              (type) => type !== Number(e.target.value),
                            ),
                          );
                      armorTypes().length === 7
                        ? column?.setFilterValue('')
                        : column?.setFilterValue(armorTypes());
                    }}
                    checked={armorTypes().includes(index())}
                  />{' '}
                  {type}
                </label>
              );
            }}
          </For>
        </div>
        <TableScrollContainer ref={scroll!} table={table}>
          <DataTable highlightEquipment highlightRoute table={table} />
        </TableScrollContainer>
      </MainPanel>
      <SidePanel>
        <ArmorPanel />
      </SidePanel>
    </div>
  );
}
