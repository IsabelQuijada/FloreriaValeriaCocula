import { useWindowDimensions } from 'react-native';
import { layout } from '../theme';

export interface Breakpoint {
  width: number;
  /** width < 768 */
  isMobile: boolean;
  /** width >= 768 */
  isTablet: boolean;
  /** width >= 1280 */
  isDesktop: boolean;
}

/**
 * Devuelve el breakpoint activo a partir del ancho de la ventana.
 * Enfoque mobile-first: los estilos base son para teléfono y los
 * componentes ajustan tipografía/layout cuando isTablet o isDesktop.
 */
export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  return {
    width,
    isMobile: width < layout.breakpoints.tablet,
    isTablet: width >= layout.breakpoints.tablet,
    isDesktop: width >= layout.breakpoints.desktop,
  };
}
