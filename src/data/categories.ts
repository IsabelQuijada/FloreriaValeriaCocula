// Category metadata for all product occasions
export interface CategoryMetadata {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  subcategories: SubcategoryMetadata[];
  image?: string;
}

export interface SubcategoryMetadata {
  id: string;
  name: string;
  slug: string;
  description: string;
  folder: string;
}

export const CATEGORIES: CategoryMetadata[] = [
  {
    id: 'bodas-de-ensueno',
    name: 'Bodas de Ensueño',
    slug: 'bodas-de-ensueno',
    subtitle: 'Tu día perfecto merece flores únicas',
    description: 'Arreglos florales exclusivos para bodas que transforman tu celebración en un cuento de hadas.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=800&fit=crop',
    subcategories: [
      {
        id: 'ramos-novia',
        name: 'Ramos de Novia',
        slug: 'ramos-novia',
        description: 'Ramos de novia únicos y especiales, diseñados con las flores más hermosas para el día más importante de tu vida.',
        folder: 'ramosNovia'
      },
      {
        id: 'arreglos-centros-mesa',
        name: 'Arreglos y Centros de Mesa',
        slug: 'arreglos-centros-mesa',
        description: 'Arreglos elegantes y centros de mesa sofisticados que crean la atmósfera perfecta para tu celebración de boda.',
        folder: 'arreglosCentrosDeMesa'
      },
      {
        id: 'templo',
        name: 'Decoración de Templo',
        slug: 'templo',
        description: 'Decoraciones especiales para templo y ceremonia que transforman el espacio sagrado en un ambiente mágico y memorable.',
        folder: 'templo'
      }
    ]
  },
  {
    id: 'ramos-elegantes',
    name: 'Ramos Elegantes',
    slug: 'ramos-elegantes',
    subtitle: 'Elegancia floral exclusiva',
    description: 'Ramos elegantes con diseños exclusivos y sofisticados, creados con las flores más selectas.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=800&fit=crop',
    subcategories: [
      {
        id: 'ramos-elegantes',
        name: 'Ramos Elegantes',
        slug: 'ramos-elegantes',
        description: 'Ramos elegantes con diseños exclusivos y sofisticados, creados con las flores más selectas y técnicas artesanales de vanguardia para ocasiones especiales.',
        folder: ''
      }
    ]
  },
  {
    id: 'ramos-clasicos',
    name: 'Ramos Clásicos',
    slug: 'ramos-clasicos',
    subtitle: 'Tradición y belleza atemporal',
    description: 'Ramos clásicos que nunca pasan de moda, perfectos para cualquier ocasión especial.',
    image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=600&h=800&fit=crop',
    subcategories: [
      {
        id: 'ramo-estilizado',
        name: 'Ramos Estilizados',
        slug: 'ramo-estilizado',
        description: 'Ramos clásicos estilizados con diseños contemporáneos y flores selectas de la más alta calidad.',
        folder: 'ramo-estilizado'
      },
      {
        id: 'ramo-girasoles',
        name: 'Ramos de Girasoles',
        slug: 'ramo-girasoles',
        description: 'Ramos vibrantes de girasoles que irradian alegría y vitalidad, perfectos para momentos especiales.',
        folder: 'ramo-girasoles'
      },
      {
        id: 'ramo-mix',
        name: 'Ramos Mixtos',
        slug: 'ramo-mix',
        description: 'Combinaciones únicas de flores mixtas que crean arreglos equilibrados y llenos de color.',
        folder: 'ramo-mix'
      },
      {
        id: 'ramo-rosas',
        name: 'Ramos de Rosas',
        slug: 'ramo-rosas',
        description: 'Ramos clásicos de rosas que expresan elegancia y romance en su forma más pura.',
        folder: 'ramo-rosas'
      },
      {
        id: 'ramo-tulipanes',
        name: 'Ramos de Tulipanes',
        slug: 'ramo-tulipanes',
        description: 'Ramos delicados de tulipanes que aportan frescura y sofisticación a cualquier ocasión.',
        folder: 'ramo-tulipanes'
      }
    ]
  },
  {
    id: 'cumpleanos',
    name: 'Cumpleaños',
    slug: 'cumpleanos',
    subtitle: 'Celebra cada año con flores',
    description: 'Arreglos festivos y coloridos especialmente diseñados para hacer de tu cumpleaños una celebración única.',
    image: 'https://images.unsplash.com/photo-1464297162577-f5295c892194?w=600&h=800&fit=crop',
    subcategories: [
      {
        id: 'arreglos-festivos',
        name: 'Arreglos Festivos',
        slug: 'arreglos-festivos',
        description: 'Arreglos florales festivos y coloridos especialmente diseñados para hacer de tu cumpleaños una celebración única y memorable.',
        folder: ''
      }
    ]
  },
  {
    id: 'quinceanera',
    name: 'Quinceañera',
    slug: 'quinceanera',
    subtitle: 'Un momento mágico e inolvidable',
    description: 'Flores elegantes y románticas para celebrar tus quince años con estilo y distinción.',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=800&fit=crop',
    subcategories: [
      {
        id: 'ramos',
        name: 'Ramos de Quinceañera',
        slug: 'ramos',
        description: 'Ramos especiales diseñados para quinceañeras.',
        folder: 'ramos'
      },
      {
        id: 'centroDeMesa',
        name: 'Centros de Mesa',
        slug: 'centroDeMesa',
        description: 'Centros de mesa elegantes y decorativos para quinceañera.',
        folder: 'centroDeMesa'
      },
      {
        id: 'templo',
        name: 'Arreglos de Templo',
        slug: 'templo',
        description: 'Arreglos florales para la ceremonia en el templo.',
        folder: 'templo'
      }
    ]
  },
  {
    id: 'celebraciones-especiales',
    name: 'Celebraciones Especiales',
    slug: 'celebraciones-especiales',
    subtitle: 'Para momentos únicos y especiales',
    description: 'Arreglos únicos para celebraciones que merecen flores extraordinarias.',
    image: 'https://images.unsplash.com/photo-1478146059904-0dfaa2f8d022?w=600&h=800&fit=crop',
    subcategories: [
      {
        id: 'canastas-florales',
        name: 'Canastas Florales',
        slug: 'canastas-florales',
        description: 'Canastas florales elegantes perfectas para regalar en cualquier ocasión especial, llenas de color y vida.',
        folder: 'canastasFlores'
      },
      {
        id: 'centros-de-mesa-festivos',
        name: 'Centros de Mesa Festivos',
        slug: 'centros-de-mesa-festivos',
        description: 'Centros de mesa festivos que transforman cualquier celebración en un evento memorable y lleno de alegría.',
        folder: 'centrosDeMesaFestivos'
      },
      {
        id: 'detalles-en-forma-de-corazon',
        name: 'Detalles en Forma de Corazón',
        slug: 'detalles-en-forma-de-corazon',
        description: 'Arreglos románticos en forma de corazón que expresan amor y cariño en cada detalle floral.',
        folder: 'detallesEnFormaDeCorazon'
      }
    ]
  },
  {
    id: 'eventos-religiosos',
    name: 'Eventos Religiosos',
    slug: 'eventos-religiosos',
    subtitle: 'Flores con significado espiritual',
    description: 'Arreglos sagrados que honran momentos de fe y devoción con belleza y solemnidad.',
    image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=600&h=800&fit=crop',
    subcategories: [
      {
        id: 'arreglo-de-templo',
        name: 'Arreglos de Templo',
        slug: 'arreglo-de-templo',
        description: 'Arreglos florales sagrados diseñados especialmente para ceremonias en templos, creando un ambiente de paz y espiritualidad.',
        folder: 'arregloDeTemplo'
      },
      {
        id: 'bautizo',
        name: 'Bautizo',
        slug: 'bautizo',
        description: 'Arreglos florales delicados y puros perfectos para celebrar el sacramento del bautizo con elegancia y devoción.',
        folder: 'bautizo'
      },
      {
        id: 'hermita',
        name: 'Ermita',
        slug: 'hermita',
        description: 'Arreglos florales tradicionales para ermitas y lugares de oración, honrando la fe con belleza floral.',
        folder: 'hermita'
      }
    ]
  },
  {
    id: 'galeria-funeraria',
    name: 'Para Recordar y Despedir',
    slug: 'galeria-funeraria',
    subtitle: 'Un último homenaje con amor',
    description: 'Arreglos florales solemnes para honrar la memoria de tus seres queridos con respeto y cariño.',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=800&fit=crop',
    subcategories: [
      {
        id: 'coronas',
        name: 'Coronas',
        slug: 'coronas',
        description: 'Coronas funerarias elegantes y solemnes para honrar la memoria de tus seres queridos.',
        folder: 'coronas'
      },
      {
        id: 'cruces',
        name: 'Cruces',
        slug: 'cruces',
        description: 'Cruces florales para expresar respeto y condolencias en ceremonias fúnebres.',
        folder: 'cruces'
      },
      {
        id: 'cubre-caja',
        name: 'Cubre Caja',
        slug: 'cubre-caja',
        description: 'Cubre caja con flores frescas y delicadas para despedidas significativas.',
        folder: 'cubreCaja'
      },
      {
        id: 'pie-caja-altar',
        name: 'Pie Caja/Altar',
        slug: 'pie-caja-altar',
        description: 'Arreglos para pie de caja o altar, diseñados para acompañar en momentos de despedida.',
        folder: 'pieCajaAltar'
      }
    ]
  }
];

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): CategoryMetadata | undefined {
  return CATEGORIES.find(cat => cat.slug === slug);
}

/**
 * Get subcategory by category and subcategory slug
 */
export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string
): SubcategoryMetadata | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find(sub => sub.slug === subcategorySlug);
}

/**
 * Get all subcategories for a category
 */
export function getSubcategories(categorySlug: string): SubcategoryMetadata[] {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories || [];
}
