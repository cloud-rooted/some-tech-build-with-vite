# Vite + React + TypeScript + TailwindCSS

A minimal, production-ready starter using:
- Vite 5
- React 18 with SWC plugin
- TypeScript (strict)
- TailwindCSS 3 + PostCSS
- ESLint 9

## Quickstart

```bash
pnpm i
pnpm dev
```

Or with npm / yarn:

```bash
npm i && npm run dev
# or
yarn && yarn dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Notes

- Aliases: `@/*` → `/src/*`
- Tailwind is configured in `tailwind.config.ts` and imported in `src/index.css`
- Adjust `server.port` in `vite.config.ts` if needed.
