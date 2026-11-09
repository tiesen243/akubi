import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { postRouter } from '@/server/routers/post.router'
import { createTRPCRouter } from '@/server/trpc'

const appRouter = createTRPCRouter({
  post: postRouter,
})

type AppRouter = typeof appRouter
type InferRouterInputs = inferRouterInputs<AppRouter>
type InferRouterOutputs = inferRouterOutputs<AppRouter>

export type { AppRouter, InferRouterInputs, InferRouterOutputs }
export { appRouter }
