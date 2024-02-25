import {
  ColumnFiltersState,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import armor from '../data/armor.json';
import classData from '../data/classes.json';
import { For, createSignal } from 'solid-js';
import { Table } from '../components/Table';
import { debounce } from '@solid-primitives/scheduled';
import { allArmorValuesAbilities, specialProperties } from '../utils/values';
import { ClassSelect } from '../components/ClassSelect';
import { LevelInput } from '../components/LevelInput';

const ArmorTypes = [
  'Natural',
  'Silk',
  'Ninja',
  'Leather',
  'Unused (Leather)',
  'Unused (Leather)',
  'Unused (Leather)',
  'Chain',
  'Scale',
  'Plate',
];

const WornSpots = [
  '',
  '',
  'Head',
  'Hands',
  'Finger',
  'Feet',
  'Arms',
  'Back',
  'Neck',
  'Legs',
  'Waist',
  'Torso',
  'Off-Hand',
  '',
  'Wrist',
  'Ears',
  'Worn',
  '',
  '',
  'Face',
];

const defaultArmorTypeFilter = [0, 1, 2, 3, 7, 8, 9];

type Armor = {
  Number: number;
  Name: string;
  ArmourType: number;
  Worn: number;
  Encum: number;
  ArmourClass: number;
  DamageResist: number;
  MinLevel: number;
  Accy: number;
  Crits: number;
  //ac/enc

  Dodge?: number;
  ClassOk?: number[];
  Classes?: number[];
};

const getNumberString = (value: number): string =>
  value > 0 ? `+${value}` : `${value}`;

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
    header: 'AC',
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
    filterFn: () => {
      console.log('aaa');
      return true;
    },
    cell: (info) => {
      const combinedValues = allArmorValuesAbilities.reduce(
        (curr: string, mapKey: number) => {
          const key: keyof Armor = specialProperties.get(mapKey);
          if (info.row.original[key]) {
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

export function ArmorPage() {
  const [searchValue, setSearchValue] = createSignal<string>('');
  const [levelValue, setLevelValue] = createSignal<string>('');
  const [armorTypes, setArmorTypes] = createSignal<number[]>(
    defaultArmorTypeFilter,
  );
  const [globalFilter, setGlobalFilter] = createSignal('');
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    [],
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
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      {JSON.stringify(columnFilters())}
      <div class="flex gap-4">
        <input
          placeholder="Search"
          class="p-2"
          type="search"
          value={searchValue()}
          onInput={debounce((e) => {
            table.getColumn('Name')?.setFilterValue(e.target.value);
            setSearchValue(e.target.value);
          }, 500)}
        />
        <LevelInput
          value={levelValue}
          setValue={setLevelValue}
          column={table.getColumn('MinLevel')!}
        />
        <select
          onChange={(e) => {
            const value = e.target.value;
            const column = table.getColumn('Worn');

            value === 'Anywhere'
              ? column?.setFilterValue('')
              : column?.setFilterValue(value);
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
            setLevelValue('');
            setGlobalFilter('');
            setArmorTypes(defaultArmorTypeFilter);
          }}
        >
          Clear Filters
        </button>
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

      <Table table={table} />
    </>
  );
}
