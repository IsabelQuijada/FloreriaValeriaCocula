/**
 * Contenido y datos de marca de Florería Valeria.
 * Los identificadores internos (ScreenName, ids) están en inglés por
 * convención de código; todos los textos visibles están en español.
 */

export const BRAND = {
  name: 'Florería Valeria',
  tagline: 'Flores para cada momento',
  location: 'Cocula, Jalisco',
  foundedYear: 2000,
  description:
    'Arreglos florales artesanales, flores frescas y detalles únicos, hechos con cariño en el corazón de Cocula desde el año 2000.',
};

/**
 * El tipo de pantalla vive en la capa de navegación; se re-exporta aquí
 * por compatibilidad con los imports existentes.
 */
import type { ScreenName } from '../navigation/routes';

export type { ScreenName };

/**
 * Navegación principal reducida a las secciones de mayor intención de
 * compra; Blog y Preguntas frecuentes siguen accesibles desde el footer.
 */
export const NAV_ITEMS: { label: string; screen: ScreenName }[] = [
  { label: 'Catálogo', screen: 'Shop' },
  { label: 'Favoritas', screen: 'Favorites' },
  { label: 'Nosotros', screen: 'About' },
  { label: 'Contacto', screen: 'Contact' },
];

/**
 * El catálogo de productos vive en `productsData.ts` (auto-generado desde
 * Cloudinary) junto con `categories.ts` y `productDescriptions.ts`.
 */
export type { Product } from './productsData';

/** Número de WhatsApp de la florería (formato internacional, sin signos). */
const WHATSAPP_PHONE = '523335558928';

/** Construye un enlace de WhatsApp con un mensaje prellenado. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/** Enlace de WhatsApp para preguntar por un producto concreto. */
export function whatsappProductUrl(productName: string): string {
  return whatsappUrl(
    `Hola, me interesa “${productName}”. ¿Podrían darme más información sobre disponibilidad y precio?`,
  );
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    id: 's1',
    icon: 'delivery-bouquet',
    title: 'Entrega Local',
    description:
      'Entrega segura en Cocula, disponible todos los días para que tus flores lleguen frescas y a tiempo.',
  },
  {
    id: 's2',
    icon: 'bouquet-custom',
    title: 'Arreglos Personalizados',
    description:
      'Creamos diseños únicos según la ocasión, tus flores favoritas y tu presupuesto.',
  },
  {
    id: 's3',
    icon: 'floral-arch',
    title: 'Bodas y Eventos',
    description:
      'Ramos, centros de mesa y decoración floral diseñados especialmente para hacer inolvidable tu celebración.',
  },
  {
    id: 's4',
    icon: 'ribbon-outline',
    title: 'XV Años y Celebraciones',
    description:
      'Flores para quinceañeras, cumpleaños, graduaciones y toda celebración que merezca un toque especial.',
  },
  {
    id: 's5',
    icon: 'business-outline',
    title: 'Eventos Religiosos',
    description:
      'Arreglos para bautizos, primeras comuniones, confirmaciones y decoración de templos.',
  },
  {
    id: 's6',
    icon: 'heart-outline',
    title: 'Para Recordar y Honrar',
    description:
      'Coronas y arreglos de condolencia diseñados con respeto y entregados a tiempo para los servicios.',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'f1',
    question: '¿Hacen entregas a domicilio?',
    answer:
      'Sí. Entregamos en todo el municipio de Cocula, todos los días, en horario de 9:00 AM a 6:00 PM. El envío tiene un costo adicional según la zona.',
  },
  {
    id: 'f2',
    question: '¿Cuál es su horario de atención?',
    answer:
      'Abrimos de lunes a domingo, de 9:00 AM a 8:00 PM, en nuestras dos sucursales del centro de Cocula.',
  },
  {
    id: 'f3',
    question: '¿Puedo personalizar mi arreglo?',
    answer:
      'Por supuesto. Escríbenos por WhatsApp al 33 35 55 89 28 o visítanos en tienda y crearemos algo único para tu ocasión y presupuesto.',
  },
  {
    id: 'f4',
    question: '¿Por qué no muestran los precios en los arreglos?',
    answer:
      'Trabajamos con flor fresca de temporada, así que la disponibilidad y el precio de cada flor cambian constantemente. Para darte un precio justo, confirmamos contigo el tamaño, las flores y los detalles del arreglo por WhatsApp al 33 35 55 89 28 antes de cerrar tu pedido.',
  },
  {
    id: 'f5',
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos efectivo y transferencias bancarias. Si necesitas factura, con gusto la expedimos.',
  },
  {
    id: 'f6',
    question: '¿Dónde están ubicados?',
    answer:
      'Tenemos dos sucursales en el centro de Cocula, Jalisco: la principal en 5 de Mayo 59 y otra en Ocampo 35, ambas en la Col. Centro, C.P. 48500.',
  },
  {
    id: 'f7',
    question: '¿Hacen decoración para eventos?',
    answer:
      'Sí. Diseñamos flores para bodas, XV años, bautizos, eventos religiosos y celebraciones especiales. Contáctanos para una cotización personalizada.',
  },
];

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Cómo hacer que tu ramo dure más tiempo',
    date: '2 de julio de 2026',
    excerpt:
      'Cinco hábitos sencillos — desde cortar los tallos en diagonal hasta cambiar el agua a diario — que pueden duplicar la vida de tus flores frescas.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
  },
  {
    id: 'b2',
    title: 'Flores de temporada: lo más fresco de este verano',
    date: '18 de junio de 2026',
    excerpt:
      'Peonías, dalias y rosas de jardín están en su mejor momento. Esto es lo que más nos está gustando del mercado de flores este mes.',
    image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=800&q=80',
  },
  {
    id: 'b3',
    title: 'Cómo elegir flores de condolencia',
    date: '30 de mayo de 2026',
    excerpt:
      'Una guía delicada sobre arreglos memoriales: qué transmite cada flor y cómo personalizar un homenaje.',
    image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&q=80',
  },
  {
    id: 'b4',
    title: 'Plantas de interior fáciles de cuidar',
    date: '12 de mayo de 2026',
    excerpt:
      'Nuestras plantas favoritas para hogares con poca luz: verdes resistentes que se adaptan a cualquier espacio.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80',
  },
];

