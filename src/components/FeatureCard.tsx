import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, fontWeights, lineHeights, spacing } from '../theme';
import Card from './Card';
import FloralServiceIcon from './FloralServiceIcon';

interface FeatureCardProps {
  /** Emoji decorativo del servicio o valor. */
  icon: string;
  title: string;
  description: string;
  /** Centra icono y textos (destacados de Home); por defecto alineado a la izquierda. */
  centered?: boolean;
}

/** Card de servicio o valor: icono, título y descripción. */
export default function FeatureCard({
  icon,
  title,
  description,
  centered = false,
}: FeatureCardProps) {
  return (
    <Card flexBasis={260} maxWidth={400} style={centered && styles.centered}>
      <View style={styles.icon}>
        <FloralServiceIcon name={icon} />
      </View>
      <Text style={[styles.title, centered && styles.textCentered]}>{title}</Text>
      <Text style={[styles.description, centered && styles.textCentered]}>{description}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
  },
  textCentered: {
    textAlign: 'center',
  },
  icon: {
    marginBottom: spacing.md,
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
});
