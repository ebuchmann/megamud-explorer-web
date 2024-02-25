import { Accessor, Setter } from 'solid-js';
import classData from '../data/classes.json';

type ClassSelectProps = {
  onChange: (val: number) => void;
  value: Accessor<string>;
  setValue: Setter<string>;
};

export function ClassSelect({ onChange, value, setValue }: ClassSelectProps) {
  return (
    <select
      value={value()}
      onChange={(e) => {
        onChange(Number(e.target.value));
        setValue(e.target.value);
      }}
    >
      <option value="">Any Class</option>
      {classData
        .sort((a, b) => a.Name.localeCompare(b.Name))
        .map((cls) => (
          <option value={cls.Number}>{cls.Name}</option>
        ))}
    </select>
  );
}