export const GALLERY_IMAGES: { id: string; uri: string; caption: string }[] = [
  {
    id: 'g1',
    uri: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
    caption: 'Ramo primaveral',
  },
  {
    id: 'g2',
    uri: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80',
    caption: 'Rosas clásicas',
  },
  {
    id: 'g3',
    uri: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=800&q=80',
    caption: 'Temporada de peonías',
  },
  {
    id: 'g4',
    uri: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&q=80',
    caption: 'Mezcla silvestre',
  },
  {
    id: 'g5',
    uri: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80',
    caption: 'Nuestra tienda',
  },
  {
    id: 'g6',
    uri: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&q=80',
    caption: 'Ramo atado a mano',
  },
  {
    id: 'g7',
    uri: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80',
    caption: 'Flores para boda',
  },
  {
    id: 'g8',
    uri: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=800&q=80',
    caption: 'Detalle de rosas',
  },
];

export const CONTACT_INFO = {
  addressMain: '5 de Mayo 59, Col. Centro, Cocula, Jal., C.P. 48500',
  addressBranch: 'Ocampo 35, Col. Centro, Cocula, Jal., C.P. 48500',
  phoneDisplay: '37 51 19 78 12',
  phoneHref: 'tel:3751197812',
  phone2Display: '33 22 02 32 70',
  phone2Href: 'tel:3322023270',
  whatsappDisplay: '33 35 55 89 28',
  whatsappUrl: whatsappUrl('Hola, me interesan sus flores'),
  hours: 'Lun – Dom: 9:00 AM – 8:00 PM',
  mapsUrl: 'https://maps.google.com/?q=5+de+Mayo+59,+Cocula,+Jalisco',
  mapsUrlOcampo: 'https://maps.google.com/?q=Ocampo+35,+Cocula,+Jalisco',
  facebookUrl: 'https://www.facebook.com/FloreriaValeriaCoculaJalisco/',
  instagramUrl: 'https://www.instagram.com/coculafloreriavaleria/',
};

/** Aviso simple de recolección de datos (LFPDPPP), mostrado una vez por visitante. */
export const COOKIE_NOTICE = {
  message:
    'Usamos datos de navegación para entender qué arreglos visitan más nuestros clientes y mejorar el sitio.',
  acceptLabel: 'Entendido',
};

export const HERO = {
  tagline: 'El color de tus sentimientos',
  title: 'Florería Valeria',
  subtitle:
    'Creamos arreglos florales únicos para cada momento especial. Rosas, girasoles, orquídeas y mucho más, con el cuidado y la pasión que tus sentimientos merecen.',
  image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1200&q=80',
};
