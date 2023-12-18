import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // prettier-ignore
    alias: {
      '@alert': path.resolve(__dirname, 'src/app/components/alert'),
      '@loader': path.resolve(__dirname, 'src/app/components/loader'),
      '@movieCard': path.resolve(__dirname, 'src/app/components/movieCard'),
      '@movieGallery': path.resolve(__dirname, 'src/app/components/movieGallery'),
      '@navigation': path.resolve(__dirname, 'src/app/components/navigation'),
      '@pagination': path.resolve(__dirname, 'src/app/components/pagination'),
      '@ratedMovies': path.resolve(__dirname, 'src/app/components/ratedMovies'),
      '@search': path.resolve(__dirname, 'src/app/components/search'),
    },
  },
});
