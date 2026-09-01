import { copyFile, readFile, writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', 'react-router', 'react/jsx-runtime'],
  async onSuccess() {
    const file = 'dist/index.js'
    const content = await readFile(file, 'utf8')
    if (!content.startsWith('"use client"')) {
      await writeFile(file, `"use client";\n${content}`)
    }
    await copyFile('src/styles.css', 'dist/styles.css')
  },
})
