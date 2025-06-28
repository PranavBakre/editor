# Web Frontend (React + Vite)

This is the web frontend for the collaborative editor, built with React 19, Vite, and TypeScript. It integrates the collaborative editor from `@repo/editor` and supports real-time editing via Yjs.

## Features

- React 19 + Vite + TypeScript
- Uses `@repo/editor` for collaborative editing
- Real-time sync via Yjs
- ESLint, Prettier, and TypeScript for quality

## Scripts

- `pnpm dev` — start local dev server
- `pnpm build` — build for production
- `pnpm lint` — run ESLint
- `pnpm preview` — preview built app with Wrangler Pages
- `pnpm deploy` — deploy to Cloudflare Pages
- `pnpm cf-typegen` — generate/sync types from wrangler config

## Development

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Start dev server:
   ```sh
   pnpm dev
   ```

## Build & Deploy

- **Build:**
  ```sh
  pnpm build
  ```
- **Preview:**
  ```sh
  pnpm preview
  ```
- **Deploy:**
  ```sh
  pnpm deploy
  ```

## Type Generation

To generate or sync Cloudflare Worker types:

```sh
pnpm cf-typegen
```

## Tech Stack

- React 19, Vite, TypeScript
- Uses `@repo/editor` for collaborative editing
- Yjs for real-time sync
