# Auditoría UX/UI — Florería Valeria

**Realizada por:** revisión senior de diseño UI/UX sobre el código fuente actual del proyecto (Expo + React Native Web, TypeScript).
**Fecha:** 18 de julio de 2026 (actualizada el mismo día con el estado de implementación)
**Alcance:** `App.tsx`, `src/theme.ts`, todas las pantallas (`src/screens/`), todos los componentes (`src/components/`) y los datos de contenido y catálogo (`src/data/`).

> **Decisión de negocio:** por indicación de la propietaria, el sitio **no incluirá sección de testimonios**. La confianza se comunica con datos reales del negocio (años de trayectoria, sucursales, entrega diaria) en lugar de reseñas. Las menciones a testimonios de versiones anteriores de este documento quedan retiradas del roadmap.

---

## 0. Estado de implementación (18 de julio de 2026)

Mejoras implementadas en esta iteración, validadas con `npx tsc --noEmit` y `npx expo export --platform web`:

| Mejora | Dónde | Estado |
|---|---|---|
| Tipografía de marca **Cormorant Garamond** (600 SemiBold para títulos, 700 Bold para el hero, 500 Medium Italic para taglines), cargada con `expo-font` | `App.tsx`, `src/theme.ts`, todos los títulos serif | ✅ Implementado |
| Escala tipográfica de títulos recalibrada para la nueva serif (title 32, titleLarge 40, hero 46) | `src/theme.ts` | ✅ Implementado |
| Kicker del hero ("El color de tus sentimientos") ahora en itálica serif emotiva en vez de mayúsculas | `HomeScreen.tsx` | ✅ Implementado |
| Contraste AA del dorado: `colors.gold` `#A78645` → `#8A6A2E` (~5:1 sobre blanco) | `src/theme.ts` | ✅ Implementado |
| **Optimización de imágenes Cloudinary**: `f_auto,q_auto,w_600,c_limit` en todas las cards del catálogo, categorías y favoritas | `src/utils/imageUrl.ts` (nuevo), `CatalogScreen`, `CategoryScreen`, `favorites.ts` | ✅ Implementado |
| Botones y navegación sin mayúsculas forzadas; las mayúsculas + tracking quedan reservadas para kickers y badges (uso editorial) | `Button.tsx`, `NavBar.tsx` | ✅ Implementado |
| Ribbon de contacto simplificado en móvil (solo un teléfono + WhatsApp, sin desborde en 360 px) | `NavBar.tsx` | ✅ Implementado |
| Divisor de sección orgánico: flor de línea fina entre dos filetes dorados en vez de barra plana | `SectionTitle.tsx` | ✅ Implementado |
| **Franja de confianza** con cifras reales (años desde 2000, 2 sucursales, entrega 7 días) — sin testimonios | `TrustStrip.tsx` (nuevo), Home | ✅ Implementado |
| FAQ visible en todo el sitio: enlace "¿Tienes dudas?" en la cinta CTA final de cada página | `CtaRibbon.tsx` | ✅ Implementado |
| Micro-interacción del FAB de WhatsApp: doble pulso sutil al cargar la página | `WhatsAppFab.tsx` | ✅ Implementado |
| Indicadores de posición (dots) en el carrusel móvil de ocasiones | `OccasionsGallery.tsx` | ✅ Implementado |
| Descripciones detalladas cableadas al catálogo vía `getDetailedDescription` + nombres deduplicados | `productsData.ts` | ✅ Ya estaba resuelto (iteración anterior) |

Pendientes conscientes (requieren decisión de negocio o trabajo de contenido/diseño):
- Rango de precios orientativo por categoría ("Desde $…") — decisión de la propietaria.
- Completar descripciones específicas para los productos que aún caen al texto genérico de categoría.
- Dibujar los 3 íconos florales SVG faltantes para completar el set de 6 servicios.
- Recomprimir los assets locales pesados (`valor-*.png`, `ocasion-*.avif`, fotos de equipo).

