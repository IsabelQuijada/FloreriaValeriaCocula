import { StyleSheet, TextStyle } from 'react-native';

/**
 * Design tokens de Florería Valeria.
 *
 * Única fuente de verdad para colores, tipografía, espaciado, radios,
 * bordes, sombras y layout. Los componentes nunca deben usar valores
 * hardcodeados: siempre importar desde este archivo.
 *
 * Dirección visual: elegante, cálida y femenina — berry y ciruela sobre
 * blancos rosados, con detalles dorados. Paleta extraída del CSS real de
 * solambiance.com (theme.9.css).
 */

export const colors = {
  // Marca
  primary: '#9C4463', // berry — botones y acciones principales (uk-button-secondary)
  primaryDark: '#320B21', // ciruela oscura — footer y fondos oscuros
  primaryLight: '#CC4E63', // frambuesa clara — detalles decorativos y estados hover
  accent: '#9C4463', // berry — encabezados y acentos florales
  ribbon: '#9C4463', // berry — franja superior de navegación
  accentSoft: '#F4E4E1', // rosado pálido — chips y fondos suaves
  champagne: '#F7C466', // dorado — texto destacado sobre fondos oscuros
  gold: '#8A6A2E', // dorado profundo — kickers legibles sobre fondos claros (AA ≥4.5:1)
  sand: '#EBE7C0', // arena — botones claros sobre fondos oscuros (uk-button-primary)
  mauve: '#8A5F6A', // malva — acentos secundarios

  // Fondos y superficies
  background: '#FFFFFF', // blanco — fondo principal (uk-section-default)
  backgroundAlt: '#FBF5F4', // blanco rosado — secciones alternas
  backgroundBlush: '#F4E4E1', // rosado empolvado — secciones destacadas
  surface: '#FFFFFF', // superficies de cards y formularios
  surfaceMuted: '#F8EEEC', // superficies secundarias (placeholders, mapas)
  heroPanel: 'rgba(255, 255, 255, 0.76)', // panel translúcido y legible sobre el hero
  secondaryButton: 'rgba(251, 245, 244, 0.82)', // fondo elegante para acciones secundarias

  // Texto
  text: '#4A2638', // texto principal — ciruela cacao, cálido y de alto contraste
  textMuted: '#8A5F6A', // texto secundario — malva
  textOnDark: '#FBF5F4', // texto sobre fondos oscuros
  textOnDarkMuted: '#AD9DA6', // texto secundario sobre fondos oscuros

  // Bordes
  border: 'rgba(50, 11, 33, 0.12)', // ciruela translúcida (borde de uk-button-default)
  borderStrong: 'rgba(50, 11, 33, 0.3)',

  // Estados semánticos (colores de estado del propio sitio)
  success: '#68A080', // verde de .text-success — solo mensajes de estado
  successBg: '#EDF4F0',
  successBorder: '#A9CCBA',
  error: '#D55067',
  errorBg: '#FBECEE',
  errorBorder: '#EDAAB4',
  warning: '#8A6A3B',
  warningBg: '#FDF4E0',
  warningBorder: '#F7C466',

  // Estados interactivos
  focus: '#9C4463', // anillo de foco visible
  disabledBg: '#E5DCDA',
  disabledText: '#8C8C8C',
  overlayDark: 'rgba(50, 11, 33, 0.55)', // velo sobre imágenes de hero
  overlayNeutral: 'rgba(0, 0, 0, 0.34)', // contraste neutro sin alterar el color de las fotos
  overlayOnDarkBorder: 'rgba(251, 245, 244, 0.18)', // separadores sobre fondos oscuros

  // Marcas externas
  whatsapp: '#25D366', // verde oficial de WhatsApp — botón flotante de contacto
  whatsappDark: '#1DA851',

  white: '#FFFFFF',
};

export const fonts = {
  /**
   * Serif de marca (Cormorant Garamond) para títulos y la marca.
   * Cargada en App.tsx con expo-font; cada peso es una familia propia,
   * por lo que los estilos que la usan NO deben añadir fontWeight
   * (evita el bold sintético del navegador).
   */
  heading: 'CormorantGaramond_600SemiBold',
  headingBold: 'CormorantGaramond_700Bold',
  // Itálica de acento para taglines y frases emotivas
  accentItalic: 'CormorantGaramond_500Medium_Italic',
  // Fuente del sistema para cuerpo de texto (undefined = default de la plataforma)
  body: undefined as string | undefined,
};

export const fontSizes = {
  caption: 12,
  small: 15,
  body: 16,
  bodyLarge: 18,
  subtitle: 22,
  titleSmall: 28,
  // Los tamaños de título compensan la altura-x reducida de Cormorant Garamond
  title: 32,
  titleLarge: 40,
  hero: 46,
};

export const lineHeights = {
  caption: 18,
  small: 20,
  body: 24,
  bodyLarge: 28,
  subtitle: 30,
  titleSmall: 36,
  title: 40,
  titleLarge: 48,
  hero: 54,
};

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const letterSpacing = {
  normal: 0,
  slight: 0.25,
  wide: 1,
  wider: 2,
  widest: 3,
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
  xxl: 64,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
};

export const borderWidth = {
  hairline: StyleSheet.hairlineWidth,
  thin: 1,
  thick: 2,
};

/**
 * Presets tipográficos para textos utilitarios que se repiten en varios
 * componentes. Los estilos locales solo deben añadir márgenes/alineación.
 */
export const textPresets = {
  /** Etiqueta corta dorada sobre títulos de sección (kicker). */
  kicker: {
    color: colors.gold,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase',
  } as TextStyle,
  /** Texto de badge de categoría en cards y vista rápida de producto. */
  badge: {
    color: colors.primary,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase',
  } as TextStyle,
};

/** Niveles de elevación reutilizables (sombra iOS/web + elevation Android). */
export const shadows = {
  sm: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
};

export const layout = {
  /** Anchura máxima del contenido centrado en pantallas grandes. */
  contentMaxWidth: 1160,
  /** Anchura amplia reservada para la navegación principal. */
  navigationMaxWidth: 1440,
  /** Anchura máxima cómoda para bloques largos de texto. */
  textMaxWidth: 640,
  /** Anchura legible para el texto descriptivo del hero. */
  heroTextMaxWidth: 520,
  /** Gutter horizontal por defecto. */
  gutter: spacing.md,
  /** Gutter horizontal en tablet/desktop. */
  gutterWide: spacing.lg,
  /** Breakpoints usados por useBreakpoint(). */
  breakpoints: {
    tablet: 768,
    desktop: 1280,
  },
  /** Área táctil mínima recomendada (px). */
  minTouchTarget: 48,
};
