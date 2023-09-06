import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    // vite config
    define: {
      'process.env': env,
    },
    server: {
      proxy: {
        '/api': {
          target: env.REACT_APP_API_URL,
          changeOrigin: true,
        },
      },
    }
  }
})