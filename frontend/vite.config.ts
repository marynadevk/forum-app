// import react from '@vitejs/plugin-react';

// import path from 'path';
// import { AliasOptions, defineConfig } from 'vite';
// import tsconfigPaths from 'vite-tsconfig-paths';

// const root = path.resolve(__dirname, 'src');

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   resolve: {
//     // alias: {
//     //   '@': path.resolve(__dirname, './src'),
//     //   '@components': path.resolve(__dirname, './src/components'),
//     //   '@ui': path.resolve(__dirname, './src/components/ui'),
//     //   '@schemas': path.resolve(__dirname, './src/schemas'),
//     //   '@pages': path.resolve(__dirname, './src/pages'),
//     // },
//     alias: {
//       '@': root,
//     } as AliasOptions,
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths({ root: '.', projects: ['./tsconfig.json'] })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
});

