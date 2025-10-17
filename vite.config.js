import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Configuración de Vite + Tailwind + React
export default defineConfig({
  base: '/Proyecto-Final-U3/', // <--- Clave para que GitHub Pages cargue correctamente
  plugins: [react(), tailwindcss()],
});