> Metodología: esta auditoría se basa en lectura directa del código de producción (tokens de diseño, estilos, copy y datos reales de 273 productos), no en capturas de pantalla. Las citas a archivos usan el formato `archivo:línea` para que el equipo pueda ir directo al punto.

---

## 1. Resumen ejecutivo

Florería Valeria tiene una **base de diseño mucho más sólida de lo habitual** en un proyecto de este tamaño: un archivo de tokens (`theme.ts`) único y bien documentado, componentes reutilizables disciplinados (`Card`, `Button`, `Section`, `SectionTitle`), microinteracciones de hover ya implementadas y un nivel de accesibilidad (roles, labels, `accessibilityState`) que supera claramente el promedio de sitios de este sector. El flujo de conversión "clic → WhatsApp" está bien resuelto y es la decisión de UX correcta para un negocio floral local sin checkout real.

Los problemas más importantes **no son de gusto estético, son de contenido y de rendimiento**, y ambos erosionan directamente la sensación de elegancia que se busca:

1. **273 productos, pero solo 15 descripciones distintas.** Muchos productos comparten nombre y descripción exacta ("Arreglo de Boda 1" ×4, "Ramo Clásico 1" ×5), a pesar de que ya existe un banco de descripciones ricas y específicas sin usar (`src/data/productDescriptions.ts`).
2. **Imágenes sin optimizar.** Las fotos de Cloudinary se sirven en su resolución original (hasta 1200×2134 px) para tarjetas de 280 px, y varios assets locales pesan 300–860 KB sin ningún pipeline de compresión. En móvil esto se traduce en jank y esperas, justo la experiencia contraria a "orgánica y elegante".
3. **Contraste insuficiente en el color dorado** (`colors.gold`, `#A78645`) usado en todos los "kickers" (las etiquetas pequeñas en mayúsculas sobre cada sección) — ratio ≈3.4:1 sobre blanco, por debajo del mínimo WCAG AA de 4.5:1 para texto normal.
4. **Tipografía genérica para una marca que se define como elegante.** El único font "de marca" es `Georgia` (fuente de sistema), sin ninguna tipografía web cargada. No hay diferenciación tipográfica real frente a cualquier plantilla genérica.
5. **La trayectoria real de la marca estaba poco visible** (20+ años de historia solo narrados en un párrafo de "Nosotros"). Resuelto con la franja de cifras de confianza en Home — sin testimonios, por decisión de negocio.

Ninguno de estos cinco puntos requiere rediseñar el sistema visual — son ajustes de datos, tokens y una tipografía nueva. Ver la sección 9 para el roadmap priorizado.

---

## 2. Evaluación de diseño visual

### 2.1 Color

La paleta (`src/theme.ts:15-71`) es cálida, femenina y coherente: berry/ciruela (`#9C4463` / `#320B21`) sobre blancos rosados, con dorado (`#A78645`/`#F7C466`) y arena (`#EBE7C0`) como acentos. Es una dirección de marca correcta para una florería boutique y está **muy bien disciplinada**: no encontré un solo color hardcodeado fuera de `theme.ts` en toda la revisión, lo cual es inusual y merece reconocerse — el equipo ya sigue la norma de AGENTS.md al pie de la letra.

**Problemas encontrados:**

