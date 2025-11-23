import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/Proyecto-Final-U3/', // 👈 nombre EXACTO del repo
  build: {
    outDir: 'docs', // 👈 Vite exportará el build dentro de /docs
  },
  plugins: [react(), tailwindcss()],
});
