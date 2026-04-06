import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      includePublic: true,
      jpeg: { quality: 72 },
      jpg:  { quality: 72 },
      png:  { quality: 80 },
      webp: { lossless: false, quality: 75 },
    }),
  ],
  server: {
    allowedHosts: true
  }
})
