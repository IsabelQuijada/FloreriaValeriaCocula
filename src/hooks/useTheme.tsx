import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import {
  ColorScheme,
  darkColors,
  getShadows,
  getTextPresets,
  lightColors,
  ThemeColors,
} from '../theme';

interface Theme {
  scheme: ColorScheme;
  colors: ThemeColors;
  shadows: ReturnType<typeof getShadows>;
  textPresets: ReturnType<typeof getTextPresets>;
}

const ThemeContext = createContext<Theme | null>(null);

/**
 * Provee el tema activo (claro/oscuro) siguiendo la preferencia del
 * sistema operativo o navegador (`prefers-color-scheme` en web). Envolver
 * la app una sola vez en `App.tsx`.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const scheme: ColorScheme = systemScheme === 'dark' ? 'dark' : 'light';

  const theme = useMemo<Theme>(() => {
    const colors = scheme === 'dark' ? darkColors : lightColors;
    return {
      scheme,
      colors,
      shadows: getShadows(colors),
      textPresets: getTextPresets(colors),
    };
  }, [scheme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

/** Devuelve el tema activo: `{ scheme, colors, shadows, textPresets }`. */
export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return theme;
}
