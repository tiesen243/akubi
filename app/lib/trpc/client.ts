import type { QueryClient } from '@tanstack/react-query'

import { createTRPCClient, httpBatchStreamLink } from '@trpc/client'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'

import type { AppRouter } from '@/server/routers/_app'

import { createQueryClient } from '@/lib/trpc/query-client'
import { getBaseUrl } from '@/lib/utils'

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') return createQueryClient()
  return (browserQueryClient ??= createQueryClient())
}

const trpcClient = createTRPCClient<AppRouter>({
  links: [httpBatchStreamLink({ url: `${getBaseUrl()}/api/trpc` })],
})

const trpc = createTRPCOptionsProxy({
  client: trpcClient,
  queryClient: getQueryClient(),
})

export { trpc, trpcClient, getQueryClient }
