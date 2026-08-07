import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Three.js r143 doesn't export the `three/addons` subpath in its package
      // exports map — map it to the actual examples/jsm location.
      'three/addons': fileURLToPath(new URL('./node_modules/three/examples/jsm/', import.meta.url)),
    },
  },
});