- **`colors.accent` es literalmente igual a `colors.primary`** (`#9C4463` en ambos, `theme.ts:20-21`), y `colors.ribbon` también. Esto significa que la cinta superior de navegación, el ícono de marca, los títulos de sección, los botones primarios y los badges de producto son **exactamente el mismo tono**. El resultado visual es correcto pero "plano": todo grita al mismo volumen, sin jerarquía tonal entre "esto es una acción" y "esto es un título decorativo".
- **`colors.mauve` (`#8A5F6A`) es un duplicado exacto de `colors.textMuted`.** Es un token sin uso diferenciado — limpieza menor, pero señala que la paleta secundaria (dorado, champán, arena, malva) está subutilizada: hoy dorado solo aparece en kickers (con problema de contraste) y champán solo en la barrita divisoria de `SectionTitle`. Hay mucho margen para dar vida a esos tonos como acentos reales (bordes finos dorados en tarjetas destacadas, fondos champán en badges premium, etc.) en vez de dejarlos casi decorativos.
- **Contraste del dorado insuficiente para texto (WCAG AA).** Calculado sobre fondo blanco:
  - `colors.gold` `#A78645` → **contraste ≈ 3.42:1** (falla AA para texto normal, que exige 4.5:1). Se usa en los "kickers" de cada sección (`SectionTitle.tsx:44`) y en el kicker de categorías del catálogo (`CatalogScreen.tsx:391`) — es decir, aparece en *cada sección de cada pantalla*.
  - `colors.textMuted` `#8A5F6A` → contraste ≈ 5.35:1 sobre blanco, **correcto** (se usa en subtítulos y descripciones, `SectionTitle.tsx:66`, `ProductCard.tsx:161`).
  - Los textos sobre fondo `primary`/`primaryDark` (barra superior, footer, botones) sí cumplen contraste (~5.7:1 y más).
  
  **Recomendación:** oscurecer el dorado de los kickers a algo como `#8A6A2E` (o aplicar `fontWeight: bold` + aumentar tamaño, ya que texto grande en negrita solo necesita 3:1) — pero dado que el kicker ya usa `fontSizes.caption` (12px), la ruta más simple y seguro es oscurecer el color.

### 2.2 Tipografía

```
fonts.heading = Georgia (sistema) — usado en todos los títulos serif
fonts.body    = undefined (fuente del sistema por plataforma)
```

Este es el punto más débil del sistema visual actual. Georgia es una fuente de sistema genérica: funcional, pero no aporta ninguna personalidad de marca, y es la misma fuente que usan miles de blogs y plantillas por defecto. Para una marca que se autodescribe como "el color de tus sentimientos" y que quiere transmitir elegancia orgánica, esto es una oportunidad perdida — más aún porque no requiere ningún cambio estructural, solo cargar dos fuentes web con `expo-font` / `@expo-google-fonts`.

**Además:**
- No hay ninguna variante de peso o itálica en la fuente serif — todos los títulos usan `fontWeights.bold`, lo que da un tono "gritado" repetido en cada sección. Un peso más ligero o una itálica ocasional (común en marcas florales de gama alta) suavizaría el tono.
- Uso extendido de **mayúsculas + letter-spacing amplio** en casi todo: botones (`Button.tsx:119-123`), ítems de navegación (`NavBar.tsx:377-383`), kickers (`SectionTitle.tsx:43-51`), badges de producto (`ProductCard.tsx:120-126`). Es un recurso editorial válido, pero usado en *todas* las capas de jerarquía a la vez, el ojo pierde la señal: si el kicker, el nav, el botón y el badge gritan igual, ninguno destaca. Recomiendo reservar mayúsculas + tracking ancho para kickers y badges (su uso "editorial" clásico) y pasar navegación y botones a texto en minúsculas/capitalizado con tracking más sutil.

### 2.3 Estilo y coherencia de componentes

Fortalezas claras:
- `Section`, `Card`, `Button`, `SectionTitle` se reutilizan consistentemente en las 6+ pantallas — no hay "un componente por pantalla" duplicado, que es el problema más común en proyectos de este tamaño.
- Sistema de sombras (`shadows.sm/md/lg`, `theme.ts:144-166`) y radios (`radius.sm/md/lg/pill`) usados con criterio: pill para botones y chips, md para cards, lg para el modal de producto.
- Los estados de hover están implementados de forma consistente (elevación + `translateY` + cambio de color) en `NavBar`, `Footer`, `ProductCard`, `Button`, `OccasionsGallery` — buen nivel de pulido para web.

