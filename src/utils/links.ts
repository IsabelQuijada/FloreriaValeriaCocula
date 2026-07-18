import { Linking } from 'react-native';

/**
 * Punto único para abrir enlaces externos (tel:, wa.me, mapas, redes).
 * Centralizar el efecto permite añadir manejo de errores o analítica
 * en un solo lugar sin tocar cada componente.
 */
export function openExternalUrl(url: string): void {
  Linking.openURL(url);
}
