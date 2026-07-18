# Repository Guidelines

## Project Structure & Module Organization

This repository contains an Expo SDK 57 application built with React Native, React Native Web, and TypeScript. Work from the `Nuevo/` directory.

- `App.tsx` composes the shell (NavBar, ScrollView, Footer, FAB) and delegates routing to `src/navigation/`.
- `src/navigation/` owns routing: `routes.ts` (pure `ScreenName`/`Route` types plus hash↔route mapping) and `useHashNavigation.ts` (route state, history sync, scroll targets).
- `src/screens/` contains page-level views such as `HomeScreen.tsx` and `CatalogScreen.tsx`.
- `src/components/` contains reusable UI elements, cards, navigation, and forms.
- `src/data/content.ts` is the source of truth for brand copy, services, contact details, and FAQs; `src/data/catalog.ts` is the domain layer over the generated catalog (selectors, filtering, `toProductCardData`).
- `src/theme.ts` defines design tokens, including `textPresets` for repeated utility text styles.
- `src/hooks/` holds shared behavior: `useBreakpoint` (responsive), `useHover`/`useHoverKey` (web hover state), `useProductQuickView` (product modal selection).
- `src/utils/` holds pure helpers: `imageUrl.ts` (Cloudinary transforms), `links.ts` (`openExternalUrl`, the single place that opens external links).
- `assets/` stores local images and app icons; `public/` contains web-specific files.

See `ARQUITECTURA.md` for the layer rules and rationale.

There is currently no dedicated automated test directory.

## Build, Test, and Development Commands

Run commands inside `Nuevo/`:

```bash
npm install                  # Install dependencies
npm run web                  # Start Expo for web development
npm start                    # Start Metro for Expo Go
npm run ios                  # Open the iOS simulator
npm run android              # Open an Android emulator/device
npx tsc --noEmit             # Run strict TypeScript validation
npx expo export --platform web  # Produce the static web build in dist/
```

## Coding Style & Naming Conventions

Use TypeScript, functional React components, two-space indentation, single quotes, and trailing commas in multiline structures. Name components and screens in PascalCase (`ProductCard.tsx`), hooks in camelCase with a `use` prefix, and constants in uppercase when module-wide.

Keep content separate from presentation. Reuse `Section`, `Card`, `Button`, and related primitives before creating alternatives. Use tokens from `src/theme.ts` instead of hardcoded colors or spacing. Interactive elements require accessible roles, labels, and a minimum 48 px touch target. Build mobile-first and verify phone, tablet, and desktop layouts.

## Testing Guidelines

No test runner or coverage requirement is configured. Every change must pass `npx tsc --noEmit` and the relevant Expo export. Visually test navigation, forms, horizontal carousels, hover states on web, and layouts near 390, 768, and 1280 px. If tests are introduced, use `*.test.tsx` beside the component or under `src/__tests__/`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `Refactors sections`. Keep commits focused and avoid committing `node_modules/`, `.expo/`, or generated `dist/` files. Pull requests should explain the user-facing change, list validation commands, link relevant issues, and include before/after screenshots for visual or responsive work.

## Agent-Specific Instruction

Before changing Expo APIs, consult the exact SDK 57 documentation at `https://docs.expo.dev/versions/v57.0.0/`.
