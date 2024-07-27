import path from 'path';
import { fileURLToPath } from 'url';

import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import stdLibBrowser from 'vite-plugin-node-stdlib-browser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), stdLibBrowser(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      global: path.resolve(__dirname, 'node_modules/global'),
      buffer: path.resolve(__dirname, 'node_modules/buffer'),
      crypto: path.resolve(__dirname, 'node_modules/crypto-browserify'),
      stream: path.resolve(__dirname, 'node_modules/stream-browserify'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },

      plugins: [],
    },
  },
  define: {
    'process.env': {},
  },
});