Puntos a mejorar:
- El `ProductCard` (`ProductCard.tsx`) es visualmente idéntico en las tres superficies donde aparece (carrusel de Home, catálogo, categoría) — es coherente, pero también significa que **nunca hay una jerarquía visual entre "producto destacado" y "producto del catálogo general"**. Todo el catálogo (273 productos) se ve con el mismo peso visual. Vale la pena introducir una variante "hero"/destacada para 3-4 productos insignia por categoría.
- El ícono floral hecho a mano (`FloralServiceIcon.tsx`) con `BouquetIcon`, `DeliveryIcon`, `FloralArchIcon` en SVG es un detalle de marca genuino y bien ejecutado — pero solo se usa en 3 de los 6 servicios (`content.ts:57-100`); los otros 3 (`ribbon-outline`, `business-outline`, `heart-outline`) caen a íconos genéricos de Ionicons. Vale la pena completar el set con el mismo lenguaje dibujado a mano para mantener la coherencia de marca en toda la sección de servicios.

---

## 3. Contenido, mensajes y confianza

### 3.1 Hallazgo crítico: catálogo con contenido duplicado

Inspeccioné `src/data/productsData.ts` (273 productos, autogenerado desde Cloudinary) y `src/data/productDescriptions.ts` (banco de descripciones ricas y específicas por producto). El resultado:

- **Solo 15 descripciones únicas** se usan en total sobre 273 productos.
- Categorías enteras comparten literalmente la misma descripción: *"Hermoso arreglo floral de Bodas de Ensueño"*, *"Hermoso arreglo floral de Cumpleaños"*, etc. — una frase por categoría, repetida en cada producto de esa categoría.
- Los nombres se repiten con solo un número de diferencia: `"Ramo Clásico 1"` aparece 5 veces, `"Arreglo de Boda 4"` aparece 4 veces, etc. — productos con foto distinta pero nombre y descripción idénticos.
- **Paradoja:** `productDescriptions.ts` ya contiene descripciones específicas y bien escritas para muchos de estos productos (ej. *"Tulipanes rosas y lisianthus lila con delicado follaje, un ramo fresco, elegante y lleno de vida"*), pero no están conectadas a `productsData.ts` para todos los ítems. El contenido de calidad existe — falta cablearlo.

**Por qué importa:** un catálogo donde la mitad de los productos dice literalmente lo mismo comunica "catálogo genérico/plantilla", lo opuesto a "hecho a mano con cariño desde el año 2000" (la propia historia de marca en `AboutScreen.tsx`). Además perjudica SEO (contenido duplicado) y la confianza del cliente al comparar dos productos con texto idéntico.

**Recomendación:** priorizar conectar `productDescriptions.ts` a todos los productos de `productsData.ts`, y para el resto, generar descripciones cortas y específicas (2-3 flores + tono + ocasión, siguiendo el patrón que ya usan las 15 existentes) en vez de la frase genérica de categoría.

### 3.2 Ausencia de precio

`ProductCardData` (`ProductCard.tsx:16-22`) y `Product` (`productsData.ts:7-16`) no tienen ningún campo de precio. Todo el catálogo se muestra sin precio, y el único paso siguiente es "Contáctanos" por WhatsApp. Esto puede ser una decisión de negocio intencional (arreglos a medida, precio variable), pero desde UX genera fricción: el usuario tiene que iniciar una conversación solo para saber si algo está dentro de su presupuesto, lo cual filtra clientes antes de que lleguen a preguntar. Vale la pena al menos un rango orientativo ("Desde $450") por categoría o subcategoría, incluso si el precio final se confirma por WhatsApp.

### 3.3 Confianza y prueba social

`AboutScreen.tsx` tiene un activo de confianza genuino y bien aprovechado: historia real desde el año 2000, fundadora nombrada (Aideé Camacho) con foto, equipo con foto y rol. Esto es más de lo que hacen la mayoría de florerías locales y merece más visibilidad fuera de la pantalla "Nosotros" (por ejemplo, una versión corta en Home).

