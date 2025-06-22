# @repo/editor

A collaborative rich-text editor React component, built with [Lexical](https://lexical.dev/) and [Yjs](https://yjs.dev/) for real-time sync. Designed for integration in React apps requiring collaborative editing.

## Features
- Rich-text editing UI (Lexical-based)
- Real-time collaboration (Yjs, y-durableobjects)
- Customizable theme and plugins
- Collaboration plugin and feature system

## Usage
Import and use the `Editor` component:

```tsx
import { Editor } from '@repo/editor';

<Editor
  initialState={...}
  onError={...}
  onChange={...}
  editable={true}
  theme={...}
  placeholder={...}
  features={{
    collaboration: {
      id: 'room-id',
      providerFactory: ...,
      active: true,
      user: { username: 'user', cursorColor: '#fff', awareness: {} },
    }
  }}
/>
```

## API
- `Editor` — main collaborative editor component
- `CollaborationPlugin` — Yjs-powered plugin for multi-user editing
- `FeatureProvider` — context provider for feature system
- `createHeadlessEditor` — headless Lexical editor for server-side/automation

## Development
- Written in TypeScript, React 19
- See `src/` for implementation
- Run `pnpm lint` and `pnpm check-types` before submitting changes