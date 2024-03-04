import {
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { Shop } from '../types';
import { shopData } from '../data';
import { ScrollContainer } from '../components/layout/ScrollContainer';
import { DataTable } from '../components/DataTable';
import { createSignal } from 'solid-js';
import { TextSearch } from '../components/TextSearch';
import { SidePanel } from '../components/layout/SidePanel';
import { useNavigate } from '@solidjs/router';
import { MainPanel } from '../components/layout/MainPanel';
import { ShopTypes } from '../utils/data-types';
import { ShopPanel } from '../components/shops/ShopPanel';

const columnHelper = createColumnHelper<Shop>();

const columns = [
  columnHelper.accessor('Number', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Name', {
    cell: (info) => {
      const { ShopType, MinLVL, MaxLVL } = info.row.original;
      if (ShopType === 8) return `${info.getValue()} (${MinLVL} - ${MaxLVL})`;
      return info.getValue();
    },
  }),
  columnHelper.accessor('ShopType', {
    header: 'Type',
    cell: (info) => ShopTypes[info.getValue()],
  }),
];

export function ShopsPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = createSignal<string>('');

  const table = createSolidTable({
    get data() {
      return shopData;
    },
    columns,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: (select) => {
      const val = Object.keys(select())[0];
      navigate(`/shops/${val}`, { replace: true });
    },
    getRowId: (row) => String(row.Number),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div class="flex gap-4 h-[100%]">
      <MainPanel width="w-6/12">
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
      </MainPanel>
      <SidePanel width="w-6/12">
        <ShopPanel />
      </SidePanel>
    </div>
  );
}
