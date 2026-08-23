/**
 * Optimización de imágenes de Cloudinary.
 *
 * Las URLs del catálogo apuntan al asset original (hasta 1200×2134 px).
 * Este helper inserta transformaciones de entrega para servir el tamaño
 * y formato adecuados: `e_trim` (recorta el margen transparente sobrante
 * alrededor del arreglo floral, ya que cada foto original trae una
 * cantidad distinta de espacio vacío tras quitarle el fondo, lo que hacía
 * que `resizeMode="cover"` recortara cada card en un punto distinto),
 * `f_auto` (WebP/AVIF según navegador), `q_auto` (compresión perceptual)
 * y `w_·,c_limit` (nunca escala hacia arriba).
 */

const UPLOAD_SEGMENT = '/upload/';

/** Anchura de entrega para cards de producto (280 px de layout × ~2 dpr). */
export const CARD_IMAGE_WIDTH = 600;

/**
 * Devuelve la URL con transformaciones de optimización. Si la URL no es
 * de Cloudinary (o ya tiene transformaciones), se devuelve sin cambios.
 */
export function optimizedImageUrl(url: string, width = CARD_IMAGE_WIDTH): string {
  const index = url.indexOf(UPLOAD_SEGMENT);
  if (!url.includes('res.cloudinary.com') || index === -1) {
    return url;
  }
  const afterUpload = url.slice(index + UPLOAD_SEGMENT.length);
  if (/^[a-z]+_[^/]*\//.test(afterUpload) && !afterUpload.startsWith('v')) {
    return url; // ya tiene transformaciones
  }
  return `${url.slice(0, index)}${UPLOAD_SEGMENT}e_trim/f_auto,q_auto,w_${width},c_limit/${afterUpload}`;
}
