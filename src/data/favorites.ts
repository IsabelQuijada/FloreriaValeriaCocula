/**
 * Selección de productos favoritos para el carrusel de la portada,
 * tomada del catálogo real de Cloudinary (ramos elegantes y clásicos).
 */

import { getCategoryBySlug } from './categories';
import { getProductsByCategory, Product } from './productsData';

export interface FavoriteProduct {
  id: string;
  name: string;
  image: string;
  badge: string;
  description: string;
}

function toFavorite(product: Product): FavoriteProduct {
  return {
    id: `favorita-${product.id}`,
    name: product.name,
    image: product.cloudinaryUrl,
    badge: getCategoryBySlug(product.category)?.name ?? product.category,
    description: product.description,
  };
}

export const FAVORITE_PRODUCTS: FavoriteProduct[] = [
  ...getProductsByCategory('ramos-elegantes').slice(0, 5),
  ...getProductsByCategory('ramos-clasicos').slice(0, 5),
].map(toFavorite);
