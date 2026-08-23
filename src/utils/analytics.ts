import { Platform } from 'react-native';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { ProductCardData } from '../data/catalog';

/**
 * Tracking básico con Firebase Analytics (Google Analytics 4).
 *
 * Punto único de instrumentación: `openExternalUrl` (clics de contacto),
 * `ProductModal` (vista de producto) y `CatalogScreen` (vista de categoría)
 * llaman a las funciones de este módulo en vez de hablar con Firebase
 * directamente. Solo corre en web: el SDK de Analytics usa APIs de
 * navegador (indexedDB) que no existen en Expo Go / apps nativas.
 */

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let analyticsPromise: Promise<Analytics | null> | null = null;

/** Inicializa Firebase Analytics una sola vez, de forma perezosa y solo en web. */
function getAnalyticsInstance(): Promise<Analytics | null> {
  if (Platform.OS !== 'web' || !firebaseConfig.apiKey) {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = isSupported().then((supported) => {
      if (!supported) return null;
      app = app ?? initializeApp(firebaseConfig);
      return getAnalytics(app);
    });
  }

  return analyticsPromise;
}

/**
 * Dispara la inicialización de Firebase Analytics apenas carga la app
 * (ver `App.tsx`), en vez de esperar al primer evento personalizado.
 * Así el `page_view` automático de GA4 (con ciudad, país y dispositivo)
 * se registra para toda visita, incluso quien no hace clic en nada.
 */
export function initAnalytics(): void {
  getAnalyticsInstance().catch(() => {
    // Analítica no debe romper la carga de la app.
  });
}

function track(eventName: string, params?: Record<string, unknown>): void {
  getAnalyticsInstance()
    .then((analytics) => {
      if (analytics) logEvent(analytics, eventName, params);
    })
    .catch(() => {
      // Analítica no debe romper la navegación del usuario.
    });
}

/** Canal de contacto inferido de la URL, para reportar sin tocar cada llamador. */
function inferChannel(url: string): string {
  if (url.startsWith('https://wa.me/')) return 'whatsapp';
  if (url.startsWith('tel:')) return 'phone';
  if (url.includes('maps.google.com') || url.includes('google.com/maps')) return 'maps';
  if (url.includes('facebook.com')) return 'facebook';
  if (url.includes('instagram.com')) return 'instagram';
  return 'other';
}

/** Contexto opcional para saber qué originó un clic de contacto (p. ej. un producto). */
export interface ContactContext {
  source: string;
  itemName?: string;
  itemCategory?: string;
}

/** Clic en WhatsApp, teléfono, mapa o redes sociales — la acción de conversión del negocio. */
export function logContactClick(url: string, context?: ContactContext): void {
  track('generate_lead', {
    channel: inferChannel(url),
    source: context?.source ?? 'unknown',
    item_name: context?.itemName,
    item_category: context?.itemCategory,
  });
}

/** Apertura de la vista rápida de un producto (Home o Catálogo). */
export function logViewItem(product: ProductCardData): void {
  track('view_item', {
    item_id: product.id,
    item_name: product.name,
    item_category: product.badge,
  });
}

/** Cambio de categoría/subcategoría visitada en el catálogo. */
export function logViewCategory(
  categorySlug: string,
  subcategorySlug: string,
  itemCount: number,
): void {
  track('view_item_list', {
    item_list_id: categorySlug,
    item_list_name: categorySlug,
    subcategory: subcategorySlug,
    item_count: itemCount,
  });
}
