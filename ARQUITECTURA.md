# Arquitectura — Florería Valeria

Referencia de la organización modular del proyecto tras la refactorización de julio de 2026. El objetivo: separar responsabilidades por capas sin cambiar ni un píxel del comportamiento.

## Capas y regla de dependencia

Las dependencias solo apuntan hacia abajo:

```
screens/  ──►  components/  ──►  hooks/ · theme.ts
   │                │
   └────────┬───────┘
            ▼
        navigation/ (tipos de ruta)
            ▼
        data/ (catalog.ts ──► productsData.ts, categories.ts, content.ts)
            ▼
        utils/ (imageUrl.ts, links.ts — puros, sin React)
```

- **`utils/`** — funciones puras sin React ni estado. `links.ts` es el único punto que abre enlaces externos (`openExternalUrl`); si mañana se quiere analítica o manejo de errores, se toca un solo archivo.
- **`data/`** — datos generados (`productsData.ts`, `categories.ts`) + contenido editorial (`content.ts`) + **capa de dominio** `catalog.ts`: catálogo completo (`ALL_CATALOG`), conteos por categoría/subcategoría, filtrado con búsqueda sin acentos (`filterCatalog`) y el mapeo único `toProductCardData`. Las pantallas nunca recombinan datos crudos.
- **`navigation/`** — `routes.ts` es puro (tipos `ScreenName`/`Route` y hash↔ruta, testeable sin React); `useHashNavigation.ts` encapsula el estado de ruta, la history API, `popstate` y el scroll a secciones (`favorites`, `faq`). `data/content.ts` re-exporta `ScreenName` por compatibilidad.
- **`theme.ts`** — única fuente de tokens. Incluye `textPresets` (`kicker`, `badge`) para estilos tipográficos utilitarios repetidos; los estilos locales solo añaden márgenes/alineación.
- **`hooks/`** — comportamiento compartido: `useBreakpoint` (responsive), `useHover`/`useHoverKey` (hover web de uno o varios elementos), `useProductQuickView` (selección e índices del modal de producto con límites prev/next).
- **`components/`** — UI reutilizable y "tonta": recibe datos ya mapeados (`ProductCardData`) y callbacks. `ProductCard` re-exporta `ProductCardData` desde `data/catalog.ts`.
- **`screens/`** — composición de secciones por página; delegan datos a `data/`, comportamiento a `hooks/` y navegación al callback `onNavigate`.

## Decisiones clave

1. **`App.tsx` es solo composición.** Todo el routing por hash vive en `src/navigation/`; añadir una ruta = editar `routes.ts` (+ registrar la pantalla en `SCREENS`).
2. **Un solo mapeo producto→card.** `toProductCardData` reemplaza los duplicados que había en `CatalogScreen` y `favorites.ts`; imagen optimizada de Cloudinary y badge de categoría se resuelven en un solo lugar.
3. **Estado de UI repetido → hooks.** El patrón hover (8 componentes) y la vista rápida del modal (2 pantallas) se declararon una vez.
4. **Efectos centralizados.** Abrir WhatsApp/teléfono/mapas pasa por `openExternalUrl`.

## Validación

Cada cambio debe pasar:

```bash
npx tsc --noEmit
npx expo export --platform web
```
