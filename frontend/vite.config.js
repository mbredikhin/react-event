import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { checker } from 'vite-plugin-checker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      svgr(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    },
    server: {
      ...(env.VITE_APP_URL && { host: env.VITE_APP_URL }),
      port: 8001,
    },
    build: {
      target: 'esnext',
    },
  };
});
