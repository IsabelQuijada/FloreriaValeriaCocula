/**
 * Selección de productos favoritos para el carrusel de la portada,
 * tomada del catálogo real de Cloudinary (ramos elegantes y clásicos).
 */

import { ProductCardData, toProductCardData } from './catalog';
import { getProductsByCategory, Product } from './productsData';

export type FavoriteProduct = ProductCardData;

const FAVORITES_POOL: Product[] = [
  ...getProductsByCategory('ramos-elegantes'),
  ...getProductsByCategory('ramos-clasicos'),
];

/**
 * Selección aleatoria de favoritas para el carrusel de la portada,
 * igual que `getRandomFavoritas` en el sitio original.
 */
export function getRandomFavorites(count = 15): FavoriteProduct[] {
  const shuffled = [...FAVORITES_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((product) => ({
    ...toProductCardData(product),
    id: `favorita-${product.id}`,
  }));
}
