import { debounce } from '@solid-primitives/scheduled';
import { Column } from '@tanstack/solid-table';
import { Setter } from 'solid-js';
import { Accessor } from 'solid-js';

type TextSearchProps = {
  value: Accessor<string>;
  setValue: Setter<string>;
  column?: Column<any>;
};

export function TextSearch({ value, setValue, column }: TextSearchProps) {
  return (
    <input
      placeholder="Search"
      class="p-2"
      type="search"
      value={value()}
      onInput={debounce((e) => {
        column?.setFilterValue(e.target.value);
        setValue(e.target.value);
      }, 500)}
    />
  );
}
