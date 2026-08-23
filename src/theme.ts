import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

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

export const lightColors = {
  // Marca
  primary: '#9C4463', // berry — botones y acciones principales (uk-button-secondary)
  primaryDark: '#320B21', // ciruela oscura — footer y fondos oscuros
  primaryLight: '#CC4E63', // frambuesa clara — detalles decorativos y estados hover
  /** Énfasis de texto/ícono en hover sobre el fondo de página (nunca sobre un fill propio). */
  primaryEmphasis: '#320B21',
  /** Variante de marca más intensa que aún es legible sobre la superficie propia del tema. */
  accentStrong: '#320B21',
  accent: '#9C4463', // berry — encabezados y acentos florales
  ribbon: '#9C4463', // berry — franja superior de navegación
  accentSoft: '#F4E4E1', // rosado pálido — chips y fondos suaves
  champagne: '#F7C466', // dorado — texto destacado sobre fondos oscuros
  gold: '#8A6A2E', // dorado profundo — kickers legibles sobre fondos claros (AA ≥4.5:1)
  sand: '#EBE7C0', // arena — botones claros sobre fondos oscuros (uk-button-primary)
  /** Superficie de marca del footer: crema en claro, ciruela casi negro en oscuro. */
  footerBg: '#EBE7C0',
  mauve: '#8A5F6A', // malva — acentos secundarios

  // Fondos y superficies
  background: '#FFFFFF', // blanco — fondo principal (uk-section-default)
  backgroundAlt: '#FBF5F4', // blanco rosado — secciones alternas
  backgroundBlush: '#F4E4E1', // rosado empolvado — secciones destacadas
  surface: '#FFFFFF', // superficies de cards y formularios
  surfaceMuted: '#F8EEEC', // superficies secundarias (placeholders, mapas)
  heroPanel: 'rgba(255, 255, 255, 0.72)', // panel translúcido y legible sobre el hero (glass en web)
  secondaryButton: 'rgba(251, 245, 244, 0.82)', // fondo elegante para acciones secundarias

  // Texto
  text: '#4A2638', // texto principal — ciruela cacao, cálido y de alto contraste
  textMuted: '#8A5F6A', // texto secundario — malva
  textOnDark: '#FBF5F4', // texto sobre fondos oscuros fijos (footer, hero) en cualquier tema
  textOnDarkMuted: '#AD9DA6', // texto secundario sobre fondos oscuros fijos
  textOnLight: '#4A2638', // texto sobre superficies claras fijas (sand, champagne) en cualquier tema
  textOnLightMuted: '#8A5F6A', // texto secundario sobre superficies claras fijas

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
  shadowColor: '#320B21', // tinte de sombra por defecto (ciruela)
};

/**
 * Paleta oscura. Conserva la identidad de marca (berry/ciruela/dorado)
 * invirtiendo fondos y texto, con contraste verificado (WCAG AA) en los
 * pares texto/fondo más usados. `textOnDark(Muted)` y `textOnLight(Muted)`
 * son constantes entre temas: existen para superficies fijas (footer
 * oscuro, botones "soft" claros) cuyo color de fondo no cambia con el tema.
 */
