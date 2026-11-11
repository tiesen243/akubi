import { bindings, defineConfig } from 'cf/config'

export default defineConfig({
  worker: {
    name: 'akubi',
    compatibilityDate: '2026-10-06',
    observability: { enabled: true },
    entrypoint: './workers/app.ts',
    env: {
      DB: bindings.d1({
        id: 'baddbdc9-4fbc-4485-a7b9-2cd862185e69',
        name: 'akubi-db',
      }),
    },
  },
})
