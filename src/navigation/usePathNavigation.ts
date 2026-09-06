import React, { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import {
  buildPath,
  getLegacyHashRoute,
  getPathRoute,
  Route,
  RouteResult,
  ScreenName,
  ScrollTarget,
} from './routes';

const resolveInitialRoute = (): RouteResult => {
  const legacy = getLegacyHashRoute();
  if (legacy) {
    // Enlace con el esquema anterior (`#/shop`, `#/about`, ...): lo
    // reescribimos a la ruta limpia en español sin dejar rastro del hash.
    window.history.replaceState(null, '', buildPath(legacy.route, legacy.scrollTarget ?? undefined));
    return legacy;
  }
  return getPathRoute();
};

/**
 * Estado de navegación de la aplicación.
 *
 * Encapsula la ruta actual, la sincronización con el path de la URL
 * (history API + popstate en web) y el scroll a secciones concretas
 * ('favorites' en Home, 'faq' en Contacto). Las pantallas reportan la
 * posición de esas secciones con `registerScrollTarget`.
 */
export function usePathNavigation(scrollRef: React.RefObject<ScrollView | null>) {
  const [initialRoute] = useState<RouteResult>(() =>
    Platform.OS === 'web' ? resolveInitialRoute() : { route: { name: 'Home' }, scrollTarget: null },
  );
  const [route, setRoute] = useState<Route>(initialRoute.route);
  const scrollTarget = useRef<ScrollTarget | null>(initialRoute.scrollTarget);
  const resetScrollAfterHistoryNavigation = useRef(false);
  const targetPositions = useRef<Record<ScrollTarget, number>>({ favorites: 0, faq: 0 });

  const scrollToTarget = (target: ScrollTarget) => {
    scrollRef.current?.scrollTo({ y: targetPositions.current[target], animated: true });
  };

  const registerScrollTarget = (target: ScrollTarget, y: number) => {
    targetPositions.current[target] = y;
  };

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const onPopState = () => {
      const next = getPathRoute();
      scrollTarget.current = next.scrollTarget;
      resetScrollAfterHistoryNavigation.current = next.scrollTarget === null;
      setRoute(next.route);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    if (scrollTarget.current === 'favorites') {
      scrollToTarget('favorites');
      scrollTarget.current = null;
    } else if (scrollTarget.current === 'faq') {
      setTimeout(() => scrollToTarget('faq'), 150);
      scrollTarget.current = null;
    } else if (resetScrollAfterHistoryNavigation.current) {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      resetScrollAfterHistoryNavigation.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const updateRoute = (nextRoute: Route, target?: ScrollTarget) => {
    setRoute(nextRoute);
    if (Platform.OS === 'web') {
      const nextPath = buildPath(nextRoute, target);
      if (window.location.pathname !== nextPath) {
        window.history.pushState(null, '', nextPath);
      }
    }
  };

  const navigate = (next: ScreenName) => {
    if (next === 'Favorites') {
      if (route.name === 'Home') {
        updateRoute({ name: 'Home' }, 'favorites');
        scrollToTarget('favorites');
      } else {
        updateRoute({ name: 'Home' }, 'favorites');
        setTimeout(() => scrollToTarget('favorites'), 150);
      }
      return;
    }

    if (next === 'FAQ') {
      updateRoute({ name: 'Contact' }, 'faq');
      setTimeout(() => scrollToTarget('faq'), 150);
      return;
    }

    updateRoute({ name: next });
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const openCategory = (categorySlug: string) => {
    updateRoute({ name: 'Shop', categorySlug });
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  /**
   * Refleja los filtros del catálogo (categoría/subcategoría) en la URL
   * sin apilar entradas de historial, para que un refresh de página los
   * conserve. Se usa `replaceState` porque cada clic en un filtro no debe
   * generar un paso de "atrás" independiente.
   */
  const syncShopFilters = (categorySlug: string, subcategorySlug: string) => {
    if (Platform.OS !== 'web' || route.name !== 'Shop') return;
    const nextPath = buildPath({ name: 'Shop', categorySlug, subcategorySlug });
    if (window.location.pathname !== nextPath) {
      window.history.replaceState(null, '', nextPath);
    }
  };

  return { route, navigate, openCategory, syncShopFilters, registerScrollTarget };
}
