import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [reactRefresh()],
  base: '/credit-calc/',
  build: {
    outDir: './build',
  },
});
