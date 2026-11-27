import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import content from './scripts/vite-content-plugin.mjs';

// `base: './'` keeps the build portable (GitHub Pages, any sub-folder).
export default defineConfig({
  plugins: [react(), content()],
  base: './',
});
