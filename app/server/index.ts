import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '@/server/routers/_app'
import { createTRPCContext } from '@/server/trpc'

export const handler = async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 })

  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: ({ resHeaders }) => createTRPCContext(request, resHeaders),
    allowMethodOverride: true,
  })

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  )

  return response
}
