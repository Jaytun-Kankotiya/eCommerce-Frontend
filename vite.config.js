import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/productListing': 'https://e-commerce-backend-umber-nu.vercel.app',
    },
  },
});