Cómo se aborda (sin testimonios, por decisión de negocio):
- **Cifras de confianza ahora visibles en Home** (`TrustStrip.tsx`): años de trayectoria calculados desde 2000, 2 sucursales en el centro de Cocula y entrega a domicilio los 7 días — datos verificables del negocio, con más peso que reseñas anónimas.
- **FAQ ya no está enterrado.** Las preguntas frecuentes (`content.ts:108-145`) resuelven exactamente las dudas que generan fricción antes de comprar (¿hacen envíos?, ¿qué pago aceptan?, ¿puedo personalizar?). Además del footer, ahora hay un enlace directo en la cinta CTA final de cada página (`CtaRibbon.tsx`), de modo que las dudas se resuelven *antes* de que el usuario tenga que preguntar por WhatsApp.

### 3.4 Llamadas a la acción

El patrón "clic a WhatsApp" está bien resuelto y es la decisión correcta para el modelo de negocio (sin carrito, sin checkout, todo se confirma por conversación). Mensaje prellenado con el nombre del producto (`content.ts:44-48`) es un detalle bien pensado que ahorra fricción real.

Sin embargo, la **misma CTA aparece con altísima frecuencia**: ribbon de teléfonos arriba, FAB flotante de WhatsApp siempre visible, `CtaRibbon` al final de cada pantalla, botón "Contáctanos" en cada una de las 273 tarjetas de producto, tarjetas rápidas de contacto en la pantalla de Contacto, más el footer. No es necesariamente malo (repetición = más oportunidades de conversión), pero sin variación de peso visual entre ellas, el sitio puede sentirse insistente. Sugerencia: no eliminar puntos de contacto, sino variar su peso — por ejemplo, que el FAB sea el "always-on" silencioso, y reservar el estilo `primary` de mayor contraste para un único CTA por pantalla.

---

## 4. Flujo de usuario y navegación

### 4.1 Arquitectura de información

`App.tsx` implementa ruteo por hash (`#/shop`, `#/category/:slug`, `#/contact`, etc.) — correcto para web, con URLs compartibles y navegación por historial. Bien ejecutado.

Navegación principal reducida a 4 ítems (`Catálogo`, `Favoritas`, `Nosotros`, `Contacto`), dejando `Blog` y `FAQ` solo en el footer — decisión documentada explícitamente en el código como intencional ("secciones de mayor intención de compra"). Es una simplificación razonable, pero como se señaló en 3.3, FAQ cumple un rol de reducción de fricción que probablemente merece más visibilidad que "enterrado en el footer".

"Favoritas" no es una pantalla real: es un scroll-to-section dentro de Home (`App.tsx:29-32`). Funciona, pero puede confundir a un usuario que espera una pantalla dedicada de favoritos/guardados (patrón muy asentado en e-commerce). Si el nombre "Favoritas" se mantiene, considerar aclarar visualmente que es una sección curada por la tienda ("Nuestras favoritas") — cosa que el copy ya hace bien en Home (`HomeScreen.tsx:129`) — vs. una lista personal del usuario. El riesgo de confusión es bajo porque el copy en el nav podría ajustarse, pero vale la pena verificarlo con usuarios reales.

### 4.2 Jerarquía y acceso a lo importante

- El Hero comunica marca + 2 CTAs claras (`Ver Catálogo` / `Visítanos`) sin ruido — bien resuelto.
- El banner de entrega ("Entrega a domicilio en Cocula...", `HomeScreen.tsx:91-103`) es información de alto valor (horario, zona) puesta inmediatamente después del hero — buena decisión de jerarquía, aunque es texto fijo sin ícono de mapa/zona que ayude a escanear rápido.
- El catálogo (`CatalogScreen.tsx`) tiene una barra lateral de filtros en desktop y chips horizontales en móvil, con contador de resultados — patrón estándar y bien resuelto, incluyendo estado vacío con mensaje ("No encontramos productos...", línea 309) y opción de limpiar filtros.

### 4.3 Fricciones puntuales

