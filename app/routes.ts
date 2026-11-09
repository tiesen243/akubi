import type { RouteConfig } from '@react-router/dev/routes'

import { index, prefix, route } from '@react-router/dev/routes'

export default [
  ...prefix('/api', [route('/trpc/:route', './routes/api/trpc.ts')]),

  index('./routes/_index.tsx'),
  route('/:id', './routes/[id].tsx'),
] satisfies RouteConfig
