import {component$, useStore, useVisibleTask$} from '@builder.io/qwik';
import {publish, subscribe} from 'brokers/notification';
import {CheckCircleSolid, XCircleSolid, XMarkSolid} from 'components/Icons';

type Props = {
  duration?: number;
};

type Store = {
  description: string;
  title: string;
  type: 'success' | 'failure';
  visible: boolean;
};

export default component$<Props>(({duration = 4000}) => {
  const state = useStore<Store>({
    description: '',
    title: '',
    type: 'success',
    visible: false,
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    subscribe('show', (event) => {
      state.description = event.description ?? '';
      state.title = event.title;
      state.type = event.type;
      state.visible = true;

      setTimeout(() => {
        state.visible = false;
      }, duration);
    });

    subscribe('hide', () => {
      state.visible = false;
    });
  });

  return (
    <div
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 z-40 flex items-end px-4 py-6 sm:items-start sm:p-6">
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        {state.visible && (
          <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="p-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  {state.type === 'success' && (
                    <CheckCircleSolid
                      aria-hidden
                      class="h-6 w-6 text-green-600"
                    />
                  )}
                  {state.type === 'failure' && (
                    <XCircleSolid aria-hidden class="h-6 w-6 text-red-600" />
                  )}
                </div>
                <div class="ml-3 w-0 flex-1 pt-0.5">
                  <p class="text-sm font-medium text-gray-900">{state.title}</p>
                  {state.description && (
                    <p class="mt-1 text-sm text-gray-500">
                      {state.description}
                    </p>
                  )}
                </div>
                <div class="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick$={() => {
                      publish('hide', {});
                    }}>
                    <span class="sr-only">Close</span>
                    <XMarkSolid aria-hidden class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
