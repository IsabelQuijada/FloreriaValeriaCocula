import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  layout,
  letterSpacing,
  lineHeights,
  radius,
  spacing,
} from '../theme';

interface SectionTitleProps {
  /** Etiqueta corta sobre el título (p. ej. "Servicios"). */
  kicker?: string;
  title: string;
  subtitle?: string;
}

/** Encabezado de sección con kicker, título serif, subtítulo y divisor floral. */
export default function SectionTitle({ kicker, title, subtitle }: SectionTitleProps) {
  const { isTablet } = useBreakpoint();
  return (
    <View style={styles.container}>
      {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
      <Text accessibilityRole="header" style={[styles.title, isTablet && styles.titleWide]}>
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  kicker: {
    color: colors.gold,
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  title: {
    color: colors.accent,
    fontFamily: fonts.heading,
    fontSize: fontSizes.title,
    lineHeight: lineHeights.title,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    letterSpacing: letterSpacing.wide,
  },
  titleWide: {
    fontSize: fontSizes.titleLarge,
    lineHeight: lineHeights.titleLarge,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    textAlign: 'center',
    marginTop: spacing.sm,
    maxWidth: layout.textMaxWidth,
  },
  divider: {
    width: 56,
    height: 3,
    backgroundColor: colors.champagne,
    borderRadius: radius.sm,
    marginTop: spacing.md,
  },
});
