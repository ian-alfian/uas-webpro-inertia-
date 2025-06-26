import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import vue from '@vitejs/plugin-vue'
import adonisjs from '@adonisjs/vite/client'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.ts' } }),
    vue(),
    adonisjs({
      entrypoints: ['inertia/app/app.ts'],
      reload: ['resources/views/**/*.edge'], // perbaiki * wildcard
    }),
  ],

  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`, // backtick string template harus di dalam tanda kutip
    },
  },

  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
})
