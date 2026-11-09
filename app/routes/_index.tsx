import {
  dehydrate,
  HydrationBoundary,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import {
  loadHandles,
  prefetchEntry,
} from '@trpc/tanstack-react-query/unstable-handles'
import { Suspense } from 'react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Typography } from '@/components/ui/typography'
import { trpc } from '@/lib/trpc/client'
import { trpcContext } from '@/lib/trpc/server'

import type { Route } from './+types/_index'

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { queryClient, trpc } = context.get(trpcContext)

  const [handles] = await loadHandles(trpc, {
    posts: prefetchEntry(trpc.post.all),
  })

  return { dehydratedState: dehydrate(queryClient), ...handles }
}

export default function IndexPage({ loaderData }: Route.ComponentProps) {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <main className='container'>
        <Typography variant='h1'>Welcome to Akubi</Typography>

        <CreatePost />

        <Suspense fallback={<Typography>Loading posts...</Typography>}>
          <PostList />
        </Suspense>
      </main>
    </HydrationBoundary>
  )
}

const PostList: React.FC = () => {
  const { data } = useSuspenseQuery(trpc.post.all.queryOptions())

  return (
    <section className='grid gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data.map((post) => (
        <Link key={post.id} to={`/${post.id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className='line-clamp-1'>
                {post.content}
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  )
}

const CreatePost: React.FC = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    ...trpc.post.create.mutationOptions(),
    onSuccess: () => queryClient.invalidateQueries(trpc.post.all.queryFilter()),
  })

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const title = formData.get('title') as string
    const content = formData.get('content') as string

    mutation.mutate({ title, content })
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className='my-4 flex flex-col gap-2'>
      <Input name='title' placeholder='Title' required />
      <Input name='content' placeholder='Content' required />

      <Button type='submit'>Create Post</Button>
    </form>
  )
}
