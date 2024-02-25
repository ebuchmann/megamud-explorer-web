import { debounce } from '@solid-primitives/scheduled';
import { Column } from '@tanstack/solid-table';
import { Accessor, Setter } from 'solid-js';

type LevelInputProps = {
  value: Accessor<string>;
  setValue: Setter<string>;
  column: Column<any>;
};

export function LevelInput({ value, setValue, column }: LevelInputProps) {
  return (
    <input
      placeholder="Level"
      class="p-2 w-24"
      value={value()}
      type="number"
      onInput={debounce((e) => {
        e.target.value === ''
          ? column?.setFilterValue('')
          : column?.setFilterValue(Number(e.target.value));
        setValue(e.target.value);
      }, 500)}
    />
  );
}
