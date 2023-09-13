import { defineConfig, loadEnv } from 'vite';
import viteReact from '@vitejs/plugin-react';

// we can pass an object or a factory function
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [viteReact()],
    server: {
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: env.VITE_TRPC_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // ^ - means starts with
        },
      },
    },
  };
});
