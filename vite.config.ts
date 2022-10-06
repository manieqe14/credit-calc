import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import VitePluginFonts from 'vite-plugin-fonts';

export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePluginFonts({
      google: {
        families: ['Open Sans Pro'],
      },
    }),
  ],
});