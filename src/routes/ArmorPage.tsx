import {
  ColumnFiltersState,
  VisibilityState,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import armor from '../data/armor.json';
import classData from '../data/classes.json';
import { For, createSignal } from 'solid-js';
import {
  DataTable,
  globalFilter,
  levelFilter,
  setGlobalFilter,
  setLevelFilter,
} from '../components/DataTable';
import { debounce } from '@solid-primitives/scheduled';
import { allArmorValuesAbilities, specialProperties } from '../utils/values';
import { ClassSelect } from '../components/ClassSelect';
import { LevelInput } from '../components/LevelInput';
import { makePersisted } from '@solid-primitives/storage';
import { ColumnVisibilityMenu } from '../components/ColumnVisibilityMenu';
import { ArmorTypes, WornSpots } from '../utils/data-types';
import { getNumberString } from '../utils/formatting';
import { GlobalFilterMenu } from '../components/GlobalFilterMenu';
import { ScrollContainer } from '../components/layout/ScrollContainer';
import { Armor } from '../types';
import { TextSearch } from '../components/TextSearch';

const defaultArmorTypeFilter = [0, 1, 2, 6, 7, 8, 9];

const getClassList = (values: number[]): string =>
  values
    .map((value) => classData?.find((cls) => cls.Number === value).Name)
    .join(' / ');

const columnHelper = createColumnHelper<Armor>();

const columns = [
  columnHelper.accessor('Number', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Name', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Worn', {
    cell: (info) => WornSpots[info.getValue()] || info.getValue(),
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
  columnHelper.display({
    header: 'Abilities',
    cell: (info) => {
      const combinedValues = allArmorValuesAbilities.reduce(
        (curr: string, mapKey: number) => {
          const key: keyof Armor = specialProperties.get(mapKey);
          if (info.row.original.hasOwnProperty(key)) {
            if (key === 'ClassOk') {
              curr += `${getClassList(info.row.original[key])} Ok, `;
            } else if (key === 'Classes') {
              curr += `${getClassList(info.row.original[key])} Only, `;
            } else {
              curr += `${key} ${getNumberString(info.row.original[key])}, `;
            }
          }

          return curr;
        },
        '',
      );

      return combinedValues.replace(/,\s*$/, '');
    },
  }),
];

const defaultColumnVisibility = {
  Number: false,
};

export function ArmorPage() {
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
      return armor as Armor[];
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
      if (classArmorType >= original.ArmourType && original.ArmourType !== 2)
        return true;

      return false;
    },
    enableRowSelection: false,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!!globalFilter()) table.setGlobalFilter(Number(globalFilter()));
  if (!!levelFilter())
    table.getColumn('MinLevel')?.setFilterValue(Number(levelFilter()));

  return (
    <>
      {/* <ColumnVisibilityMenu<Armor> columns={table.getAllLeafColumns()} /> */}
      <div class="flex gap-4">
        <TextSearch
          value={searchValue}
          setValue={setSearchValue}
          column={table.getColumn('Name')}
        />
        <LevelInput
          value={levelFilter}
          setValue={setLevelFilter}
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
          setValue={setGlobalFilter}
          onChange={(val) => table.setGlobalFilter(val)}
        />
        <button
          onClick={() => {
            table.resetColumnFilters(true);
            table.resetGlobalFilter(true);
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
                      ? setArmorTypes([...armorTypes(), Number(e.target.value)])
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
      <ScrollContainer>
        <DataTable highlightEquipment table={table} />
      </ScrollContainer>
    </>
  );
}
