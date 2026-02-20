import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Avoid CORS: browser talks to same origin, Vite forwards to OpenClaw
      '/v1/clawg-ui': {
        target: 'http://localhost:18789',
        changeOrigin: true,
      },
    },
  },
})