export const darkColors: typeof lightColors = {
  // Marca
  primary: '#C24A62', // berry aclarado — contraste ≥4.3:1 sobre fondo oscuro y sobre texto blanco
  primaryDark: '#8C2F45', // variante profunda — hover/pressed y franja de navegación
  primaryLight: '#E37D8E', // frambuesa clara — detalles decorativos y estados hover
  // Sobre fondo oscuro, el énfasis de hover debe aclarar (no oscurecer) para ganar contraste.
  primaryEmphasis: '#E37D8E',
  // Sobre fondo oscuro, la variante "fuerte" también debe aclarar para seguir siendo legible.
  accentStrong: '#C24A62',
  accent: '#C24A62',
  ribbon: '#8C2F45',
  accentSoft: 'rgba(194, 74, 98, 0.18)', // chip translúcido sobre superficies oscuras
  champagne: '#F7C466', // ya diseñado para fondos oscuros — se mantiene
  gold: '#F7C466', // el dorado profundo original pierde contraste en oscuro; se usa el champagne
  sand: '#EBE7C0', // superficie clara fija (botón "soft"); su texto usa textOnLight
  footerBg: '#221219', // el footer se une al resto de la página oscura
  mauve: '#C9A8B4', // malva aclarado — acentos secundarios sobre fondo oscuro

  // Fondos y superficies
  background: '#1B0E14', // ciruela casi negro — fondo principal
  backgroundAlt: '#221219', // secciones alternas
  backgroundBlush: '#2B141F', // secciones destacadas
  surface: '#241219', // superficies de cards y formularios
  surfaceMuted: '#2E1620', // superficies secundarias (placeholders, mapas)
  heroPanel: 'rgba(27, 14, 20, 0.72)', // panel translúcido sobre el hero
  secondaryButton: 'rgba(36, 18, 25, 0.82)', // fondo para acciones secundarias

  // Texto
  text: '#F3E6EA', // texto principal — blanco cálido, alto contraste sobre fondo oscuro
  textMuted: '#C9A8B4', // texto secundario — malva claro
  textOnDark: '#FBF5F4', // constante: texto sobre fondos oscuros fijos
  textOnDarkMuted: '#C9A8B4',
  textOnLight: '#4A2638', // constante: texto oscuro sobre superficies claras fijas (sand, champagne)
  textOnLightMuted: '#6B4550',

  // Bordes
  border: 'rgba(251, 245, 244, 0.14)',
  borderStrong: 'rgba(251, 245, 244, 0.28)',

  // Estados semánticos
  success: '#8FCBA9',
  successBg: 'rgba(104, 160, 128, 0.16)',
  successBorder: '#68A080',
  error: '#F0919E',
  errorBg: 'rgba(213, 80, 103, 0.16)',
  errorBorder: '#D55067',
  warning: '#F7C466',
  warningBg: 'rgba(247, 196, 102, 0.16)',
  warningBorder: '#F7C466',

  // Estados interactivos
  focus: '#E37D8E', // anillo de foco visible sobre fondo oscuro
  disabledBg: '#3A2530',
  disabledText: '#8A7580',
  overlayDark: 'rgba(0, 0, 0, 0.55)',
  overlayNeutral: 'rgba(0, 0, 0, 0.5)',
  overlayOnDarkBorder: 'rgba(251, 245, 244, 0.18)',

  // Marcas externas (sin cambios — colores oficiales)
  whatsapp: '#25D366',
  whatsappDark: '#1DA851',

  white: '#FFFFFF',
  shadowColor: '#000000',
};

export type ThemeColors = typeof lightColors;
export type ColorScheme = 'light' | 'dark';

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
  sm: 10,
  md: 16,
  lg: 24,
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
 * Dependen del tema activo: construir con `getTextPresets(theme.colors)`.
 */
export function getTextPresets(colors: ThemeColors) {
  return {
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
}

/**
 * Niveles de elevación reutilizables (sombra iOS/web + elevation Android).
 * Sombras difusas teñidas de ciruela en claro; negras y más marcadas en
 * oscuro, donde una sombra teñida apenas se distingue del fondo.
 * Construir con `getShadows(theme.colors)`.
 */
export function getShadows(colors: ThemeColors) {
  return {
    sm: {
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 1,
    },
    md: {
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 3,
    },
    lg: {
      shadowColor: colors.shadowColor,
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.16,
      shadowRadius: 36,
      elevation: 6,
    },
  };
}

/**
 * Detalles modernos disponibles solo en web (objetos vacíos en nativo).
 * Se añaden al final del array de estilos del componente; TypeScript los ve
 * como ViewStyle aunque internamente sean CSS que react-native-web pasa
 * directo al DOM.
 */

/** Transición suave para estados hover/pressed. */
export const webTransition = Platform.select({
  web: {
    transitionProperty: 'transform, box-shadow, background-color, border-color, opacity',
    transitionDuration: '220ms',
    transitionTimingFunction: 'ease-out',
  } as unknown as ViewStyle,
  default: {} as ViewStyle,
}) as ViewStyle;

/** Desenfoque de fondo tipo "glass" para paneles translúcidos. */
export const webGlassBlur = Platform.select({
  web: {
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
  } as unknown as ViewStyle,
  default: {} as ViewStyle,
}) as ViewStyle;

/** Degradado berry sutil para franjas destacadas (fallback: color sólido). */
export const webBerryGradient = Platform.select({
  web: {
    backgroundImage: 'linear-gradient(100deg, #7E3450 0%, #9C4463 55%, #B24A63 100%)',
  } as unknown as ViewStyle,
  default: {} as ViewStyle,
}) as ViewStyle;

/** Scrim degradado inferior para cards con foto (nativo usa velo plano). */
export const webPhotoScrim = Platform.select({
  web: {
    backgroundColor: 'transparent',
    backgroundImage:
      'linear-gradient(180deg, rgba(50, 11, 33, 0) 32%, rgba(50, 11, 33, 0.42) 62%, rgba(50, 11, 33, 0.82) 100%)',
  } as unknown as ViewStyle,
  default: {} as ViewStyle,
}) as ViewStyle;

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
