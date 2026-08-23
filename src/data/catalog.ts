/**
 * Capa de dominio del catálogo.
 *
 * Selectores y transformaciones sobre los datos generados
 * (`productsData.ts`, `categories.ts`): catálogo completo, conteos por
 * categoría/subcategoría, filtrado con búsqueda sin acentos y el mapeo
 * único de `Product` al modelo de presentación `ProductCardData`.
 * Las pantallas consumen estas funciones en lugar de recombinar datos.
 */

import { optimizedImageUrl } from '../utils/imageUrl';
import { CATEGORIES, getCategoryBySlug } from './categories';
import { getProductsByCategory, Product } from './productsData';

/** Datos mínimos que una card o modal de producto necesita para pintarse. */
export interface ProductCardData {
  id: string | number;
  name: string;
  image: string;
  badge: string;
  description: string;
}

/** Catálogo completo con nombres y descripciones ya formateados. */
export const ALL_CATALOG: Product[] = CATEGORIES.flatMap((cat) =>
  getProductsByCategory(cat.slug),
);

/** Mapeo único de producto del catálogo a datos de card (imagen optimizada + badge). */
export function toProductCardData(product: Product): ProductCardData {
  return {
    id: product.id,
    name: product.name,
    image: optimizedImageUrl(product.cloudinaryUrl),
    badge: getCategoryBySlug(product.category)?.name ?? product.category,
    description: product.description,
  };
}

let categoryCounts: Map<string, number> | null = null;

/** Número de productos por categoría (calculado una sola vez). */
export function getCategoryCounts(): Map<string, number> {
  if (!categoryCounts) {
    categoryCounts = new Map<string, number>();
    for (const product of ALL_CATALOG) {
      categoryCounts.set(product.category, (categoryCounts.get(product.category) ?? 0) + 1);
    }
  }
  return categoryCounts;
}

let subcategoryCounts: Map<string, number> | null = null;

/** Número de productos por subcategoría, con clave `categoría|subcategoría`. */
export function getSubcategoryCounts(): Map<string, number> {
  if (!subcategoryCounts) {
    subcategoryCounts = new Map<string, number>();
    for (const product of ALL_CATALOG) {
      const key = `${product.category}|${product.subcategory}`;
      subcategoryCounts.set(key, (subcategoryCounts.get(key) ?? 0) + 1);
    }
  }
  return subcategoryCounts;
}

export interface CatalogFilter {
  /** Slug de categoría o 'all'. */
  categorySlug: string;
  /** Slug de subcategoría o 'all'. */
  subcategorySlug: string;
}

/** Aplica los filtros del catálogo (categoría y subcategoría). */
export function filterCatalog({ categorySlug, subcategorySlug }: CatalogFilter): Product[] {
  let products = ALL_CATALOG;
  if (categorySlug !== 'all') {
    products = products.filter((p) => p.category === categorySlug);
  }
  if (subcategorySlug !== 'all') {
    products = products.filter((p) => p.subcategory === subcategorySlug);
  }
  return products;
}
