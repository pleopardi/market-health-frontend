import {component$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h1>Hello world 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Market Health Chart',
  meta: [
    {
      name: 'description',
      content: 'Market Health Chart',
    },
  ],
};
