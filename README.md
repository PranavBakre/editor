# Editor Monorepo

A modern monorepo for collaborative editing, built with pnpm workspaces and Turbo. Contains a React+Vite web frontend, a Cloudflare Workers backend, and shared packages for editor UI, ESLint, and TypeScript configuration.

## Monorepo Structure

```
editor/
├── apps/
│   ├── backend/      # Cloudflare Worker backend (Hono, Yjs)
│   └── web/          # React + Vite frontend
├── packages/
│   ├── editor/       # Collaborative editor React component (Lexical, Yjs)
│   ├── eslint-config/# Shared ESLint config
│   └── typescript-config/ # Shared TypeScript config
├── package.json      # Monorepo scripts
├── pnpm-workspace.yaml
└── turbo.json        # Turbo pipeline config
```

## Getting Started

- **Install dependencies:**
  ```sh
  pnpm install
  ```
- **Run all apps/packages in dev mode:**
  ```sh
  pnpm dev
  ```
- **Build all apps/packages:**
  ```sh
  pnpm build
  ```

## Apps

### `apps/web`

- React 19 + Vite frontend
- Uses collaborative editor from `@repo/editor`
- See [`apps/web/README.md`](./apps/web/README.md)

### `apps/backend`

- Cloudflare Worker backend (Hono, Yjs, y-durableobjects)
- See [`apps/backend/README.md`](./apps/backend/README.md)

## Packages

### `packages/editor`

- Collaborative rich-text editor React component (Lexical, Yjs)
- See [`packages/editor/README.md`](./packages/editor/README.md)

### `packages/eslint-config`

- Shared ESLint config

### `packages/typescript-config`

- Shared TypeScript config

## Tooling

- **Turbo**: Fast monorepo builds
- **pnpm**: Workspaces and dependency management
- **ESLint**/**Prettier**/**TypeScript**: Quality and consistency

## Requirements

- Node.js >= 18
- pnpm >= 7
