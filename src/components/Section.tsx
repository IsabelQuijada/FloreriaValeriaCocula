import React, { ReactNode, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { useTheme } from '../hooks/useTheme';
import { layout, spacing } from '../theme';

type SectionBackground = 'default' | 'alt' | 'blush' | 'dark';

interface SectionProps {
  children: ReactNode;
  /** Fondo de la sección: marfil (default), crema, rosado o verde oscuro. */
  background?: SectionBackground;
  /** Usa la anchura amplia de navegación (catálogo con sidebar). */
  wide?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Contenedor de sección: aplica el ritmo vertical, el gutter horizontal
 * y centra el contenido con la anchura máxima del layout.
 */
export default function Section({
  children,
  background = 'default',
  wide = false,
  style,
}: SectionProps) {
  const { isTablet } = useBreakpoint();
  const { colors } = useTheme();
  const backgroundStyles = useMemo<Record<SectionBackground, ViewStyle>>(
    () => ({
      default: { backgroundColor: colors.background },
      alt: { backgroundColor: colors.backgroundAlt },
      blush: { backgroundColor: colors.backgroundBlush },
      dark: { backgroundColor: colors.primaryDark },
    }),
    [colors],
  );
  return (
    <View
      style={[styles.outer, isTablet && styles.outerWide, backgroundStyles[background], style]}
    >
      <View style={[styles.inner, isTablet && styles.innerWide, wide && styles.innerWideMax]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingVertical: spacing.xl,
  },
  outerWide: {
    paddingVertical: spacing.xxl,
  },
  inner: {
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.gutter,
  },
  innerWide: {
    paddingHorizontal: layout.gutterWide,
  },
  innerWideMax: {
    maxWidth: layout.navigationMaxWidth,
  },
});