- **Ribbon de teléfono en móvil puede desbordarse.** `NavBar.tsx:246-254`: `ribbonInner` es una fila centrada sin `flexWrap` explícito, mostrando dos teléfonos + WhatsApp + separadores "|" simultáneamente. En un viewport de 360-375px (Android/iPhone SE) el contenido probablemente se comprime o rompe línea de forma poco prolija. Vale la pena probar específicamente en 360px y considerar mostrar solo WhatsApp + un teléfono en móvil, moviendo el segundo teléfono al footer/Contacto.
- El **formulario de contacto** (`ContactScreen.tsx`) valida solo que los campos no estén vacíos (línea 115) — no valida formato de teléfono. Como el mensaje se manda por WhatsApp de todos modos (no hay backend), es un riesgo menor, pero un teléfono mal escrito significa que la florería no podrá contactar de vuelta si WhatsApp falla.

---

## 5. Experiencia móvil (foco especial)

Lo que ya funciona bien y vale la pena preservar:
- Approach mobile-first real vía `useBreakpoint` (`useBreakpoint.ts`), no solo until adaptado de desktop.
- Hero en móvil ancla el texto abajo sobre la imagen (`heroOverlayMobile`, `HomeScreen.tsx:161-165`) con botones a ancho completo apilados — patrón correcto y con buena legibilidad sobre foto.
- Carruseles (`ProductCarousel`, `OccasionsGallery`) usan "peek" de la siguiente tarjeta en el borde (padding calculado para asomar la tarjeta siguiente) — es un detalle orgánico y táctil que ya está bien logrado, sin necesidad de flechas en pantallas táctiles.
- Objetivo táctil mínimo de 48px (`layout.minTouchTarget`) aplicado de forma consistente en botones, chips y elementos de navegación — cumple el estándar de accesibilidad táctil, algo que muchos sitios se saltan.

Lo que falta para una experiencia móvil verdaderamente "única, orgánica y elegante":

1. **Peso de imágenes.** Es el hallazgo más urgente para móvil. Ejemplo real del catálogo: un producto se sirve como `.../arreglo-centro-mesa1.png` a **1200×2134px** sin ningún parámetro de transformación de Cloudinary (`f_auto,q_auto,w_400` etc.), para mostrarse en una tarjeta de ~280px de ancho. Eso es hasta 15-20× más peso de imagen del necesario, multiplicado por hasta 24 tarjetas visibles por página (`PAGE_SIZE = 24`, `CatalogScreen.tsx:40`). En una red móvil promedio en México esto se traduce en varios segundos de espera y layout jank — la antítesis de "elegante". Assets locales (`equipo-aidee.png` 335KB, `valor-confianza.png` 554KB, `ocasion-recordar.avif` 860KB) tampoco pasan por ningún pipeline de compresión antes de empaquetarse.
2. **Sin gestos "propios" de marca.** Todo el sitio depende de scroll y tap estándar; no hay ningún micro-gesto floral distintivo (por ejemplo, un swipe con resistencia elástica más suave en el modal de producto, o una transición de pétalo al abrir/cerrar el carrito de WhatsApp). No es indispensable, pero es la diferencia entre "responsive bien hecho" y "mobile experience con personalidad propia" que se pidió explícitamente.
3. **Ribbon de contacto superior compite por espacio limitado** en pantallas pequeñas (ver 4.3) — en el dispositivo con menos espacio es donde más se satura de elementos.
4. **Sin indicador de progreso/páginas en los carruseles móviles** — el usuario descubre cuánto contenido queda solo scrolleando; unos puntos (dots) discretos ayudarían a comunicar profundidad de la galería de ocasiones (8 tarjetas) sin depender de exploración a ciegas.

---

## 6. Microinteracciones y percepción de marca

