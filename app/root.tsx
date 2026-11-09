import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import { Provider } from '@/components/provider'
import { Typography } from '@/components/ui/typography'
import globalsCss from '@/globals.css?url'
import { createTRPC, trpcContext } from '@/lib/trpc/server'

import type { Route } from './+types/root'

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: globalsCss },

  // Fonts
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:ital,wght@0,100..900;1,100..900&family=Geist:ital,wght@0,100..900;1,100..900&family=Noto+Serif+Georgian:wght@100..900&display=swap',
  },
]

export const meta: Route.MetaFunction = () => [
  { title: 'Akubi' },
  {
    name: 'description',
    content:
      'Akubi is a modern web application built with React Router and TPRC.',
  },
]

export const middleware: Route.MiddlewareFunction[] = [
  ({ context, request }) => context.set(trpcContext, createTRPC(request)),
]

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>

      <body className='min-h-dvh font-sans antialiased'>
        <Provider>{children}</Provider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : message
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.data
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message
    ;({ stack } = error)
  }

  return (
    <main className='flex min-h-dvh flex-col items-center justify-center gap-8'>
      <div className='flex items-center gap-4 divide-x divide-border'>
        <Typography variant='h1' className='pr-4'>
          {message}
        </Typography>
        <Typography>{details}</Typography>
      </div>
      {stack && (
        <pre className='max-h-64 max-w-4xl overflow-x-auto rounded-lg bg-accent p-4 text-accent-foreground'>
          {stack}
        </pre>
      )}
    </main>
  )
}
