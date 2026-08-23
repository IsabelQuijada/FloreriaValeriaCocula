import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { fontSizes, fontWeights, lineHeights, spacing } from '../theme';
import Card from './Card';
import FloralServiceIcon from './FloralServiceIcon';

interface FeatureCardProps {
  /** Emoji decorativo del servicio o valor. */
  icon: string;
  title: string;
  description: string;
  /** Centra icono y textos (destacados de Home); por defecto alineado a la izquierda. */
  centered?: boolean;
  /** Reduce el espaciado vertical para secciones de menor altura. */
  compact?: boolean;
}

/** Card de servicio o valor: icono, título y descripción. */
export default function FeatureCard({
  icon,
  title,
  description,
  centered = false,
  compact = false,
}: FeatureCardProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        compactCard: {
          padding: spacing.md,
        },
        centered: {
          alignItems: 'center',
        },
        textCentered: {
          textAlign: 'center',
        },
        icon: {
          marginBottom: spacing.md,
        },
        iconCompact: {
          marginBottom: spacing.sm,
        },
        title: {
          color: colors.text,
          fontSize: fontSizes.bodyLarge,
          fontWeight: fontWeights.bold,
          marginBottom: spacing.sm,
        },
        description: {
          color: colors.textMuted,
          fontSize: fontSizes.body,
          lineHeight: lineHeights.body,
        },
      }),
    [colors],
  );
  return (
    <Card
      flexBasis={260}
      maxWidth={400}
      style={[centered && styles.centered, compact && styles.compactCard]}
    >
      <View style={[styles.icon, compact && styles.iconCompact]}>
        <FloralServiceIcon name={icon} />
      </View>
      <Text style={[styles.title, centered && styles.textCentered]}>{title}</Text>
      <Text style={[styles.description, centered && styles.textCentered]}>{description}</Text>
    </Card>
  );
}
