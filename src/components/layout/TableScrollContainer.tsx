import { leadingAndTrailing, throttle } from '@solid-primitives/scheduled';
import { Table } from '@tanstack/table-core';
import { JSX } from 'solid-js';

type TableScrollContainerProps<T> = {
  children: JSX.Element;
  table: Table<T>;
  ref: any;
};

export function TableScrollContainer<T>({
  children,
  table,
  ref,
}: TableScrollContainerProps<T>) {
  const trigger = leadingAndTrailing(
    throttle,
    (event: any) => handleScroll(event),
    100,
  );

  const handleScroll = (e: WheelEvent) => {
    const target = e.target as HTMLDivElement;

    const currentScroll = target.scrollTop;
    const totalHeight = target.scrollHeight - target.clientHeight;

    if (
      currentScroll + 1000 > totalHeight &&
      table.getFilteredRowModel().rows.length >
        table.getState().pagination.pageSize
    ) {
      console.log('increase');
      table.setPageSize(table.getState().pagination.pageSize + 100);
    }
  };

  return (
    <div ref={ref} onScroll={trigger} class="overflow-auto flex-1 h-[100%]">
      {children}
    </div>
  );
}
