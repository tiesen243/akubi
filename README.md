# Akubi

Akubi is a full-stack post application built with React, React Router, tRPC, and Cloudflare Workers. It supports creating, browsing, viewing, and deleting posts through a server-rendered web interface.

## Features

- Create and browse posts from the home page
- View individual post details
- Delete posts from the post list
- Server-side data loading with React Router
- Type-safe client/server communication with tRPC
- React Query hydration for server-rendered data
- Persistent post storage with Cloudflare D1
- Deployable to Cloudflare Workers

## Tech stack

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [tRPC](https://trpc.io/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Bun](https://bun.sh/)

## Getting started

### Prerequisites

- [Bun](https://bun.sh/docs/installation)
- A Cloudflare account for deployment

### Install dependencies

```sh
bun install
```

### Start the development server

```sh
bun run dev
```

The development server will print the local URL when it starts.

### Type-check and build

```sh
bun run typecheck
bun run build
```

### Deploy

Configure the Cloudflare CLI with your account, then run:

```sh
bun run deploy
```

The Cloudflare Worker and D1 binding are configured in `cloudflare.config.ts`. Apply the SQL files in `migrations/` to the target D1 database before using the deployed application.

## API

The tRPC endpoint is available at `/api/trpc`. The post router provides procedures for listing, reading, creating, updating, and deleting posts.

## Project structure

```text
app/       React Router application, UI components, and tRPC server
migrations/ D1 database migrations
public/    Static assets
workers/   Cloudflare Workers entry point
```

## Data storage

Posts are stored in the Cloudflare D1 `posts` table. The initial schema is defined in `migrations/0001_init.sql`, and the application accesses the database through `app/server/services/post.service.ts`.

## License

This project is licensed under the [MIT License](./LICENSE).