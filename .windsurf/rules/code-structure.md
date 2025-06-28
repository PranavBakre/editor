---
trigger: always_on
---

# Windsurf Code Structure Rules

## 1. Frontend (`apps/web`)

- **Root Structure**

  - `README.md`: Documentation for the frontend application.
  - `package.json`: Project dependencies and scripts.
  - `tsconfig*.json`: TypeScript configuration files.
  - `vite.config.ts`: Vite build tool configuration.
  - `.env`, `.gitignore`, `.vscode/`, `.turbo/`, `.wrangler/`: Environment, git, and tool-specific configs.
  - `dist/`: Build output directory.
  - `public/`: Static assets (e.g., images, favicon).
  - `src/`: Main source code for the frontend.

- **`src/` Directory**

  - Contains all application source code, including:
    - `modules/`: Feature modules (e.g., room, user, etc.).
    - `routes/`: Route definitions (e.g., `index.tsx`).
    - `components/`: Reusable UI components.
    - `style.css`: Global or module-specific styles.
    - Other directories/files as needed for state management, hooks, utilities.

- **Build & Tooling**
  - Uses Vite for development/build.
  - TypeScript for type safety.
  - Organized as a modern modular frontend app.

---

## 2. Backend (`apps/backend`)

- **Root Structure**

  - `README.md`: Documentation for the backend application.
  - `package.json`: Backend dependencies and scripts.
  - `tsconfig.json`: TypeScript configuration.
  - `.gitignore`, `.wrangler/`: Git and deployment config.
  - `src/`: Main backend source code.

- **`src/` Directory**

  - Contains all backend logic, such as:
    - `index.ts` or similar entry point.
    - API route handlers, controllers, services, and models.
    - Utility functions and middlewares.

- **Deployment**
  - Uses Wrangler for deployment configuration (Cloudflare Workers or similar).
  - TypeScript for backend code.

---

## 3. Monorepo Structure

- **`apps/`**: Contains main applications (frontend and backend).
- **`packages/`**: Shared libraries, configs, or utilities (e.g., `editor`, `eslint-config`, `typescript-config`).
- **`node_modules/`**: Managed at the root for all packages (monorepo).
- **`pnpm-workspace.yaml`**: Defines workspace structure for pnpm.
- **`turbo.json`**: Turborepo configuration for monorepo task orchestration.

---

## 4. General Conventions

- All code is TypeScript-first.
- Shared code lives in `packages/`.
- Each app/package has its own `README.md` and config files.
- Use environment files and deployment configs as needed for each app.
