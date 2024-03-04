import { Accessor, createEffect, createSignal } from 'solid-js';
import { Shop, ShopInventory } from '../../types';
import {
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { DataTable } from '../DataTable';
import { UnknownReference } from '../references';
import { armorData, itemData, weaponData } from '../../data';
import { CurrencyTypes } from '../../utils/data-types';

type HydratedShopInventory = {
  Price: number;
  Currency: number;
  ItemType: number;
  Markup: number;
} & ShopInventory;

const columnHelper = createColumnHelper<HydratedShopInventory>();

const columns = [
  columnHelper.display({
    header: 'Name',
    cell: (info) => <UnknownReference number={info.row.original.Number} />,
  }),
  columnHelper.accessor('Max', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Price', {
    cell: (info) => {
      const { Currency, Markup } = info.row.original;
      const cost = info.getValue() * ((100 + Markup) / 100);

      if (cost === 0) return 'Free';
      return `${cost} ${CurrencyTypes[Currency]}`;
    },
  }),
  columnHelper.accessor('Time', {
    cell: (info) => {
      if (info.getValue() === 0) return 'No regen';

      const { Amount, Time, Percent } = info.row.original;
      const minutes = Time % 60;
      const hours = Math.floor(Time / 60);
      let duration = '';
      if (hours > 0) duration += `${hours}h`;
      if (minutes > 0) duration += `${minutes}m`;
      return `${Percent}% for ${Amount} per ${duration}`;
    },
  }),
];

type InventoryTableProps = {
  shop: Accessor<Shop | undefined>;
};

export function InventoryTable({ shop }: InventoryTableProps) {
  const hydratedTableData = (
    shopInventory: ShopInventory[],
  ): HydratedShopInventory[] =>
    shopInventory.map((shopItem) => {
      const found =
        itemData.find((item) => item.Number === shopItem.Number) ||
        weaponData.find((item) => item.Number === shopItem.Number) ||
        armorData.find((item) => item.Number === shopItem.Number);

      return {
        ...shopItem,
        Price: found!.Price,
        Currency: found!.Currency,
        ItemType: found!.ItemType,
        Markup: shop()!['Markup%'],
      };
    });

  const [tableData, setTableData] = createSignal<HydratedShopInventory[]>();

  createEffect(() => {
    if (shop()?.Inventory) setTableData(hydratedTableData(shop()!.Inventory!));
  });

  const table = createSolidTable({
    get data() {
      return tableData() || [];
    },
    columns,
    enableRowSelection: false,
    enableMultiRowSelection: false,
    getRowId: (row) => String(row.Number),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return <DataTable table={table} />;
}
