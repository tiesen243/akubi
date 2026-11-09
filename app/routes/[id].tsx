import {
  dehydrate,
  HydrationBoundary,
  useSuspenseQuery,
} from '@tanstack/react-query'
import {
  ensureEntry,
  loadHandles,
} from '@trpc/tanstack-react-query/unstable-handles'
import { Suspense } from 'react'

import { Typography } from '@/components/ui/typography'
import { trpc } from '@/lib/trpc/client'
import { trpcContext } from '@/lib/trpc/server'

import type { Route } from './+types/[id]'

export const loader = async ({ context, params }: Route.LoaderArgs) => {
  const { queryClient, trpc } = context.get(trpcContext)

  const [handles, { post }] = await loadHandles(trpc, {
    post: ensureEntry(trpc.post.one, parseInt(params.id, 10)),
  })

  return { dehydratedState: dehydrate(queryClient), ...handles, post }
}

export const meta: Route.MetaFunction = ({ loaderData }) => [
  { title: `${loaderData.post.title} | Akubi` },
  { name: 'description', content: loaderData.post.content },
]

export default function PostDetailsPage({
  params,
  loaderData,
}: Route.ComponentProps) {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <main className='container'>
        <h1 className='sr-only'>Post {params.id} Details</h1>

        <Suspense
          key={params.id}
          fallback={<Typography>Loading post details...</Typography>}
        >
          <PostDetails id={parseInt(params.id, 10)} />
        </Suspense>
      </main>
    </HydrationBoundary>
  )
}

const PostDetails: React.FC<{ id: number }> = ({ id }) => {
  const { data } = useSuspenseQuery(trpc.post.one.queryOptions(id))

  return (
    <>
      <Typography variant='h2'>{data.title}</Typography>
      <Typography>{data.content}</Typography>
    </>
  )
}
