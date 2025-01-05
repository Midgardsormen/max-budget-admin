import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isSSR = mode === 'ssr';

  return {
    build: {
      outDir: isSSR ? 'dist/server' : 'dist/client', // Sépare le client et le serveur
      rollupOptions: {
        input: {
          home: path.resolve(__dirname, 'views/Home.svelte'), // Spécifie vos entrées
          layout: path.resolve(__dirname, 'views/Layout.svelte'),
        },
        output: {
          format: isSSR ? 'cjs' : 'esm', // Format CJS pour le serveur, ESM pour le client
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
      ssr: isSSR, // Active SSR pour le serveur
    },
    plugins: [
      svelte({
        compilerOptions: {
          generate: isSSR ? 'ssr' : 'dom', // 'ssr' pour le serveur, 'dom' pour le client
          hydratable: true, // Active l'hydratation côté client
        },
      }),
    ],
  };
});
