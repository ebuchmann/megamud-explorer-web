import {
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { Item } from '../types';
import itemJSON from '../data/items.json';
import { ScrollContainer } from '../components/layout/ScrollContainer';
import { DataTable } from '../components/DataTable';
import { ItemTypes } from '../utils/data-types';
import { createSignal } from 'solid-js';
import { TextSearch } from '../components/TextSearch';
import { expandKeyValue } from '../utils/formatting';
import { allItemValuesAbilities, specialProperties } from '../utils/values';

const columnHelper = createColumnHelper<Item>();

const columns = [
  columnHelper.accessor('Number', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Name', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('ItemType', {
    header: 'Type',
    cell: (info) => ItemTypes[info.getValue()],
  }),
  columnHelper.accessor('Encum', {
    header: 'Enc',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Magical', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('UseCount', {
    header: 'Uses',
    cell: (info) => (info.getValue() > 0 ? info.getValue() : ''),
  }),
  columnHelper.display({
    header: 'Abilities',
    cell: (info) => {
      const combinedValues = allItemValuesAbilities.reduce(
        (curr: string, mapKey: number) => {
          const key: keyof Item = specialProperties.get(mapKey);
          if (info.row.original.hasOwnProperty(key)) {
            curr += `${expandKeyValue(key, info.row.original[key])}, `;
          }

          return curr;
        },
        '',
      );

      return combinedValues.replace(/,\s*$/, '');
    },
  }),
];

export function ItemsPage() {
  const [searchValue, setSearchValue] = createSignal<string>('');

  const table = createSolidTable({
    get data() {
      return itemJSON as Item[];
    },
    columns,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div class="flex gap-4">
        <TextSearch
          value={searchValue}
          setValue={setSearchValue}
          column={table.getColumn('Name')}
        />
      </div>

      <ScrollContainer>
        <DataTable table={table} />
      </ScrollContainer>
    </>
  );
}
