# Backend (Cloudflare Worker)

This is the backend for the collaborative editor, running as a Cloudflare Worker using [Hono](https://hono.dev/) and real-time collaboration powered by [Yjs](https://yjs.dev/) and [y-durableobjects](https://github.com/dmonad/y-durableobjects).

## Features
- REST API and real-time endpoints for collaboration
- Durable Object-based Yjs document storage
- TypeScript, Hono, Yjs, y-durableobjects

## Scripts
- `pnpm install` — install dependencies
- `pnpm dev` — run locally with Wrangler
- `pnpm deploy` — deploy to Cloudflare
- `pnpm cf-typegen` — generate/sync types from wrangler config

## Development
1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Start local dev server:
   ```sh
   pnpm dev
   ```

## Deployment
Deploy to Cloudflare Workers:
```sh
pnpm deploy
```

## Type Generation
To generate or sync Cloudflare Worker types:
```sh
pnpm cf-typegen
```