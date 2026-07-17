function extractNumber(filename: string): string {
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
  const match = nameWithoutExt.match(/(\d+)$/);
  return match ? match[1] : '1';
}

function camelCaseToTitleCase(str: string): string {
  let result = str.replace(/-/g, ' ');
  result = result.replace(/([a-z])([A-Z])/g, '$1 $2');
  result = result.replace(/\b\w/g, (char) => char.toUpperCase());
  return result;
}

function getProductBaseName(subcategorySlug: string): string {
  const subcategoryMap: Record<string, string> = {
    // Bodas de Ensueño
    'arreglos-centros-mesa': 'Centro de Mesa',
    'ramos-novia': 'Ramo de Novia',
    'templo': 'Arreglo de Templo',

    // Cumpleaños
    'arreglos-festivos': 'Arreglo de Cumpleaños',

    // Ramos Clásicos
    'ramo-estilizado': 'Ramo Estilizado',
    'ramo-girasoles': 'Ramo de Girasoles',
    'ramo-mix': 'Ramo Mixto',
    'ramo-rosas': 'Ramo de Rosas',
    'ramo-tulipanes': 'Ramo de Tulipanes',
    'ramos-clasicos': 'Ramo Clásico',

    // Ramos Elegantes
    'ramos-elegantes': 'Ramo Elegante',

    // Quinceañera
    'ramos': 'Ramo Quinceañera',
    'centroDeMesa': 'Centro de Mesa',

    // Celebraciones Especiales
    'canastas-florales': 'Canasta Floral',
    'centros-de-mesa-festivos': 'Centro de Mesa',
    'detalles-en-forma-de-corazon': 'Detalle Corazón',

    // Eventos Religiosos
    'arreglo-de-templo': 'Arreglo de Templo',
    'bautizo': 'Arreglo de Bautizo',
    'hermita': 'Arreglo de Hermita',

    // Galería Funeraria
    'coronas': 'Corona Funeraria',
    'cruces': 'Cruz Funeraria',
    'cubre-caja': 'Cubre Caja',
    'pie-caja-altar': 'Arreglo de Altar',
  };

  return subcategoryMap[subcategorySlug] ?? camelCaseToTitleCase(subcategorySlug);
}

/**
 * Formats a product name from its Cloudinary ID and subcategory slug.
 * When subcategorySlug is provided, uses it directly for the base name mapping
 * (avoids the ambiguity of extracting folder names from the path).
 */
export function formatProductName(cloudinaryId: string, subcategorySlug?: string): string {
  const filename = cloudinaryId.split('/').pop() || '';
  const number = extractNumber(filename);

  if (subcategorySlug) {
    const baseName = getProductBaseName(subcategorySlug);
    return `${baseName} ${number}`;
  }

  // Fallback: extract subcategory from path (for external callers)
  const parts = cloudinaryId.split('/');
  const pathSubcategory = parts.length >= 4 ? parts[2] : '';
  const baseName = pathSubcategory
    ? getProductBaseName(pathSubcategory)
    : camelCaseToTitleCase(filename.replace(/\d+$/, ''));

  return `${baseName} ${number}`;
}

export function formatProductNameFromFile(filename: string): string {
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
  const number = extractNumber(filename);
  const nameWithoutNumber = nameWithoutExt.replace(/\d+$/, '');
  const baseName = camelCaseToTitleCase(nameWithoutNumber);
  return `${baseName} ${number}`.trim();
}

export function generateProductDescription(category: string): string {
  const categoryDescriptions: Record<string, string> = {
    'bodas-de-ensueno': 'Hermoso arreglo floral para hacer de tu boda un día inolvidable',
    'cumpleanos': 'Arreglo floral perfecto para celebrar un cumpleaños especial',
    'eventos-religiosos': 'Arreglo floral elegante para eventos religiosos y ceremonias',
    'celebraciones-especiales': 'Arreglo floral especial para tus celebraciones más importantes',
    'galeria-funeraria': 'Arreglo funerario elaborado con respeto y dedicación',
    'ramos-clasicos': 'Ramo clásico y elegante para cualquier ocasión',
    'ramos-elegantes': 'Ramo elegante y sofisticado con flores premium',
  };
  return categoryDescriptions[category] ?? `Hermoso arreglo floral de ${camelCaseToTitleCase(category)}`;
}
