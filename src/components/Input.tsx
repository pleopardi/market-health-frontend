import {type QwikIntrinsicElements, component$} from '@builder.io/qwik';

type Props = QwikIntrinsicElements['input'] & {
  label?: string;
};

export default component$<Props>(({label, ...props}) => (
  <div>
    {label && (
      <label
        class="block text-sm font-medium leading-6 text-gray-900"
        for={props.id}>
        {label}
      </label>
    )}
    <input
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      {...props}
    />
  </div>
));
