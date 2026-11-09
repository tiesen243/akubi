import type { QueryClient } from '@tanstack/react-query'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { cache } from 'react'
import { createContext } from 'react-router'

import type { AppRouter } from '@/server/routers/_app'

import { createQueryClient } from '@/lib/trpc/query-client'
import { appRouter } from '@/server/routers/_app'
import { createCaller, createTRPCContext } from '@/server/trpc'

const trpcContext = createContext<{
  queryClient: QueryClient
  trpcClient: ReturnType<AppRouter['createCaller']>
  trpc: TRPCOptionsProxy<AppRouter>
}>()

const getQueryClient = cache(createQueryClient)

const createTRPC = (request: Request) => {
  const queryClient = getQueryClient()

  const trpcClient = createCaller(appRouter)(createTRPCContext(request))

  const trpc = createTRPCOptionsProxy({
    ctx: createTRPCContext(request),
    router: appRouter,
    queryClient,
  })

  return { queryClient, trpcClient, trpc }
}

export { trpcContext, createTRPC }
