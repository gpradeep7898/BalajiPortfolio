import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  preview: {
    allowedHosts: [
      'balajiportfolio-0yri.onrender.com'
    ],
    host: true,
    port: process.env.PORT || 10000,
  },
}) 