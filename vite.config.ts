/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteMeta } from './vite-plugins/site-meta.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteMeta()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: {
      // Стабильные имена классов CSS Modules в тестах
      modules: { classNameStrategy: 'non-scoped' },
    },
  },
})
