import {qwikCity} from '@builder.io/qwik-city/vite';
import {qwikVite} from '@builder.io/qwik/optimizer';
import {type UserConfig, defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig((): UserConfig => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    server: {
      headers: {
        'Cache-Control': 'public, max-age=0',
      },
    },
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
