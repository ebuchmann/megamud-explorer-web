import { debounce } from '@solid-primitives/scheduled';
import classNames from 'classnames';
import { Accessor } from 'solid-js';

type TextInputProps = {
  label: string;
  value: Accessor<string | undefined>;
  onInput: (e: any) => void;
  class?: string;
  debounce?: number;
};

export function TextInput(props: TextInputProps) {
  return (
    <div class={classNames('flex relative', props.class)}>
      <input
        class="block pt-2.5 pb-1 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        type="number"
        value={props.value()}
        placeholder=""
        onInput={debounce((e) => {
          props.onInput(e);
        }, props.debounce || 0)}
      />
      <label
        for="ap"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {props.label}
      </label>
    </div>
  );
}
