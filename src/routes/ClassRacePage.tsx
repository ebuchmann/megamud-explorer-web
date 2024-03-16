import {
  VisibilityState,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { classData, raceData } from '../data';
import { DataTable } from '../components/DataTable';
import { ArmorTypes, MageryTypes } from '../utils/data-types';
import { allClassValuesAbilities, specialProperties } from '../utils/values';
import { Class, Race } from '../types';
import { getNumberString } from '../utils/formatting';
import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';
import { ScrollContainer } from '../components/layout/ScrollContainer';

const WeaponTypes: Record<number, string> = {
  4: 'Any 1H',
  7: 'Any Blunt',
  8: 'Any Weapon',
  9: 'Staff',
};

const columnHelperClasses = createColumnHelper<Class>();

const classesColumns = [
  columnHelperClasses.accessor('Number', {
    cell: (info) => info.getValue(),
  }),
  columnHelperClasses.accessor('Name', {
    cell: (info) => info.getValue(),
  }),
  columnHelperClasses.accessor('ExpTable', {
    header: 'Exp',
    cell: (info) => `${info.getValue() + 100}%`,
  }),
  columnHelperClasses.accessor('WeaponType', {
    header: 'Weapon',
    cell: (info) => WeaponTypes[info.getValue()],
  }),
  columnHelperClasses.accessor('ArmourType', {
    header: 'Armor',
    cell: (info) => ArmorTypes[info.getValue()],
  }),
  columnHelperClasses.accessor('MageryLVL', {
    header: 'Magic',
    cell: (info) => {
      const mageryType = info.row.original.MageryType;

      if (mageryType === 0) return MageryTypes[mageryType];
      return `${MageryTypes[mageryType]}-${info.getValue()}`;
    },
  }),
  columnHelperClasses.accessor('CombatLVL', {
    header: 'Combat',
    cell: (info) => info.getValue() - 2,
  }),
  columnHelperClasses.accessor('MinHits', {
    header: 'Hp',
    cell: (info) =>
      `${info.getValue()}-${info.row.original.MaxHits + info.getValue()}`,
  }),
  columnHelperClasses.display({
    header: 'Abilities',
    cell: (info) => {
      const combinedValues = allClassValuesAbilities.reduce(
        (curr: string, mapKey: number) => {
          const key: keyof Class = specialProperties.get(mapKey);
          if (info.row.original.hasOwnProperty(key)) {
            curr += `${key}${getNumberString(info.row.original[key])}, `;
          }

          return curr;
        },
        '',
      );

      return combinedValues.replace(/,\s*$/, '');
    },
  }),
];

const columnHelperRaces = createColumnHelper<Race>();

const racesColumns = [
  {
    header: '',
    id: 'NumberGroup',
    columns: [
      columnHelperRaces.accessor('Number', {
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: '',
    id: 'NameGroup',
    columns: [
      columnHelperRaces.accessor('Name', {
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    header: '',
    id: 'ExpTableGroup',
    columns: [
      columnHelperRaces.accessor('ExpTable', {
        header: 'Exp',
        cell: (info) => `${info.getValue()}%`,
      }),
    ],
  },
  {
    id: 'Strength',
    header: <div class="text-center">Strength</div>,
    columns: [
      columnHelperRaces.accessor('mSTR', {
        header: 'Min',
        cell: (info) => info.getValue(),
      }),
      columnHelperRaces.accessor('xSTR', {
        header: 'Max',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    id: 'Intellect',
    header: <div class="text-center">Intellect</div>,
    columns: [
      columnHelperRaces.accessor('mINT', {
        header: 'Min',
        cell: (info) => info.getValue(),
      }),
      columnHelperRaces.accessor('xINT', {
        header: 'Max',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    id: 'Willpower',
    header: <div class="text-center">Willpower</div>,
    columns: [
      columnHelperRaces.accessor('mWIL', {
        header: 'Min',
        cell: (info) => info.getValue(),
      }),
      columnHelperRaces.accessor('xWIL', {
        header: 'Max',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    id: 'Agility',
    header: <div class="text-center">Agility</div>,
    columns: [
      columnHelperRaces.accessor('mAGL', {
        header: 'Min',
        cell: (info) => info.getValue(),
      }),
      columnHelperRaces.accessor('xAGL', {
        header: 'Max',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    id: 'Health',
    header: <div class="text-center">Health</div>,
    columns: [
      columnHelperRaces.accessor('mHEA', {
        header: 'Min',
        cell: (info) => info.getValue(),
      }),
      columnHelperRaces.accessor('xHEA', {
        header: 'Max',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    id: 'Charm',
    header: <div class="text-center">Charm</div>,
    columns: [
      columnHelperRaces.accessor('mCHM', {
        header: 'Min',
        cell: (info) => info.getValue(),
      }),
      columnHelperRaces.accessor('xCHM', {
        header: 'Max',
        cell: (info) => info.getValue(),
      }),
    ],
  },
  {
    id: 'Abilities',
    columns: [
      columnHelperClasses.display({
        header: 'Abilities',
        cell: (info) => {
          const combinedValues = allClassValuesAbilities.reduce(
            (curr: string, mapKey: number) => {
              const key: keyof Race = specialProperties.get(mapKey);
              if (info.row.original.hasOwnProperty(key)) {
                curr += `${key}${getNumberString(info.row.original[key])}, `;
              }

              return curr;
            },
            '',
          );

          return combinedValues.replace(/,\s*$/, '');
        },
      }),
    ],
  },
];

const defaultColumnVisibility = {
  Number: false,
};

export function ClassRacePage() {
  const [classColumnVisibility, setClassColumnVisibility] = makePersisted(
    createSignal<VisibilityState>(defaultColumnVisibility),
    { name: 'class-table-columns' },
  );
  const classesTable = createSolidTable({
    get data() {
      return classData;
    },
    state: {
      get columnVisibility() {
        return classColumnVisibility();
      },
    },
    columns: classesColumns,
    enableRowSelection: false,
    onColumnVisibilityChange: setClassColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const [raceColumnVisibility, setRaceColumnVisibility] = makePersisted(
    createSignal<VisibilityState>(defaultColumnVisibility),
    { name: 'race-table-columns' },
  );
  const racesTable = createSolidTable({
    get data() {
      return raceData;
    },
    state: {
      get columnVisibility() {
        return raceColumnVisibility();
      },
    },
    columns: racesColumns,
    onColumnVisibilityChange: setRaceColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <ScrollContainer>
      <div class="flex flex-col gap-4">
        <h2>Classes</h2>
        <DataTable table={classesTable} />
        <h2>Races</h2>
        <DataTable table={racesTable} />
      </div>
    </ScrollContainer>
  );
}
