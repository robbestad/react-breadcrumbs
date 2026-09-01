import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const demoRoot = fileURLToPath(new URL('.', import.meta.url))
const librarySrc = fileURLToPath(new URL('../src', import.meta.url))

export default defineConfig({
  root: demoRoot,
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^react-breadcrumbs\/styles\.css$/,
        replacement: `${librarySrc}/styles.css`,
      },
      {
        find: /^react-breadcrumbs$/,
        replacement: `${librarySrc}/index.ts`,
      },
    ],
  },
  server: { port: 5173 },
  preview: { port: 4173 },
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
  },
})
