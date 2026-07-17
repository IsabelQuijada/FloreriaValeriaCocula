# Florería Valeria 🌸

Aplicación multiplataforma (iOS, Android y Web) de **Florería Valeria**, florería artesanal con más de 20 años de historia en el corazón de Cocula, Jalisco. Ofrece arreglos florales hechos a mano, flores frescas, plantas y detalles para toda ocasión: bodas, XV años, eventos religiosos y condolencias, con entrega a domicilio en todo el municipio.

## Objetivo del proyecto

Dar presencia digital moderna a la florería: mostrar el catálogo de productos, los servicios para eventos, la galería de trabajos y los datos de contacto reales (sucursales, teléfono, WhatsApp y redes sociales), con una experiencia elegante, cálida y accesible en cualquier tamaño de pantalla.

## Tecnologías

- [Expo](https://expo.dev) SDK 57
- React Native 0.86 + React 19
- `react-native-web` (soporte web)
- TypeScript 6 (modo `strict`)
- `@expo/vector-icons` (iconografía)

No usa librerías de navegación ni de estilos adicionales: la navegación es un estado simple en `App.tsx` y los estilos usan `StyleSheet` con un sistema propio de design tokens.

## Requisitos previos

- Node.js 20 o superior
- npm
- Para probar en dispositivo: la app [Expo Go](https://expo.dev/go), o un emulador de Android / simulador de iOS

## Instalación

```bash
cd Nuevo
npm install
```

## Variables de entorno

Este proyecto **no requiere variables de entorno**. Todo el contenido es estático y vive en `src/data/content.ts`.

## Ejecutar en local

```bash
npm run web       # abre la versión web en el navegador
npm start         # inicia Metro; escanea el QR con Expo Go
npm run android   # abre en emulador/dispositivo Android
npm run ios       # abre en simulador de iOS (solo macOS)
```

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo de Expo |
| `npm run web` | Desarrollo en navegador |
| `npm run android` | Desarrollo en Android |
| `npm run ios` | Desarrollo en iOS |
| `npx tsc --noEmit` | Type check del proyecto |
| `npx expo export --platform web` | Build de producción web (genera `dist/`) |

No hay linter ni suite de tests configurados (ver *Mejoras futuras*).

## Build de producción

```bash
npx expo export --platform web
```

Genera el sitio estático en `dist/`, listo para servirse desde cualquier hosting estático. Para builds nativos se usa [EAS Build](https://docs.expo.dev/build/introduction/) (no configurado en este repo).

## Estructura de carpetas

```
Nuevo/
├── App.tsx                  # Raíz: navegación por estado + NavBar/Footer
├── index.ts                 # Registro del componente raíz (Expo)
├── app.json                 # Configuración de la app (nombre, iconos)
├── assets/                  # Iconos y splash de la app
├── public/
│   └── index.html           # Plantilla HTML web (lang="es", meta description)
└── src/
    ├── theme.ts             # ⭐ Design tokens (única fuente de estilos)
    ├── hooks/
    │   └── useBreakpoint.ts # Breakpoints responsive (tablet / desktop)
    ├── data/
    │   └── content.ts       # Marca, productos, servicios, FAQ, contacto
    ├── components/          # Componentes reutilizables
    │   ├── Button.tsx       # Botón (primary / outline / soft)
    │   ├── Card.tsx         # Superficie base de todos los cards
    │   ├── CardGrid.tsx     # Grid fluido con wrap
    │   ├── FeatureCard.tsx  # Card de servicio/valor (icono + textos)
    │   ├── FormField.tsx    # Label + TextInput accesible
    │   ├── Notice.tsx       # Avisos de éxito/error/advertencia
    │   ├── Section.tsx      # Contenedor de sección (ritmo + maxWidth)
    │   ├── SectionTitle.tsx # Encabezado de sección
    │   ├── NavBar.tsx       # Navegación principal + ribbon social
    │   ├── Footer.tsx       # Pie con contacto y redes reales
    │   ├── ProductCard.tsx  # Card de producto
    │   └── TestimonialCard.tsx
    └── screens/             # Una pantalla por vista (Home, Shop, …)
```

## Arquitectura de componentes

- **Presentación vs. datos**: todo el contenido (textos, productos, contacto) vive en `src/data/content.ts`; los componentes solo reciben props. Cambiar un precio o un teléfono no toca ningún componente.
- **Composición**: las pantallas se arman con `Section` → `SectionTitle` → `CardGrid` → cards. Los cards concretos (`ProductCard`, `FeatureCard`, `TestimonialCard`) se apoyan en la superficie común `Card`.
- **Convención**: componentes con responsabilidad única, nombrados por lo que muestran, con props tipadas e interfaces explícitas.

### Cómo crear o reutilizar componentes

1. Si el elemento es una superficie con borde/sombra, componlo sobre `Card`.
2. Si aparece en 2+ pantallas o tiene lógica propia, extráelo a `src/components/`.
3. Usa siempre tokens de `src/theme.ts` — ningún color, tamaño o espaciado hardcodeado.
4. Añade `accessibilityRole`/`accessibilityLabel` a todo elemento interactivo.

## Sistema de design tokens

`src/theme.ts` centraliza:

- **Colores**: paleta de marca (verde salvia `primary`, rosa empolvado `accent`, marfil `background`, champagne), texto, bordes, estados semánticos (éxito/error/advertencia), estados interactivos (foco, disabled, overlay).
- **Tipografía**: `fonts` (serif decorativa para encabezados), `fontSizes`, `lineHeights`, `fontWeights`, `letterSpacing`.
- **Espaciado**: escala `xxs`–`xxl` (2–64).
- **Bordes**: `radius`, `borderWidth`.
- **Sombras**: niveles `sm`/`md`/`lg` (iOS/web + `elevation` Android).
- **Layout**: `contentMaxWidth`, `textMaxWidth`, gutters, breakpoints y área táctil mínima (44 px).

## Estrategia responsive

Mobile-first con tres mecanismos:

1. **Grids fluidos**: `CardGrid` + `flexWrap` y `flexBasis`/`maxWidth` en los cards — las columnas se forman solas según el ancho, sin media queries.
2. **`useBreakpoint()`**: hook sobre `useWindowDimensions` con dos cortes (`tablet` ≥ 768, `desktop` ≥ 1120) para los pocos casos que necesitan cambiar de layout (NavBar en 1 o 2 filas, tamaño del hero, ritmo vertical de secciones).
3. **Contenido acotado**: `Section` centra todo a `contentMaxWidth` (1160 px) y los bloques de texto a `textMaxWidth` (640 px), evitando líneas ilegibles en pantallas grandes. El menú de navegación usa scroll horizontal en pantallas angostas, sin overflow.

## Accesibilidad

- Roles (`button`, `link`, `header`, `alert`, `tab`) y labels en todos los elementos interactivos.
- Estados anunciados: `accessibilityState` en tabs de filtro, FAQ expandible y botones disabled.
- Área táctil mínima de 44 px en botones, chips, items de menú y campos.
- Labels visibles y asociados en el formulario de contacto.
- Textos alternativos en todas las imágenes; iconos decorativos ocultos al lector de pantalla.
- Contraste verificado en la paleta (texto principal ≈ 13:1, secundario ≥ 4.5:1 sobre marfil).

## Testing

No hay tests automatizados actualmente. La verificación se hace con `npx tsc --noEmit` y el build de producción. Recomendado a futuro: Jest + React Native Testing Library.

## Despliegue

No hay pipeline de despliegue configurado en este proyecto. El resultado de `npx expo export --platform web` (`dist/`) puede publicarse en cualquier hosting estático (GitHub Pages, Netlify, Vercel).

## Decisiones técnicas

- **Navegación por estado** en lugar de React Navigation: la app es un sitio de una sola jerarquía con 8 vistas; un `Record<ScreenName, Component>` es suficiente y evita una dependencia pesada.
- **Datos reales de la marca** (direcciones, teléfono, WhatsApp, redes) tomados del sitio web en producción de Florería Valeria.
- **El formulario de contacto es local**: valida y muestra confirmación, pero no envía a ningún backend (no existe). El aviso dirige al usuario a WhatsApp para atención inmediata.
- **Imágenes de Unsplash** como placeholders del catálogo hasta contar con fotografías propias de los productos.

## Mejoras futuras recomendadas

1. Reemplazar las imágenes de Unsplash por fotos reales de los arreglos.
2. Conectar el formulario de contacto a un backend o abrir WhatsApp con el mensaje prellenado.
3. Configurar ESLint + Prettier y una suite de tests (Jest + RNTL).
4. Añadir React Navigation con deep links si crece el número de vistas (URLs por pantalla en web).
5. Cargar una fuente serif propia (p. ej. Playfair Display) con `expo-font` para unificar la tipografía de marca en las tres plataformas.
6. Regenerar los iconos de la app (`assets/`) con el logotipo real de Florería Valeria.
7. Añadir metadatos Open Graph e imagen social a `public/index.html`.
