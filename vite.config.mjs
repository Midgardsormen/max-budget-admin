import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  // Mode "SSR" ou "lib" -> on veut générer du code pour le serveur
  build: {
    outDir: 'dist/views',
    rollupOptions: {
      input: {
        layout: path.resolve(__dirname, 'views/Layout.svelte'),
        home: path.resolve(__dirname, 'views/Home.svelte'),
      },
      output: {
        // Formats CJS, etc.
        format: 'cjs',
        entryFileNames: '[name].js'
      }
    },
    // On force une build SSR (production côté serveur) :
    ssr: true
  },
  plugins: [
    svelte({
      compilerOptions: {
        generate: 'ssr',
        hydratable: true,
      }
    })
  ],
});
