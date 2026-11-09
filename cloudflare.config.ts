import { defineConfig } from 'cf/config'

export default defineConfig({
  worker: {
    name: 'akubi',
    compatibilityDate: '2026-10-06',
    observability: {
      enabled: true,
    },
    entrypoint: './workers/app.ts',
  },
})
