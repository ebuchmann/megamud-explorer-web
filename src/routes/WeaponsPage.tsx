import {
  ColumnFiltersState,
  VisibilityState,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { classData, weaponData } from '../data';
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
import {
  expandKeyValueJSX,
  getRemainingPropertiesTable,
  weaponTableSkipKeys,
} from '../utils/formatting';
import { GlobalFilterMenu } from '../components/GlobalFilterMenu';
import { ScrollContainer } from '../components/layout/ScrollContainer';
import { TextSearch } from '../components/TextSearch';
import { MainPanel } from '../components/layout/MainPanel';
import { SidePanel } from '../components/layout/SidePanel';
import { useNavigate } from '@solidjs/router';
import { Weapon } from '../types';
import { WeaponPanel } from '../components/weapons/WeaponPanel';
import { WeaponTypes } from '../utils/data-types';

const defaultWeaponTypeFilter = [0, 1, 2, 3];

const columnHelper = createColumnHelper<Weapon>();

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
  columnHelper.accessor('Magical', {
    header: 'Mag',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: 'Abilities',
    cell: (info) => {
      const item = info.row.original;
      return getRemainingPropertiesTable(item, weaponTableSkipKeys);
    },
  }),
];

const defaultColumnVisibility = {
  Number: false,
};

export function WeaponsPage() {
  const navigate = useNavigate();
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
      return weaponData;
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
  });

  if (!!globalFilter()) table.setGlobalFilter(Number(globalFilter()));
  if (!!levelFilter())
    table.getColumn('MinLevel')?.setFilterValue(Number(levelFilter()));

  return (
    <div class="flex gap-4 h-[100%]">
      <MainPanel>
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
                      ? setWeaponTypes([
                          ...weaponTypes(),
                          Number(e.target.value),
                        ])
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
          <DataTable highlightEquipment highlightRoute table={table} />
        </ScrollContainer>
      </MainPanel>
      <SidePanel>
        <WeaponPanel />
      </SidePanel>
    </div>
  );
}
