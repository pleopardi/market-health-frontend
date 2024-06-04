import {type QwikIntrinsicElements, Slot, component$} from '@builder.io/qwik';

export default component$<QwikIntrinsicElements['button']>((props) => {
  return (
    <button
      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      {...props}>
      <Slot />
    </button>
  );
});