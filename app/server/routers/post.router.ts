import type { Post } from '@/server/services/post.service'

import { PostService } from '@/server/services/post.service'
import { createTRPCRouter, publicProcedure } from '@/server/trpc'

const postService = new PostService()

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(() => postService.all()),

  one: publicProcedure
    .input((value): Post['id'] => parseInt(value as string, 10))
    .query(({ input }) => postService.one(input)),

  create: publicProcedure
    .input((value): Omit<Post, 'id'> => value as Omit<Post, 'id'>)
    .mutation(({ input }) => postService.create(input)),

  update: publicProcedure
    .input(
      (value): { id: Post['id']; post: Partial<Omit<Post, 'id'>> } =>
        value as { id: Post['id']; post: Partial<Omit<Post, 'id'>> }
    )
    .mutation(({ input }) => postService.update(input.id, input.post)),

  delete: publicProcedure
    .input((value): Post['id'] => parseInt(value as string, 10))
    .mutation(({ input }) => postService.delete(input)),
})
