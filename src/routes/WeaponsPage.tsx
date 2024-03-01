import {
  ColumnFiltersState,
  VisibilityState,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import weapons from '../data/weapons.json';
import classData from '../data/classes.json';
import { For, createSignal } from 'solid-js';
import { debounce } from '@solid-primitives/scheduled';
import {
  DataTable,
  globalFilter,
  levelFilter,
  setGlobalFilter,
  setLevelFilter,
} from '../components/DataTable';
import { allWeaponValuesAbilities, specialProperties } from '../utils/values';
import { ClassSelect } from '../components/ClassSelect';
import { LevelInput } from '../components/LevelInput';
import { makePersisted } from '@solid-primitives/storage';
import { getNumberString } from '../utils/formatting';
import { GlobalFilterMenu } from '../components/GlobalFilterMenu';
import { ScrollContainer } from '../components/layout/ScrollContainer';
import { TextSearch } from '../components/TextSearch';

type Weapon = {
  Number: number;
  Name: string;
  WeaponType: number;
  Min: number;
  Max: number;
  Speed: number;
  MinLevel: number;
  StrReq: number;
  Encum: number;
  ArmourClass: number;
  DamageResist: number;
  Accy: number;
  BsAccu: number;
  Crits: number;
  Limit: number;
  // dmg/spd
  // dmg*5
  Magical: number;
  ClassOk?: number[];
  Classes?: number[];
};

const defaultWeaponTypeFilter = [0, 1, 2, 3];

const getClassList = (values: number[]): string =>
  values
    .map((value) => classData.find((cls) => cls.Number === value).Name)
    .join(' / ');

const columnHelper = createColumnHelper<Weapon>();

const WeaponTypes = ['1H Blunt', '2H Blunt', '1H Sharp', '2H Sharp'];

const columns = [
  columnHelper.accessor('Number', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Name', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('WeaponType', {
    header: 'Type',
    cell: (info) => WeaponTypes[info.getValue()],
    filterFn: ({ original }, _type, value) => {
      return value.includes(original.WeaponType);
    },
  }),
  columnHelper.accessor('Min', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Max', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Speed', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('MinLevel', {
    header: 'Lvl',
    cell: (info) => info.getValue(),
    filterFn: ({ original }, _type, value) => {
      return original.MinLevel <= value || !original.MinLevel;
    },
  }),
  columnHelper.accessor('StrReq', {
    header: 'Str',
    cell: (info) => info.getValue(),
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
  columnHelper.accessor('BsAccu', {
    header: 'BS',
    cell: (info) => {
      return info.getValue() ? info.getValue() : 'No';
    },
    filterFn: ({ original }, _field, value) => {
      return value ? !!original.BsAccu : true;
    },
  }),
  columnHelper.accessor('Crits', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Limit', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Magical', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: 'Abilities',
    cell: (info) => {
      const combinedValues = allWeaponValuesAbilities.reduce(
        (curr: string, mapKey: number) => {
          const key: keyof Weapon = specialProperties.get(mapKey);
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

export function WeaponsPage() {
  const [searchValue, setSearchValue] = createSignal<string>('');
  const [bsValue, setBsValue] = createSignal<boolean>(false);
  const [weaponTypes, setWeaponTypes] = createSignal(defaultWeaponTypeFilter);
  const [columnFilters, setColumnFilters] = createSignal<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = makePersisted(
    createSignal<VisibilityState>(defaultColumnVisibility),
    { name: 'weapon-table-columns' },
  );

  const table = createSolidTable({
    get data() {
      return weapons as Weapon[];
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
      const weaponType = cls?.WeaponType;

      if (original?.ClassOk?.includes(cls.Number)) return true;
      if (original?.Classes?.includes(cls.Number)) return true;
      if (original.Classes && !original.Classes.includes(cls.Number))
        return false;

      // Blunt only
      if (
        weaponType === 7 &&
        (original.WeaponType === 0 || original.WeaponType === 1)
      ) {
        return true;
      }

      // Warrior, Witch, Pally, Ninja, Ranger
      if (weaponType === 8) return true;

      // 1H only
      if (
        weaponType === 4 &&
        (original.WeaponType === 2 || original.WeaponType === 0)
      ) {
        return true;
      }

      // WeaponType 9 (Priest & Mage) How?

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
            setBsValue(false);
            setGlobalFilter('');
            setWeaponTypes(defaultWeaponTypeFilter);
          }}
        >
          Clear Filters
        </button>
        <GlobalFilterMenu />
      </div>
      <div class="grid grid-cols-4 gap-1">
        <For each={WeaponTypes}>
          {(type, index) => (
            <label>
              <input
                type="checkbox"
                value={index()}
                onChange={(e) => {
                  const column = table.getColumn('WeaponType');
                  e.target.checked
                    ? setWeaponTypes([...weaponTypes(), Number(e.target.value)])
                    : setWeaponTypes(
                        weaponTypes().filter(
                          (type) => type !== Number(e.target.value),
                        ),
                      );
                  weaponTypes().length === 4
                    ? column?.setFilterValue('')
                    : column?.setFilterValue(weaponTypes());
                }}
                checked={weaponTypes().includes(index())}
              />{' '}
              {type}
            </label>
          )}
        </For>
        <label>
          <input
            type="checkbox"
            checked={bsValue()}
            onChange={(e) => {
              table.getColumn('BsAccu')?.setFilterValue(e.target.checked);
              setBsValue(e.target.checked);
            }}
          />{' '}
          BS'able
        </label>
      </div>
      <ScrollContainer>
        <DataTable highlightEquipment table={table} />
      </ScrollContainer>
    </>
  );
}