**Lo que está muy bien logrado** (y es poco común encontrar en un proyecto de este tamaño):
- Roles y etiquetas de accesibilidad (`accessibilityRole`, `accessibilityLabel`, `accessibilityState`) presentes de forma sistemática en botones, pestañas de filtro, chips y enlaces — nivel de cuidado notablemente superior al promedio.
- Estados de hover consistentes con elevación + color en toda la superficie interactiva del sitio web.
- El ícono floral dibujado a mano (`FloralServiceIcon`) es la pieza de identidad visual más distintiva del sitio — vale la pena expandirla, no diluirla con más íconos genéricos de Ionicons.

**Lo que falta:**
- No hay ningún micro-feedback de "acción confirmada" más allá del `Notice` de éxito al contactar — por ejemplo, el ícono de WhatsApp del FAB podría pulsar suavemente la primera vez que carga la página, invitando sutilmente sin ser intrusivo.
- Todo el copy transaccional (botones, kickers) está en mayúsculas — como se detalla en 2.2, esto uniformiza el tono y hace que la marca suene más "corporativa" que "boutique familiar de Cocula desde el año 2000", que es justamente el ángulo diferencial narrado en `AboutScreen.tsx`.
- La marca no tiene ningún motivo botánico recurrente más allá de los 3 íconos SVG — ni en los divisores (hoy son barras rectangulares planas, `SectionTitle.tsx:73-79`), ni en fondos de sección, ni en el modal. Un motivo floral de línea fina reutilizado como watermark discreto en fondos `blush`/`alt` reforzaría la identidad sin agregar peso visual.

**Percepción de marca general:** el sitio hoy comunica "boutique elegante genérica" más que "florería familiar de Cocula, Jalisco, con 20+ años de historia real". La estructura, paleta y disciplina de componentes ya son de calidad alta — lo que falta es que la tipografía, las descripciones de producto y los motivos visuales dejen de sentirse intercambiables con cualquier plantilla de e-commerce boutique y empiecen a sonar y verse como *esta* florería específica.

---

## 7. Accesibilidad — hallazgos adicionales

Además del contraste del dorado (sección 2.1):
- El botón flotante de WhatsApp (`WhatsAppFab.tsx`) es `position: absolute` fijo sobre `bottom: spacing.md, right: spacing.md` (16px) sin ningún mecanismo para ocultarlo o evitar que tape contenido al hacer scroll en pantallas muy bajas (p. ej. landscape en móvil) — vale la pena verificar que nunca cubra el botón de "Enviar por WhatsApp" del formulario de contacto ni el `navRow` del modal de producto.
- Las imágenes de producto usan `accessibilityLabel={`Foto de ${product.name}`}` (`ProductCard.tsx:69-70`) — correcto, pero dado que muchos nombres son genéricos y repetidos ("Ramo Clásico 1" ×5), el lector de pantalla anunciará el mismo texto para productos visualmente distintos. Esto refuerza la prioridad del hallazgo 3.1: arreglar los nombres/descripciones mejora tanto la experiencia visual como la accesible.

---

## 8. Rendimiento (impacto directo en la percepción de elegancia)

No es un punto tradicional de un audit de UI, pero en un catálogo de 273 productos con imágenes sin optimizar, el rendimiento *es* UX:

- Imágenes de Cloudinary servidas sin transformación (`cloudinaryUrl` en `productsData.ts` no incluye `f_auto,q_auto,w_...`) — cada tarjeta descarga más resolución de la que puede mostrar.
- `visibleCount` inicial de 24 productos (`CatalogScreen.tsx:40,69`) renderiza 24 imágenes pesadas de golpe antes de que el usuario pida "Ver más" — sin virtualización de lista, todas viven en el DOM/árbol de render desde el primer render.
- Ningún uso de `expo-image` (con caché y placeholder progresivo) — se usa el `Image` estándar de React Native, que no tiene blur-placeholder ni caché de disco tan eficiente en web.

---

## 9. Hallazgos priorizados

