import { Linking } from 'react-native';
import { ContactContext, logContactClick } from './analytics';

/**
 * Punto único para abrir enlaces externos (tel:, wa.me, mapas, redes).
 * Centralizar el efecto permite añadir manejo de errores o analítica
 * en un solo lugar sin tocar cada componente. `context` es opcional y
 * solo lo pasan los llamadores que quieren reportar qué originó el clic
 * (por ejemplo, qué producto), como CatalogScreen y HomeScreen.
 */
export function openExternalUrl(url: string, context?: ContactContext): void {
  logContactClick(url, context);
  Linking.openURL(url);
}
