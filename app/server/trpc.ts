import { initTRPC } from '@trpc/server'

const createTRPCContext = (request: Request, resHeaders?: Headers) => {
  return {
    headers: request.headers,
    resHeaders: resHeaders,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create()

const createCaller = t.createCallerFactory

const createTRPCRouter = t.router

const publicProcedure = t.procedure

export { createCaller, createTRPCRouter, createTRPCContext, publicProcedure }
