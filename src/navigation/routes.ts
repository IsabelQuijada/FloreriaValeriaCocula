/**
 * Rutas de la aplicación.
 *
 * Módulo puro (sin React) que define los nombres de pantalla y la
 * traducción entre la ruta de la URL (History API) y la ruta interna.
 * Mantenerlo puro permite probarlo de forma aislada y reutilizarlo desde
 * cualquier capa.
 */

import { Platform } from 'react-native';

export type ScreenName = 'Home' | 'Shop' | 'About' | 'Blog' | 'FAQ' | 'Contact' | 'Favorites';

/**
 * Ruta actual. El catálogo puede recibir una categoría como filtro inicial.
 * 'Favorites' no es una pantalla: hace scroll a la sección de favoritas
 * dentro del Home.
 */
export type Route =
  | { name: Exclude<ScreenName, 'Favorites' | 'Shop'> }
  | { name: 'Shop'; categorySlug?: string };

/** Secciones dentro de una pantalla a las que se puede hacer scroll. */
export type ScrollTarget = 'favorites' | 'faq';

export type RouteResult = {
  route: Route;
  scrollTarget: ScrollTarget | null;
};

const parsePath = (path: string): RouteResult => {
  const parts = path.split('/').filter(Boolean);
  const [first, second] = parts;

  switch (first) {
    case 'catalogo':
      return {
        route: { name: 'Shop', categorySlug: second },
        scrollTarget: null,
      };
    case 'favoritos':
      return { route: { name: 'Home' }, scrollTarget: 'favorites' };
    case 'nosotros':
      return { route: { name: 'About' }, scrollTarget: null };
    case 'contacto':
      return { route: { name: 'Contact' }, scrollTarget: null };
    case 'faq':
      return { route: { name: 'Contact' }, scrollTarget: 'faq' };
    default:
      return { route: { name: 'Home' }, scrollTarget: null };
  }
};

export const getPathRoute = (): RouteResult => {
  if (Platform.OS !== 'web') {
    return { route: { name: 'Home' }, scrollTarget: null };
  }

  return parsePath(window.location.pathname);
};

export const buildPath = (route: Route, target?: ScrollTarget) => {
  if (target === 'faq') return '/faq';
  if (route.name === 'Home') {
    if (target === 'favorites') return '/favoritos';
    return '/';
  }

  if (route.name === 'Shop') {
    return route.categorySlug ? `/catalogo/${route.categorySlug}` : '/catalogo';
  }

  if (route.name === 'About') return '/nosotros';
  if (route.name === 'Contact') return '/contacto';

  return '/';
};

/**
 * Traduce el esquema de hash anterior (`#/shop`, `#/about`, previo a la
 * migración a URLs limpias en español) a la nueva ruta. Se usa una sola vez,
 * al cargar la app, para no romper enlaces ya compartidos o indexados con
 * el esquema anterior.
 */
const parseLegacyHash = (hash: string): RouteResult | null => {
  const cleaned = hash.replace(/^#\/?/, '');
  if (!cleaned) return null;

  const parts = cleaned.split('/').filter(Boolean);
  const [first, second] = parts;

  switch (first) {
    case 'shop':
      return { route: { name: 'Shop', categorySlug: second }, scrollTarget: null };
    case 'category':
      // Compatibilidad con enlaces de dos migraciones atrás.
      return second
        ? { route: { name: 'Shop', categorySlug: second }, scrollTarget: null }
        : { route: { name: 'Shop' }, scrollTarget: null };
    case 'favorites':
      return { route: { name: 'Home' }, scrollTarget: 'favorites' };
    case 'about':
      return { route: { name: 'About' }, scrollTarget: null };
    case 'contact':
      return { route: { name: 'Contact' }, scrollTarget: null };
    case 'faq':
      return { route: { name: 'Contact' }, scrollTarget: 'faq' };
    default:
      return null;
  }
};

/**
 * Si la URL actual todavía trae el hash del esquema anterior
 * (`#/shop`, `#/favorites`, etc.), lo traduce a la nueva ruta limpia en
 * español. Devuelve `null` cuando no hay nada que migrar.
 */
export const getLegacyHashRoute = (): RouteResult | null => {
  if (Platform.OS !== 'web' || !window.location.hash) return null;
  return parseLegacyHash(window.location.hash);
};
