/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { siteMeta } from './vite-plugins/site-meta.ts'

// https://vite.dev/config/
export default defineConfig({
  // Путь, по которому опубликован сайт. Для GitHub Pages его передаёт workflow (.github/workflows/deploy.yml)
  base: process.env.BASE_PATH ?? '/',
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
