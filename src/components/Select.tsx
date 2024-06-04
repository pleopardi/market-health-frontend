import {type QwikIntrinsicElements, component$} from '@builder.io/qwik';

type Option = {
  label: string;
  value: string;
};

type Props = QwikIntrinsicElements['select'] & {
  label?: string;
  options: Option[];
};

export default component$<Props>(({label, options, ...props}) => {
  return (
    <div>
      {label && (
        <label
          class="block text-sm font-medium leading-6 text-gray-900"
          for={props.id}>
          {label}
        </label>
      )}
      <select
        class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        {...props}>
        {options.map(({label, value}) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
});
