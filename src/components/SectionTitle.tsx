import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
import {
  colors,
  fonts,
  fontSizes,
  layout,
  letterSpacing,
  lineHeights,
  radius,
  spacing,
  textPresets,
} from '../theme';

interface SectionTitleProps {
  /** Etiqueta corta sobre el título (p. ej. "Servicios"). */
  kicker?: string;
  title: string;
  subtitle?: string;
  /** Reduce el espacio inferior en secciones de composición compacta. */
  compact?: boolean;
}

/** Encabezado de sección con kicker, título serif, subtítulo y divisor floral. */
export default function SectionTitle({ kicker, title, subtitle, compact = false }: SectionTitleProps) {
  const { isTablet } = useBreakpoint();
  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
      <Text accessibilityRole="header" style={[styles.title, isTablet && styles.titleWide]}>
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Ionicons
          name="flower-outline"
          size={14}
          color={colors.gold}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <View style={styles.dividerLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  containerCompact: {
    marginBottom: spacing.lg,
  },
  kicker: {
    ...textPresets.kicker,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  title: {
    color: colors.accent,
    fontFamily: fonts.heading,
    fontSize: fontSizes.title,
    lineHeight: lineHeights.title,
    textAlign: 'center',
    letterSpacing: letterSpacing.slight,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  dividerLine: {
    width: 36,
    height: 1,
    backgroundColor: colors.champagne,
    borderRadius: radius.sm,
  },
});
