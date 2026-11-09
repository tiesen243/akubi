import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite-plus'

import fmt from './oxfmt.config'

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  fmt,

  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },

  staged: {
    '*': 'vp check --fix',
  },
})