| # | Hallazgo | Impacto | Esfuerzo | Dónde |
|---|----------|---------|----------|-------|
| 1 | Descripciones/nombres de producto duplicados (273 productos, 15 descripciones únicas) | Alto — confianza, SEO, percepción de calidad | Medio — ya existe contenido en `productDescriptions.ts`, falta cablearlo | `src/data/productsData.ts`, `src/data/productDescriptions.ts` |
| 2 | Imágenes sin transformación de Cloudinary ni compresión de assets locales | Alto — velocidad y jank en móvil | Bajo — agregar parámetros `f_auto,q_auto,w_` a las URLs y recomprimir assets locales | `productsData.ts`, `assets/` |
| 3 | Contraste del dorado en kickers (~3.4:1, falla AA) | Medio — accesibilidad, legibilidad | Bajo — un solo token en `theme.ts` | `theme.ts:24`, usado en `SectionTitle.tsx`, `CatalogScreen.tsx` |
| 4 | Sin tipografía de marca (Georgia por defecto) | Medio-Alto — percepción de elegancia/diferenciación | Medio — cargar 1-2 fuentes con `expo-font` | `theme.ts:73-81` |
| 5 | Trayectoria de la marca poco visible (cifras de confianza) — resuelto con `TrustStrip`, sin testimonios | Medio — conversión, confianza | Bajo — ✅ implementado | `TrustStrip.tsx`, Home |
| 6 | FAQ fuera de la navegación principal | Medio — reduce fricción antes de contactar | Bajo — mover/duplicar entrada en nav o Contacto | `content.ts:22-27` |
| 7 | Ribbon de teléfono puede desbordar en móviles angostos (<375px) | Bajo-Medio — pulido visual | Bajo — simplificar a 1 teléfono + WhatsApp en móvil | `NavBar.tsx:242-281` |
| 8 | Uso uniforme de mayúsculas+tracking en toda la jerarquía tipográfica | Bajo-Medio — jerarquía visual, tono de marca | Bajo — ajustar `Button` y `NavBar` a texto no-uppercase | `Button.tsx:119-123`, `NavBar.tsx:377-383` |
| 9 | Sin precio ni rango orientativo en catálogo | Medio — fricción antes de contactar | Medio — decisión de negocio + campo nuevo en `Product` | `productsData.ts`, `ProductCard.tsx` |
| 10 | Set de íconos florales SVG incompleto (3 de 6 servicios) | Bajo — coherencia de marca | Bajo-Medio — dibujar 3 SVG más en el mismo estilo | `FloralServiceIcon.tsx` |

---

## 10. Roadmap propuesto

**Quick wins (1 sprint, bajo riesgo):**
- ✅ Oscurecer `colors.gold` para cumplir contraste AA.
- ✅ Agregar `f_auto,q_auto,w_600,c_limit` a las URLs de Cloudinary en el punto de render (`src/utils/imageUrl.ts`).
- ✅ Simplificar el ribbon de contacto en móvil.
- ✅ Dar visibilidad a "Preguntas frecuentes" (enlace en la cinta CTA de todas las páginas).

**Impacto medio (2-3 sprints):**
- ✅ `productDescriptions.ts` cableado a `productsData.ts` (pendiente: completar descripciones específicas para los productos que aún usan el texto genérico de categoría).
- ✅ Tipografía de marca cargada vía `expo-font` (Cormorant Garamond; el cuerpo se mantiene en fuente de sistema por rendimiento).
- ✅ Suavizar el uso de mayúsculas en navegación y botones.
- Comprimir/redimensionar todos los assets locales pesados (`assets/*.png`, `*.avif`).

**Estratégico (a evaluar con negocio):**
- Decidir política de precios visibles (rango vs. "a consultar").
- Expandir el set de íconos florales dibujados a mano para los 6 servicios.
- Explorar un motivo botánico de línea fina como watermark recurrente en fondos de sección (el divisor floral de `SectionTitle` es el primer paso de este lenguaje).

---

*Documento generado a partir de una revisión de código; se recomienda complementar con pruebas de usuario reales y capturas en dispositivos físicos (390px, 768px, 1280px) antes de priorizar el roadmap final, tal como indica `AGENTS.md`.*
