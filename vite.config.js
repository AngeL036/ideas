import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // if you plan to deploy the app under /restaurante, set the base
  // base: '/restaurante/',  // Descomenta esto solo para producción
  plugins: [react(),
    tailwindcss()
  ],
})
