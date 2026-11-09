# Akubi

Akubi is a small full-stack post application built with React, React Router, tRPC, and Cloudflare Workers.

## Features

- Create and browse posts from the home page
- View individual post details
- Server-side data loading with React Router
- Type-safe client/server communication with tRPC
- React Query hydration for server-rendered data
- Deployable to Cloudflare Workers

## Tech stack

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [tRPC](https://trpc.io/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
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

## Project structure

```text
app/       React Router application, UI components, and tRPC server
public/    Static assets
workers/   Cloudflare Workers entry point
```

## Data storage

Posts are currently stored in memory by `PostService`. They reset when the worker restarts and are intended for demonstration and development.

## License

This project is licensed under the [MIT License](./LICENSE).