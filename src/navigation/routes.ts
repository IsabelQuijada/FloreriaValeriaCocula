/**
 * Rutas de la aplicación.
 *
 * Módulo puro (sin React) que define los nombres de pantalla y la
 * traducción entre el hash de la URL y la ruta interna. Mantenerlo puro
 * permite probarlo de forma aislada y reutilizarlo desde cualquier capa.
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

export type HashRouteResult = {
  route: Route;
  scrollTarget: ScrollTarget | null;
};

export const getHashRoute = (): HashRouteResult => {
  if (Platform.OS !== 'web') {
    return { route: { name: 'Home' }, scrollTarget: null };
  }

  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) {
    return { route: { name: 'Home' }, scrollTarget: null };
  }

  const parts = hash.split('/').filter(Boolean);
  const [first, second] = parts;

  switch (first) {
    case 'shop':
      return {
        route: { name: 'Shop', categorySlug: second },
        scrollTarget: null,
      };
    case 'favorites':
      return { route: { name: 'Home' }, scrollTarget: 'favorites' };
    case 'category':
      // Compatibilidad con enlaces anteriores a las páginas de categoría.
      return second
        ? { route: { name: 'Shop', categorySlug: second }, scrollTarget: null }
        : { route: { name: 'Shop' }, scrollTarget: null };
    case 'contact':
      return { route: { name: 'Contact' }, scrollTarget: null };
    case 'about':
      return { route: { name: 'About' }, scrollTarget: null };
    // Deshabilitado: sección de blog sin uso actualmente. No permitir acceso
    // directo vía #/blog; cae al caso 'default' y redirige a Home.
    // case 'blog':
    //   return { route: { name: 'Blog' }, scrollTarget: null };
    case 'faq':
      return { route: { name: 'Contact' }, scrollTarget: 'faq' };
    default:
      return { route: { name: 'Home' }, scrollTarget: null };
  }
};

export const buildHash = (route: Route, target?: ScrollTarget) => {
  if (target === 'faq') return '#/faq';
  if (route.name === 'Home') {
    if (target === 'favorites') return '#/favorites';
    return '#/';
  }

  if (route.name === 'Shop' && route.categorySlug) {
    return `#/shop/${route.categorySlug}`;
  }

  return `#/${route.name.toLowerCase()}`;
};
